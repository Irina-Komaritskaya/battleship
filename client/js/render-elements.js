
  const shipDeck = {
    one: { cell: 1, count: 4 },
    two: { cell: 2, count: 3 },
    three: { cell: 3, count: 2 },
    four: { cell: 4, count: 1 },
  };

  export const createCaption = (text) =>{
    const caption = document.getElementById('caption')
    const h2 = caption.childNodes[0]
    h2.innerHTML = '';
    h2.innerHTML = text;
  }

  export const loadIndex = (ShipBtn) => {
    createCaption("Введите имя");
    ShipBtn.style.display = "none";
  
  }

  const createShip = (countCell) => {
    const ship = document.createElement("div");
    ship.setAttribute("class", "ship " + countCell);
    for (let i = 0; i < countCell; i++) {
      const deck = document.createElement("div");
      ship.appendChild(deck);
    }
    return ship;
  };

 export const initateShips = (shipPanel) => {
    shipPanel.style.display = "block";

    while (shipPanel.firstChild) {
      shipPanel.firstChild.remove()
    }

    for (var key in shipDeck) {
      for (let i = 0; i < shipDeck[key].count; i++) {
        let ship = createShip(shipDeck[key].cell);
        shipPanel.appendChild(ship);
      }
    }
  };

  export const createBoard = (board) => {
    while (board.firstChild) {
      board.firstChild.remove()
    }

    for (var i = 0; i < 10; i++) {
      const row = document.createElement("span");
      row.setAttribute("class", "row");
      board.appendChild(row);
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", `${i} ${j}`);
        row.appendChild(cell);
      }
    }
  };

  


