import MatrixCellState from '../enums/matrix-cell-state.js';

function isShipKilled(matrix, size, x, y) {
	let direction = ShipDirection.None;

	if (x > 0 && (matrix[y][x - 1] === MatrixCellState.Ship)) {
		direction = ShipDirection.Horizontal;
	} else if (x < (size - 1) && (matrix[y][x + 1] === MatrixCellState.Ship)) {
		direction = ShipDirection.Horizontal;
	}
	if (y > 0 && (matrix[y - 1][x] === MatrixCellState.Ship)) {
		direction = ShipDirection.Vertical;
	} else if (y < (size - 1) && (matrix[y + 1][x] === MatrixCellState.Ship)) {
		direction = ShipDirection.Vertical;
	}

	if (direction === ShipDirection.None) {
		return true;
	} else if (direction === ShipDirection.Horizontal) {
		let startX = x;
		while (
			startX > 0
			&& (matrix[y][startX] !== MatrixCellState.Miss
				|| matrix[y][startX] !== MatrixCellState.Empty)) {
			startX--;
		}

		let curX = startX;
		while (
			curX < size
			&& (matrix[y][curX] !== MatrixCellState.Miss
				|| matrix[y][curX] !== MatrixCellState.Empty)) {
			if (matrix[y][curX] === MatrixCellState.Ship) {
				return false;
			}
			curX++;
		}

		return true;
	} else if (direction === ShipDirection.Vertical) {
		let startY = y;
		while (
			startY > 0
			&& (matrix[startY][x] !== MatrixCellState.Miss
				|| matrix[startY][x] !== MatrixCellState.Empty)) {
			startY--;
		}

		let curY = startY;
		while (
			curY < size
			&& (matrix[curY][x] !== MatrixCellState.Miss
				|| matrix[curY][x] !== MatrixCellState.Empty)) {
			if (matrix[curY][x] === MatrixCellState.Ship) {
				return false;
			}
			curY++;
		}

		return true;
	}

	return false;
}

function isAllShipsKilled(matrix, size) {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			if (matrix[i][j] === MatrixCellState.Ship) {
				return false;
			}
		}
	}
	return true;
}

const ShipDirection = {
	None: 0,
	Horizontal: 1,
	Vertical: 2
};

export { isShipKilled, isAllShipsKilled };