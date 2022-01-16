import {createBoard, initateShips} from "./render-elements.js"
import {placementShip, chooseShip} from "./placement-ship.js"

(function () {  

  const board = document.getElementById("board");
  const shipPanel = document.getElementById("shipPanel");
  
  
  
  createBoard(board);
  initateShips(shipPanel);

  board.onmouseover = board.onmouseout = board.onmousedown = placementShip;
  shipPanel.onmousedown = chooseShip;
})();
