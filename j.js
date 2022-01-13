(function () {
  let matrix = [];
  const board = document.getElementById("board");
  const shipPanel = document.getElementById("shipPanel");

  const CreateBoard = () => {
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

  CreateBoard();

  board.addEventListener("click", function (e) {
    const idCell = e.target.id;
    indexMatrix = idCell.split(" ");
    document.getElementById(idCell).innerHTML = "X";

    matrix[indexMatrix[0]][indexMatrix[1]] = "X";
    console.log(matrix[0][0]);
  });

  const shipDeck = {
    one: { cell: 1, count: 4 },
    two: { cell: 2, count: 3 },
    three: { cell: 3, count: 2 },
    four: { cell: 4, count: 1 },
  };

  const createShip = (countCell) => {
    const ship = document.createElement("div");
    ship.setAttribute("class", "ship");
    for (let i = 0; i < countCell; i++) {
      const deck = document.createElement("div");
      ship.appendChild(deck);
    }
    return ship;
  };

  const initateShips = () => {
    for (var key in shipDeck){
        console.log(shipDeck[key].count)
        for (let i = 0; i < shipDeck[key].count; i++) {
            let ship = createShip(shipDeck[key].cell)
            shipPanel.appendChild(ship);
        } 
    }

  }

 initateShips()
})();
