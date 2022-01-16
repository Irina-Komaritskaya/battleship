let matrix = [];
  const board = document.getElementById("board");
  const shipPanel = document.getElementById("shipPanel");

  export const CreateBoard = () => {
    for (var i = 0; i < 10; i++) {
      matrix[i] = new Array(10).fill(0);
      const row = document.createElement("span");
      row.setAttribute("class", "row");
      board.appendChild(row);
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", `${i} ${j}`);
        row.appendChild(cell);
      }
    }
    return matrix;
  };

  const shipDeck = {
    one: { cell: 1, count: 4 },
    two: { cell: 2, count: 3 },
    three: { cell: 3, count: 2 },
    four: { cell: 4, count: 1 },
  };

 export const createShip = (countCell) => {
    const ship = document.createElement("div");
    ship.setAttribute("class", "ship " + countCell);
    for (let i = 0; i < countCell; i++) {
      const deck = document.createElement("div");
      ship.appendChild(deck);
    }
    return ship;
  };

  export const initateShips = () => {
    for (var key in shipDeck) {
      for (let i = 0; i < shipDeck[key].count; i++) {
        let ship = createShip(shipDeck[key].cell);
        shipPanel.appendChild(ship);
      }
    }
  };