import { Router } from 'express';
import WarshipGameService from '../service/warship-game-service.js';

const router = Router()
const service = new WarshipGameService();

router.post('/warship-game/connect', async (req, res) => {
	console.log(`new player connect: ${req.body.player.name}`);

	service.playerConnect({
		name: req.body.player.name,
		matrix: req.body.player.matrix,
	});

	res.json({ success: true });
})

router.post('/warship-game/start', async (req, res) => {
	console.log(`try start game player: ${req.body.player.name}`);

	const gameStatus = service.startGame(req.body.player.name);
	if (gameStatus.error || !gameStatus.success) {
		res.json({ success: false, error: gameStatus.error || "internal error" });
		return;
	}

	console.log(`get start game: ${gameStatus.gameId} for player: ${req.body.player.name}`);
	res.json(gameStatus);
});

router.post('/warship-game/state', async (req, res) => {
	console.log(`try get state game: ${req.body.gameId} for game player: ${req.body.player.name}`);

	const game = service.getGameForPlayer(req.body.gameId, req.body.player.name);
	if (!game) {
		res.json({ success: false, error: "can't find game" });
		return;
	}

	console.log(`get state game: ${game.id} for player: ${req.body.player.name}`);
	res.json(gameStatus);
});

router.post('/warship-game/end', async (req, res) => {
	console.log(`end game: ${req.body.gameId} player: ${req.body.player.name}`);

	const gameStatus = service.endGame(req.body.gameId, req.body.player.name);
	if (gameStatus.error || !gameStatus.success) {
		res.json({ success: false, error: gameStatus.error || "internal error" });
		return;
	}

	console.log(`successful end game: ${gameStatus.gameId}`);
	res.json(gameStatus);
});

router.post('/warship-game/step-last', async (req, res) => {
	const stepStatus = service.getLastStep(req.body.gameId);
	if (stepStatus.error || !stepStatus.success) {
		res.json({ success: false, error: stepStatus.error || "internal error" });
		return;
	}

	res.json(stepStatus);
});

router.post('/warship-game/attack', async (req, res) => {
	console.log(`try attack cell, game player: ${req.body.player.name}`);

	const cellStatus = await service.makeStep(
		req.body.gameId,
		req.body.player.name,
		req.body.column,
		req.body.row);

	if (cellStatus.error || !cellStatus.success) {
		console.log(`attack cell fail: ${cellStatus.error}, game: ${req.body.gameId} for player: ${req.body.player.name}`);
	} else {
		console.log(`attack cell result: ${cellStatus.result}, game: ${req.body.gameId} for player: ${req.body.player.name}`);
	}

	res.json(cellStatus);
});

export default router;