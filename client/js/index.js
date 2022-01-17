import { createBoard, initateShips, createCaption } from "./render-elements.js";
import { placementShip, chooseShip } from "./placement-ship.js";
import { startGame, searchOpponent } from "./api.js";
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
    return result;
  };

  const cancelAllShipOnBoard = () => {
    createBoard(board);
    initateShips(shipPanel);
  };

  const pendingOpponent = async () => {
    const result = await searchOpponent();
    console.log(result);
    return result;
     
   }

  const renderGameStart = () => {
    createBoard(opponentBoard);
    opponentBoard.setAttribute("class", "board");
    shipPanel.style.display = "none";
    ShipBtn.style.display = "none";
   // createCaption("Ход: player");
   createCaption("ожидание");

  };

 
  startBtn.addEventListener("click", renderGameStart);
  startBtn.addEventListener("click", () => startGame("test", convert(matrix)));
  startBtn.addEventListener("click", () => pendingOpponent("test"));


  board.onmouseover = board.onmouseout = board.onmousedown = placementShip;
  shipPanel.onmousedown = chooseShip;
  cancelAllShipBtn.onmousedown = cancelAllShipOnBoard;
})();
