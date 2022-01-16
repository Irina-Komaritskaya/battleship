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
			return { successful: true, gameId: existingGame.id };
		}

		if (!this.canStartGame()) {
			return {
				successful: false,
				error: "no players for new game"
			};
		}

		const playerOne = this.waitingPlayers.find(x => x.name === playerName);
		if (!playerOne) {
			return {
				successful: false,
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
			gameStep: GamePlayerStep.PlayerOne
		};
		this.games.push(game);

		return { successful: true, gameId: game.id };
	}

	getGame(id) {
		return this.games.find(x => x.id === id);
	}

	async makeStep(id, playerName, column, row) {
		const makeStep = (game) => {
			game.gameStep = game.gameStep === GamePlayerStep.PlayerOne
				? GamePlayerStep.PlayerTwo
				: GamePlayerStep.PlayerOne;
		}

		const game = this.getGame(id);
		if (!game) {
			const endedGame = await WarshipGame.findOne({ gameId: id });
			if (endedGame) {
				return { successful: false, error: `Game has beed completed, win: ${endedGame.win}` };
			} else {
				return { successful: false, error: `Game not found, gameId: ${id}` };
			}
		}

		const player = game.gameStep == 1 ? game.playerOne : game.playerTwo;
		const enemy = game.gameStep == 1 ? game.playerTwo : game.playerOne;

		if (player.name !== playerName) {
			return { successful: false, error: `Wait player ${player.name}` };
		}

		const cell = enemy.matrix[row][column];

		if (cell === MatrixCellState.Miss) {
			console.log(`Try attack already killed cell, player: ${playerName}, cell: {${row},${column}}`);
			makeStep(game);
			return { successful: true, result: AttackCellResult.Miss };
		} else if (cell === MatrixCellState.Hurt) {
			console.log(`Try attack already killed cell, player: ${playerName}, cell: {${row},${column}}`);
			makeStep(game);
			return { successful: true, result: AttackCellResult.Miss };
		} else if (cell === MatrixCellState.Kill) {
			console.log(`Try attack already killed cell, player: ${playerName}, cell: {${row},${column}}`);
			makeStep(game);
			return { successful: true, result: AttackCellResult.Miss };
		}

		if (cell === MatrixCellState.Empty) {
			enemy.matrix[row][column] = MatrixCellState.Miss;
			makeStep(game);
			return { successful: true, result: AttackCellResult.Miss };
		}

		if (cell === MatrixCellState.Ship) {
			enemy.matrix[row][column] = MatrixCellState.Hurt;

			if (isShipKilled(enemy.matrix, this.boardSize, column, row)) {
				if (isAllShipsKilled(enemy.matrix, this.boardSize)) {
					this.#endGame(id, player);
					return { successful: true, result: AttackCellResult.Win };
				}
				return { successful: true, result: AttackCellResult.Kill };
			}

			return { successful: true, result: AttackCellResult.Hurt };
		}

		return { successful: false, error: $`Unknown type cell state in player's matrix: ${player.name}` };
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