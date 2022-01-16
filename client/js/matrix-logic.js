const createMatrix = () => {
  let matrix = [];
  for (var i = 0; i < 10; i++) {
    matrix[i] = new Array(10).fill(0);
  }
  return matrix;
};

const matrix = createMatrix();

export const valid = (row, column, clickShip) => {
  for (let i = 0; i < clickShip; i++) {
    let cell = matrix[row + i][column];
    if (cell != 0) return false;
  }
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
    matrix[row + i][column] = CellStatus.Ship;
  }

  for (let i = 0; i < clickShip; i++) {
    matrix[row + i][column + 1] = CellStatus.Lock;
    matrix[row + i][column - 1] = CellStatus.Lock;
  }

  for (let i = -1; i < 2; i++) {
    matrix[row - 1][column + i] = CellStatus.Lock;
    matrix[row + clickShip][column + i] = CellStatus.Lock;
  }
console.log(matrix)
  return true;
};
