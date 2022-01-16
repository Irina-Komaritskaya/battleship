import { createBoard, initateShips } from "./render-elements.js";
import { placementShip, chooseShip } from "./placement-ship.js";
import { startGame } from "./api.js";
import { matrix } from "./matrix-logic.js";
(function () {
  const board = document.getElementById("board");
  const shipPanel = document.getElementById("shipPanel");
  const startButton = document.getElementById("start");

  createBoard(board);
  initateShips(shipPanel);

  const convert = (matrix) => {
    let result = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (matrix[j][i] === 2) result += "0";
        else result+=matrix[j][i]
      }
    }
    console.log(result);
    return result;
  };

  board.onmouseover = board.onmouseout = board.onmousedown = placementShip;
  shipPanel.onmousedown = chooseShip;
  startButton.onmousedown = async () => await startGame("test", convert(matrix));
})();
