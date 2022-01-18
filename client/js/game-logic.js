import { attack } from "./api.js";
import {createCaption} from "./render-elements.js";

const renderAttack = (status, row, column, boardOpponent) => {
  if (status === "miss") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    console.log(elem)
    const icon = document.createElement("div");
    icon.setAttribute("class", "miss")
    elem.appendChild(icon);
  }
  if (status ==="hurt") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    const icon = document.createElement("div");
    icon.setAttribute("class", "hurt")
    elem.appendChild(icon);
  }
  if (status === "kill") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    const icon = document.createElement("div");
    icon.setAttribute("class", "hurt")
    elem.appendChild(icon);
  }
  if (status === "win") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    const icon = document.createElement("div");
    icon.setAttribute("class", "hurt")
    elem.appendChild(icon);
    createCaption("Победа!");
  }
};
export const handlerOpponentBoard = (e, gameId, name, boardOpponent) => {
  const cell = e.target.id;
  const idCell = cell.split(" ");
  const row = parseInt(idCell[0]);
  const column = parseInt(idCell[1]);

  attack(name, row, column, gameId).then((res) => {
      const status = {
          0: "miss",
          1: "hurt",
          2: "kill",
          3: "win"
      }
    renderAttack(status[res.result], row, column, boardOpponent);
  });
  //отправляем координты, получаем статус
};
