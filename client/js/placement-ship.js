import { setShipInMatrix, valid } from "./matrix-logic.js";

let clickShip = 0;

export const chooseShip = (e) => {
  const nameShip = e.target.parentElement.className;
  clickShip = parseInt(nameShip.split(" ")[1]);
  e.target.parentElement.style.display = "none";
};

export const placementShip = (e) => {
  const cell = e.target.id;
  const idCell = cell.split(" ");
  const row = parseInt(idCell[0]);
  const column = parseInt(idCell[1]);
  const elem = document.getElementById(`${row + 1} ${column}`);

  if (e.type == "mouseover") {
    if (valid(row, column, clickShip)) {
      for (var i = 0; i < clickShip; i++) {
        let elem = document.getElementById(`${row + i} ${column}`);
        elem.style.background = "pink";
      }
    }

    //   if (e.target.style.background != "black"){
    //     const color = e.target.style.background === "black" ?  "black" : "pink";
    //     e.target.style.background = color;
    //     elem.style.background = color;
    //   }
  }
  if (e.type == "mouseout") {
    if (valid(row, column, clickShip)) {
      for (var i = 0; i < clickShip; i++) {
        let elem = document.getElementById(`${row + i} ${column}`);
        elem.style.background = "";
      }
    }
  }
  if (e.type == "mousedown") {
    const validCell = setShipInMatrix(row, column, clickShip);
    if (validCell === false) return;
    for (var i = 0; i < clickShip; i++) {
      let elem = document.getElementById(`${row + i} ${column}`);
      elem.style.background = "black";
    }
    clickShip = 0; // для сроса выбранного корабля
  }
};
