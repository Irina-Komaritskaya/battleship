import { setShipInMatrix, valid } from "./matrix-logic.js";

let clickShip = 0;

export const chooseShip = (e) => {
  const nameShip = e.target.parentElement.className;
  clickShip = parseInt(nameShip.split(" ")[1]);
  e.target.parentElement.style.display = "none";
};

export const placementShip = (e) => {
  if (clickShip === 0) return;
  const cell = e.target.id;
  const idCell = cell.split(" ");
  const row = parseInt(idCell[0]);
  const column = parseInt(idCell[1]);
  const elementBoard = document.getElementById(`${row} ${column}`);
  if (elementBoard === null) return;
  if (cell === null) return;
  if (e.type == "mouseover") {
    if (valid(row, column, clickShip)) {
      for (var i = 0; i < clickShip; i++) {
        let elem = document.getElementById(`${row + i} ${column}`);
        elem.setAttribute("class", "spipPlace shipFocus");
      }
    }
  }
  if (e.type == "mouseout") {
    if (valid(row, column, clickShip)) {
      for (var i = 0; i < clickShip; i++) {
        let elem = document.getElementById(`${row + i} ${column}`);
        elem.removeAttribute("class", "spipPlace shipFocus");
      }
    }
  }
  if (e.type == "mousedown") {
    const validCell = setShipInMatrix(row, column, clickShip);
    if (validCell === false) return;
    for (var i = 0; i < clickShip; i++) {
      let elem = document.getElementById(`${row + i} ${column}`);
      elem.setAttribute("class", "spipPlace");
    }
    clickShip = 0; // для сроса выбранного корабля
  }
};
