import { convertToDoubleDimension } from '../utils/convert-matrix.js';
import WarshipGame from '../models/warship-game.js';
import GamePlayerStep from '../enums/game-player-step.js';
import MatrixCellState from '../enums/matrix-cell-state.js';
import AttackCellResult from '../enums/attack-cell-result.js';
import { isShipKilled, isAllShipsKilled } from '../utils/ship-helper.js';
import { uuidv4 } from '../utils/uuidv4.js';

class WarshipGameService {
	constructor() {
		this.boardSize = 10;
		this.games = [];
		this.waitingPlayers = [];
	}

	playerConnect(playerData) {
		const existingWait = this.waitingPlayers.find(x => x.name === playerData.name);
		if (existingWait) {
			return;
		}

		const player = {
			name: playerData.name,
			matrix: convertToDoubleDimension(playerData.matrix, this.boardSize)
		};
		this.waitingPlayers.push(player);
	}

	canStartGame() {
		return this.waitingPlayers.length >= 2;
	}

	startGame(playerName) {
		const existingGame = this.games.find(x =>
			x.playerOne.name === playerName || x.playerTwo.name === playerName);
		if (existingGame) {
			return {
				success: true,
				gameId: existingGame.id,
				players: [existingGame.playerOne.name, existingGame.playerTwo.name]
			};
		}

		if (!this.canStartGame()) {
			return {
				success: false,
				error: "no players for new game"
			};
		}

		const playerOne = this.waitingPlayers.find(x => x.name === playerName);
		if (!playerOne) {
			return {
				success: false,
				error: `player ${playerName} doesn't connected`
			};
		}

		const playerTwo = this.waitingPlayers.find(x => x.name !== playerOne.name);

		this.waitingPlayers = this.waitingPlayers.filter(x =>
			x.name !== playerOne.name && x.name !== playerTwo.name)

		const game = {
			id: uuidv4(),
			dateCreate: new Date(),
			playerOne,
			playerTwo,
			gameStep: GamePlayerStep.PlayerOne,
			steps: []
		};
		this.games.push(game);

		return {
			success: true,
			gameId: game.id,
			players: [game.playerOne.name, game.playerTwo.name]
		};
	}

	getGame(id) {
		return this.games.find(x => x.id === id);
	}

	getGameForPlayer(id, playerName) {
		const game = this.getGame(id);
		let player = null;

		if (game.playerOne.name === playerName) {
			player = game.playerOne;
		} else if (game.playerTwo.name === playerName) {
			player = game.playerTwo;
		}

		return {
			success: true,
			player: game.playerTwo
		}
	}

	endGame(id, playerName) {
		const game = this.getGame(id);
		if (!game) {
			return { success: false, error: "Not found game" };
		}
		const enemy = game.playerOne.name === playerName ? game.playerTwo : game.playerOne;
		this.#endGame(id, enemy);
		return { success: true, gameId: id };
	}

	async makeStep(id, playerName, column, row) {
		const makeStep = (game) => {
			game.gameStep = game.gameStep === GamePlayerStep.PlayerOne
				? GamePlayerStep.PlayerTwo
				: GamePlayerStep.PlayerOne;

		}

		const addNewStep = (game, resultAttack) => {
			game.steps.push({
				id: uuidv4(),
				row,
				column,
				playerName,
				result: resultAttack
			});
		}

		const writeError = msg => ({
			success: false,
			error: msg,
			continue: false
		});

		const writeOk = (game, result, isContinue) => {
			addNewStep(game, result);
			if (!isContinue) makeStep(game);
			return {
				success: true,
				result: result,
				continue: isContinue
			};
		};

		const game = this.getGame(id);
		if (!game) {
			const endedGame = await WarshipGame.findOne({ gameId: id });
			if (endedGame) {
				return writeError(`Game has been completed, win: ${endedGame.win}`);
			} else {
				return writeError(`Game not found, gameId: ${id}`);
			}
		}

		const player = game.gameStep === GamePlayerStep.PlayerOne ? game.playerOne : game.playerTwo;
		const enemy = game.gameStep === GamePlayerStep.PlayerOne ? game.playerTwo : game.playerOne;

		if (player.name !== playerName) {
			return writeError(`Wait player ${player.name}`);
		}

		const cell = enemy.matrix[row][column];

		if (cell === MatrixCellState.Miss) {
			console.log(`Try attack already killed cell, player: ${playerName}, cell: {${row},${column}}`);
			return writeOk(game, AttackCellResult.Miss, false);
		} else if (cell === MatrixCellState.Hurt) {
			console.log(`Try attack already killed cell, player: ${playerName}, cell: {${row},${column}}`);
			return writeOk(game, AttackCellResult.Hurt, false);
		} else if (cell === MatrixCellState.Kill) {
			console.log(`Try attack already killed cell, player: ${playerName}, cell: {${row},${column}}`);
			return writeOk(game, AttackCellResult.Kill, false);
		}

		if (cell === MatrixCellState.Empty) {
			enemy.matrix[row][column] = MatrixCellState.Miss;
			return writeOk(game, AttackCellResult.Miss, false);
		}

		if (cell === MatrixCellState.Ship) {
			enemy.matrix[row][column] = MatrixCellState.Hurt;

			if (isShipKilled(enemy.matrix, this.boardSize, column, row)) {
				if (isAllShipsKilled(enemy.matrix, this.boardSize)) {
					this.#endGame(id, player);
					return writeOk(game, AttackCellResult.Win, false);
				}

				return writeOk(game, AttackCellResult.Kill, true);
			}

			return writeOk(game, AttackCellResult.Hurt, true);
		}

		return writeError(`Unknown type cell state in player's matrix: ${player.name}`);
	}

	getLastStep(id) {
		const game = this.getGame(id);
		if (!game) {
			return { success: false, error: "Not found game" };
		}
		if (game.steps.length === 0) {
			return { success: false, error: "no steps in game" }
		}

		const lastStep = game.steps[game.steps.length - 1];
		return {
			success: true,
			id: lastStep.id,
			row: lastStep.row,
			column: lastStep.column,
			result: lastStep.result,
			playerName: lastStep.playerName
		};
	}

	#endGame(id, winPlayer) {
		const game = this.getGame(id);

		const model = new WarshipGame({
			gameId: id,
			dateCreate: game.dateCreate,
			playerOne: {
				name: game.playerOne.name
			},
			playerTwo: {
				name: game.playerTwo.name
			},
			win: winPlayer.name
		});
		model.save();

		this.games = this.games.filter(x => x.id !== game.id);
	}
}

export default WarshipGameService;