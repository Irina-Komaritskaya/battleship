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

  const shipDeck = {
    one: { cell: 1, count: 4 },
    two: { cell: 2, count: 3 },
    three: { cell: 3, count: 2 },
    four: { cell: 4, count: 1 },
  };

  const createShip = (countCell) => {
    const ship = document.createElement("div");
    ship.setAttribute("class", "ship " + countCell);
    for (let i = 0; i < countCell; i++) {
      const deck = document.createElement("div");
      ship.appendChild(deck);
    }
    return ship;
  };

  const initateShips = () => {
    for (var key in shipDeck) {
      for (let i = 0; i < shipDeck[key].count; i++) {
        let ship = createShip(shipDeck[key].cell);
        shipPanel.appendChild(ship);
      }
    }
  };

  initateShips();

  let clickShip = 0;
  shipPanel.addEventListener("click", function (e) {
    const nameShip = e.target.parentElement.className;
    clickShip = nameShip.split(" ")[1];
    e.target.parentElement.style.display = "none";
  });

  // const valid = (row, column) => {
  //     let cell = matrix[row][column];
  //    const result = cell === 0 ? true : false;
  //     console.log(result);
  //     console.log(cell)
  //   return result;
  // };

  const func = (e) => {
    const cell = e.target.id;
    const idCell = cell.split(" ");
    const row = parseInt(idCell[0]);
    const column = parseInt(idCell[1]);
    const elem = document.getElementById(`${row + 1} ${column}`);

    if (e.type == "mouseover") {
      //   if (e.target.style.background != "black"){
      //     const color = e.target.style.background === "black" ?  "black" : "pink";
      //     e.target.style.background = color;
      //     elem.style.background = color;
      //   }
    }
    if (e.type == "mouseout") {
      // const color = e.target.style.background === "black" ?  "black" : "";
      // elem.style.background = color;
      // e.target.style.background = color;
      //console.log(color)
    }
    if (e.type == "mousedown") {
      //0 пусто, 1 корабль, 2 блок
      //const validCell = valid(row, column);
      // if (validCell === false) return null;
      for (var i = 0; i < clickShip; i++) {
        matrix[row + i][column] = 1;
        console.log( matrix[row + i][column])
        matrix[row][column + i] = 2;
        console.log( matrix[row][column + i])
        matrix[row][column - i] = 2;
        console.log( matrix[row][column - i])
        let elem = document.getElementById(`${row + i} ${column}`);
        elem.style.background = "black";
        
      }
      clickShip = 0;
      
      // e.target.style.background = "black";
      // elem.style.background = "black";
      // document.getElementById(idCell).innerHTML = "X";
    }
  };
  

  board.onmouseover = board.onmouseout = board.onmousedown = func;
})();
