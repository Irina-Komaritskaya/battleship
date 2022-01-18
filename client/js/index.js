import {
  createBoard,
  initateShips,
  createCaption,
  loadIndex,
} from "./render-elements.js";
import { placementShip, chooseShip } from "./placement-ship.js";
import { startGame, searchOpponent, endGame } from "./api.js";
import { handlerOpponentBoard, gameOver } from "./game-logic.js";
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
  const playerInput = document.getElementById("inputPlayer");
  const playerDiv = document.getElementById("player");
  const playerBtn = document.getElementById("playerBtn");
  const outGame = document.getElementById("outGame");
  
  let player = playerInput.value;
  let gameId = null;

  loadIndex(ShipBtn);

  const restartGameHandler = () => {
    if (gameId) {
      endGame(res.gameId, name).then(() => {
        gameId = null;
        createBoard(board);
        initateShips(shipPanel);
        board.setAttribute("class", "board");
        ShipBtn.style.display = "";
        createCaption("Расставьте корабли");
      });
    } else {
      createBoard(board);
      initateShips(shipPanel);
      board.setAttribute("class", "board");
      ShipBtn.style.display = "";
      createCaption("Расставьте корабли");
    }
  };

  const handlerPlayer = () => {
    player = playerInput.value;
    outGame.setAttribute("class", "");
    outGame.innerHTML = "";
    searchOpponent(player).then((res) => {
      if (res.success) {
        restartGameHandler();
        // gameId = res.gameId;
        
        // opponentBoard.setAttribute("class", "board");
        // board.setAttribute("class", "board");
        // outGame.setAttribute("class", "button btnOut");
        // outGame.innerHTML = "Закончить игру";
      }
    })
    .catch(() => {
      gameId = null;
      createBoard(board);
      initateShips(shipPanel);
      board.setAttribute("class", "board");
      ShipBtn.style.display = "";
      createCaption("Расставьте корабли");
    });

    playerDiv.style.display = "none";
  };

  const convert = (matrix) => {
    let result = "";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (matrix[i][j] === 2) result += "0";
        else result += matrix[i][j];
      }
    }
    return result;
  };

  const cancelAllShipOnBoard = () => {
    createBoard(board);
    initateShips(shipPanel);
  };

  const pendingOpponent = async (name) => {
    const intervalObj = setInterval(() => {
      if (gameId) {
        clearInterval(intervalObj);
        return;
      }

      searchOpponent(name).then((res) => {
        console.log(res);
        if (res.success) {
          gameId = res.gameId;
          createCaption("Противник найден")
        }
        return res;
      });
    }, 1000);
  };

  const renderGameStart = () => {
    createBoard(opponentBoard);
    opponentBoard.setAttribute("class", "board");
    shipPanel.style.display = "none";
    ShipBtn.style.display = "none";
    outGame.setAttribute("class", "button btnOut");
    outGame.innerHTML = "Закончить игру";
    // createCaption("Ход: player");
    createCaption("ожидание");
    boardOpponent.style.display = 'block';
  };

  startBtn.addEventListener("click", renderGameStart);
  startBtn.addEventListener("click", () => startGame(player, convert(matrix)));
  startBtn.addEventListener("click", () => pendingOpponent(player));

  outGame.onmousedown = (e) => gameOver(gameId, player, outGame, boardOpponent, restartGameHandler);
  playerBtn.addEventListener("click", () => handlerPlayer());
  opponentBoard.onmousedown = (e) =>
    handlerOpponentBoard(e, gameId, player, opponentBoard, board);
  board.onmouseover = board.onmouseout = board.onmousedown = placementShip;
  shipPanel.onmousedown = chooseShip;
  cancelAllShipBtn.onmousedown = cancelAllShipOnBoard;
})();
