import { attack, getLastStep, endGame, startGame } from "./api.js";
import { createCaption } from "./render-elements.js";

const renderAttack = (status, row, column, boardOpponent) => {
  if (status === "miss") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    console.log(elem);
    const icon = document.createElement("div");
    icon.setAttribute("class", "miss");
    elem.appendChild(icon);
  }
  if (status === "hurt") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    const icon = document.createElement("div");
    icon.setAttribute("class", "hurt");
    elem.setAttribute("class", "");
    elem.appendChild(icon);
  }
  if (status === "kill") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    const icon = document.createElement("div");
    icon.setAttribute("class", "hurt");
    elem.setAttribute("class", "");
    elem.appendChild(icon);
  }
  if (status === "win") {
    let elem = boardOpponent.childNodes[row].childNodes[column];
    const icon = document.createElement("div");
    icon.setAttribute("class", "hurt");
    elem.appendChild(icon);
    createCaption("Победа!");
  }
};

let prevStepId = null;

export const handlerOpponentBoard = (e, gameId, name, boardOpponent, board) => {
  const cell = e.target.id;
  const idCell = cell.split(" ");
  const row = parseInt(idCell[0]);
  const column = parseInt(idCell[1]);
  const status = {
    0: "miss",
    1: "hurt",
    2: "kill",
    3: "win",
  };

  attack(name, row, column, gameId).then((res) => {
    renderAttack(status[res.result], row, column, boardOpponent);
    if (res.continue === false) {
      const waitEnemyStep = setInterval(() => {
        getLastStep(gameId).then((res) => {
          if (prevStepId !== res.id && res.playerName !== name) {
            prevStepId = res.id;
            clearInterval(waitEnemyStep);
            createCaption("Ваш ход");
            renderAttack(status[res.result], res.row, res.column, board);
          }
        });
      }, 1000);
    }
  });
  //отправляем координты, получаем статус
};

export const gameOver = (
  gameId,
  name,
  outGame,
  boardOpponent,
  renderGameStart
) => {
  endGame(gameId, name).then(() => {
    boardOpponent.style.display = "none";
    createCaption("Игра закончена");
    outGame.innerHTML = "Начать новую игру";
    outGame.onmousedown = renderGameStart;
  }).catch(() => {
    boardOpponent.style.display = "none";
    createCaption("Игра закончена");
    outGame.innerHTML = "Начать новую игру";
    outGame.onmousedown = renderGameStart;
  });
};
