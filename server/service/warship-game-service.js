import { Guid } from 'js-guid';
import { convertToDoubleDimension } from '../utils/convert-matrix.js';
import WarshipGame from '../models/warship-game.js';
import GamePlayerStep from '../enums/game-player-step.js';
import MatrixCellState from '../enums/matrix-cell-state.js';
import AttackCellResult from '../enums/attack-cell-result.js';
import { isShipKilled, isAllShipsKilled } from '../utils/ship-helper.js';

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

class WarshipGameService {
	constructor() {
		this.boardSize = 10;
		this.games = [];
		this.waitingPlayers = [];
	}

	playerConnect(playerData) {
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
		const playerTwo = this.waitingPlayers.filter(x => x.name !== playerOne.name).pop();

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

	makeStep(id, playerName, x, y) {
		const makeStep = () => {
			this.gameStep = this.gameStep === GamePlayerStep.PlayerOne
				? GamePlayerStep.PlayerTwo
				: GamePlayerStep.PlayerOne;
		}

		const game = getGame(id);
		const player = game.gameStep == 1 ? game.playerOne : game.playerTwo;
		const enemy = game.gameStep == 1 ? game.playerTwo : game.playerOne;

		if (player.name !== playerName) {
			// error
			console.log("GREAT ERROR");
			return;
		}

		const cell = enemy.matrix[y][x];

		if (cell === MatrixCellState.Miss) {
			console.log(`Try attack already missed cell: ${playerName}, ${x}, ${y}`);
			makeStep();
			return AttackCellResult.Miss;
		} else if (cell === MatrixCellState.Hurt) {
			console.log(`Try attack already hurted cell: ${playerName}, ${x}, ${y}`);
			makeStep();
			return AttackCellResult.Hurt;
		} else if (cell === MatrixCellState.Kill) {
			console.log(`Try attack already killed cell: ${playerName}, ${x}, ${y}`);
			makeStep();
			return AttackCellResult.Kill;
		}

		if (cell === MatrixCellState.Empty) {
			enemy.matrix[y][x] = MatrixCellState.Miss;
			makeStep();
			return AttackCellResult.Miss;
		}

		if (cell === MatrixCellState.Ship) {
			if (isShipKilled(enemy.matrix, this.boardSize, x, y)) {
				if (isAllShipsKilled(enemy.matrix, this.boardSize)) {
					this.#endGame();
					return AttackCellResult.Win;
				}
				return AttackCellResult.Kill;
			}

			enemy.matrix[y][x] = MatrixCellState.Hurt;
			return AttackCellResult.Hurt;
		}

		return { error: "GREAT ERROR INTERNAL" };
	}

	#endGame(id) {
		const game = getGame(id);

		const model = new WarshipGame({
			dateCreate: game.dateCreate,
			playerOne: {
				name: game.playerOne.name
			},
			playerTwo: {
				name: game.playerTwo.name
			}
		});
		model.save();

		this.games = this.games.filter(x => x.id !== game.id);
	}
}

export default WarshipGameService;