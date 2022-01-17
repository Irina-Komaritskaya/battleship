import { createBoard, initateShips, createCaption } from "./render-elements.js";
import { placementShip, chooseShip } from "./placement-ship.js";
import { startGame } from "./api.js";
import { matrix } from "./matrix-logic.js";
(function () {
  const board = document.getElementById("board");
  const shipPanel = document.getElementById("shipPanel");
  const startBtn = document.getElementById("start");
  const rotateBtn = document.getElementById("roration");
  const cancelShipBtn = document.getElementById("cancel");
  const cancelAllShipBtn = document.getElementById("cancelAll");
  const ShipBtn = document.getElementById("btnList");
  const opponentBoard = document.getElementById("boardOpponent");

  createBoard(board);
  initateShips(shipPanel);
  createCaption("Расставьте корабли");

  const convert = (matrix) => {
    let result = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (matrix[j][i] === 2) result += "0";
        else result += matrix[j][i];
      }
    }
    console.log(result);
    return result;
  };

  const cancelAllShipOnBoard = () => {
    createBoard(board);
    initateShips(shipPanel);
  };

  const gameStart = () => {
    createBoard(opponentBoard);
    opponentBoard.setAttribute("class", "board");
    shipPanel.style.display = "none";
    ShipBtn.style.display = "none";
    createCaption("Ход: player");
  };

  startBtn.addEventListener("click", gameStart);

  
  board.onmouseover = board.onmouseout = board.onmousedown = placementShip;
  shipPanel.onmousedown = chooseShip;
  cancelAllShipBtn.onmousedown = cancelAllShipOnBoard;
  startBtn.onmousedown = async () => await startGame("test", convert(matrix));
})();
