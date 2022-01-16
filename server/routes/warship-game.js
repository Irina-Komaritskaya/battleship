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

	res.json({ successful: true });
})

router.post('/warship-game/start', async (req, res) => {
	console.log(`try start game player: ${req.body.player.name}`);

	const gameStatus = service.startGame(req.body.player.name);
	if (gameStatus.error || !gameStatus.successful) {
		res.json({ error: gameStatus.error || "internal error" });
		return;
	}

	console.log(`get game: ${gameStatus.gameId} for player: ${req.body.player.name}`);
	res.json({ gameId: gameStatus.gameId });
});

router.post('/warship-game/attack', async (req, res) => {
	console.log(`try attack cell, game player: ${req.body.player.name}`);

	const cellStatus = await service.makeStep(
		req.body.gameId,
		req.body.player.name,
		req.body.column,
		req.body.row);

	if (cellStatus.error || !cellStatus.successful) {
		console.log(`attack cell fail: ${cellStatus.error}, game: ${req.body.gameId} for player: ${req.body.player.name}`);
	} else {
		console.log(`attack cell result: ${cellStatus.result}, game: ${req.body.gameId} for player: ${req.body.player.name}`);
	}

	res.json(cellStatus);
});

export default router;