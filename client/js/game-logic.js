import { attack } from "./api.js";
const renderAttack = (status, row, column, boardOpponent) => {
  if (status === "miss") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    console.log(elem)
    //elem.setAttribute("class", "spipPlace shipFocus");
    elem.innerHTML = "O";
  }
  if (status ==="hurt") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    //elem.setAttribute("class", "spipPlace shipFocus");
    elem.innerHTML = "X";
  }
  if (status === "kill") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    //elem.setAttribute("class", "spipPlace shipFocus");
    elem.innerHTML = "X";
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
