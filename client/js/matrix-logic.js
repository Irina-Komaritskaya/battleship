const createMatrix = () => {
  let matrix = [];
  for (let i = 0; i < 10; i++) {
    matrix[i] = new Array(10).fill(0);
  }
  return matrix;
};

export const matrix = createMatrix();

export const valid = (row, column, clickShip) => {
  for (let i = 0; i < clickShip; i++) {
    let cell = matrix[row + i][column];
    if (cell != 0) return false;
    if (!validCellInBord(row+i, column)) return false;
  }
  return true;
};

const validCellInBord = (row, column) => {
  if (row > 9 || row < 0 || column > 9 || column < 0) return false;
  return true;
};
const CellStatus = {
  Empty: 0,
  Ship: 1,
  Lock: 2,
};
export const setShipInMatrix = (row, column, clickShip) => {
  const validCell = valid(row, column, clickShip);
  if (validCell === false) return false;

  for (let i = 0; i < clickShip; i++) {
    if (validCellInBord(row + i, column)) {
      matrix[row + i][column] = CellStatus.Ship;
    }
  }

  for (let i = 0; i < clickShip; i++) {
    if (validCellInBord(row + i, column - 1)) {
      matrix[row + i][column - 1] = CellStatus.Lock;
    }
    if (validCellInBord(row + i, column + 1)) {
      matrix[row + i][column + 1] = CellStatus.Lock;
    }
  }

  for (let i = -1; i < 2; i++) {
    if (validCellInBord(row - 1, column + i)) {
      matrix[row - 1][column + i] = CellStatus.Lock;
    }
    if (validCellInBord(row + clickShip, column + i)) {
      matrix[row + clickShip][column + i] = CellStatus.Lock;
    }
  }

  return true;
};
