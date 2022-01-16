const createMatrix = () => {
  let matrix = [];
  for (var i = 0; i < 10; i++) {
    matrix[i] = new Array(10).fill(0);
  }
  return matrix;
};

const matrix = createMatrix();

export const valid = (row, column) => {
  let cell = matrix[row][column];
  const result = cell === 0 ? true : false;
  return result;
};

const CellStatus = {
  Empty: 0,
  Ship: 1,
  Lock: 2,
};
export const setShipInMatrix = (row, column, clickShip) => {
  const validCell = valid(row, column);
  if (validCell === false) return false;
  for (let i = 0; i < clickShip; i++) {
    matrix[row + i][column] = CellStatus.Ship;
    matrix[row + i][column + 1] = CellStatus.Lock;
    matrix[row + i][column - 1] = CellStatus.Lock;
  }
  console.log(matrix)
  return true;
};
