/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/js/api.js":
/*!**************************!*\
  !*** ./client/js/api.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"startGame\": () => (/* binding */ startGame),\n/* harmony export */   \"searchOpponent\": () => (/* binding */ searchOpponent),\n/* harmony export */   \"attack\": () => (/* binding */ attack),\n/* harmony export */   \"getLastStep\": () => (/* binding */ getLastStep),\n/* harmony export */   \"endGame\": () => (/* binding */ endGame)\n/* harmony export */ });\nconst urlApi = \"http://127.0.0.1:3000/warship-game/\";\n\nconst getData = async (url, params) => {\n  const res = await fetch(url, params);\n\n  if (res.status !== 200) {\n    throw new Error(res.statusText);\n  }\n\n  const json = await res.json();\n  console.log(json);\n\n  if (json.success === true) {\n    return json;\n  } else {\n    throw new Error(json.error);\n  }\n};\n\nconst startGame = async (name, matrix) => {\n  const url = urlApi + \"connect\";\n  const result = await getData(url, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json;charset=utf-8\"\n    },\n    body: JSON.stringify({\n      player: {\n        name,\n        matrix\n      }\n    })\n  });\n  return result;\n};\nconst searchOpponent = async name => {\n  const url = urlApi + \"start\";\n  const result = await getData(url, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json;charset=utf-8\"\n    },\n    body: JSON.stringify({\n      player: {\n        name\n      }\n    })\n  });\n  return result;\n};\nconst attack = async (name, row, column, gameId) => {\n  const url = urlApi + \"attack\";\n  const result = await getData(url, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json;charset=utf-8\"\n    },\n    body: JSON.stringify({\n      gameId: gameId,\n      player: {\n        name\n      },\n      column,\n      row\n    })\n  });\n  return result;\n};\nconst getLastStep = async gameId => {\n  const url = urlApi + \"step-last\";\n  const result = await getData(url, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json;charset=utf-8\"\n    },\n    body: JSON.stringify({\n      gameId: gameId\n    })\n  });\n  return result;\n};\nconst endGame = async (gameId, name) => {\n  const url = urlApi + \"end\";\n  const result = await getData(url, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json;charset=utf-8\"\n    },\n    body: JSON.stringify({\n      gameId: gameId,\n      player: {\n        name\n      }\n    })\n  });\n  return result;\n};\n\n//# sourceURL=webpack:///./client/js/api.js?");

/***/ }),

/***/ "./client/js/game-logic.js":
/*!*********************************!*\
  !*** ./client/js/game-logic.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handlerOpponentBoard\": () => (/* binding */ handlerOpponentBoard),\n/* harmony export */   \"gameOver\": () => (/* binding */ gameOver)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./client/js/api.js\");\n/* harmony import */ var _render_elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-elements.js */ \"./client/js/render-elements.js\");\n\n\n\nconst renderAttack = (status, row, column, boardOpponent) => {\n  if (status === \"miss\") {\n    let elem = boardOpponent.childNodes[row].childNodes[column];\n    console.log(elem);\n    const icon = document.createElement(\"div\");\n    icon.setAttribute(\"class\", \"miss\");\n    elem.appendChild(icon);\n  }\n\n  if (status === \"hurt\") {\n    let elem = boardOpponent.childNodes[row].childNodes[column];\n    const icon = document.createElement(\"div\");\n    icon.setAttribute(\"class\", \"hurt\");\n    elem.setAttribute(\"class\", \"\");\n    elem.appendChild(icon);\n  }\n\n  if (status === \"kill\") {\n    let elem = boardOpponent.childNodes[row].childNodes[column];\n    const icon = document.createElement(\"div\");\n    icon.setAttribute(\"class\", \"hurt\");\n    elem.setAttribute(\"class\", \"\");\n    elem.appendChild(icon);\n  }\n\n  if (status === \"win\") {\n    let elem = boardOpponent.childNodes[row].childNodes[column];\n    const icon = document.createElement(\"div\");\n    icon.setAttribute(\"class\", \"hurt\");\n    elem.appendChild(icon);\n    (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_1__.createCaption)(\"Победа!\");\n  }\n};\n\nlet prevStepId = null;\nconst handlerOpponentBoard = (e, gameId, name, boardOpponent, board) => {\n  const cell = e.target.id;\n  const idCell = cell.split(\" \");\n  const row = parseInt(idCell[0]);\n  const column = parseInt(idCell[1]);\n  const status = {\n    0: \"miss\",\n    1: \"hurt\",\n    2: \"kill\",\n    3: \"win\"\n  };\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.attack)(name, row, column, gameId).then(res => {\n    renderAttack(status[res.result], row, column, boardOpponent);\n\n    if (res.continue === false) {\n      const waitEnemyStep = setInterval(() => {\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getLastStep)(gameId).then(res => {\n          if (prevStepId !== res.id && res.playerName !== name) {\n            prevStepId = res.id;\n            clearInterval(waitEnemyStep);\n            (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_1__.createCaption)(\"Ваш ход\");\n            renderAttack(status[res.result], res.row, res.column, board);\n          }\n        });\n      }, 1000);\n    }\n  }); //отправляем координты, получаем статус\n};\nconst gameOver = (gameId, name, outGame, boardOpponent, renderGameStart) => {\n  (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.endGame)(gameId, name).then(() => {\n    boardOpponent.style.display = \"none\";\n    (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_1__.createCaption)(\"Игра закончена\");\n    outGame.innerHTML = \"Начать новую игру\";\n    outGame.onmousedown = renderGameStart;\n  }).catch(() => {\n    boardOpponent.style.display = \"none\";\n    (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_1__.createCaption)(\"Игра закончена\");\n    outGame.innerHTML = \"Начать новую игру\";\n    outGame.onmousedown = renderGameStart;\n  });\n};\n\n//# sourceURL=webpack:///./client/js/game-logic.js?");

/***/ }),

/***/ "./client/js/index.js":
/*!****************************!*\
  !*** ./client/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render_elements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-elements.js */ \"./client/js/render-elements.js\");\n/* harmony import */ var _placement_ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placement-ship.js */ \"./client/js/placement-ship.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ \"./client/js/api.js\");\n/* harmony import */ var _game_logic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game-logic.js */ \"./client/js/game-logic.js\");\n/* harmony import */ var _matrix_logic_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./matrix-logic.js */ \"./client/js/matrix-logic.js\");\n\n\n\n\n\n\n(function () {\n  const board = document.getElementById(\"board\");\n  const shipPanel = document.getElementById(\"shipPanel\");\n  const startBtn = document.getElementById(\"start\");\n  const rotateBtn = document.getElementById(\"roration\");\n  const cancelShipBtn = document.getElementById(\"cancel\");\n  const cancelAllShipBtn = document.getElementById(\"cancelAll\");\n  const ShipBtn = document.getElementById(\"btnList\");\n  const opponentBoard = document.getElementById(\"boardOpponent\");\n  const playerInput = document.getElementById(\"inputPlayer\");\n  const playerDiv = document.getElementById(\"player\");\n  const playerBtn = document.getElementById(\"playerBtn\");\n  const outGame = document.getElementById(\"outGame\");\n  let player = playerInput.value;\n  let gameId = null;\n  (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.loadIndex)(ShipBtn);\n\n  const restartGameHandler = () => {\n    if (gameId) {\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.endGame)(res.gameId, name).then(() => {\n        gameId = null;\n        (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board);\n        (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.initateShips)(shipPanel);\n        board.setAttribute(\"class\", \"board\");\n        ShipBtn.style.display = \"\";\n        (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createCaption)(\"Расставьте корабли\");\n      });\n    } else {\n      (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board);\n      (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.initateShips)(shipPanel);\n      board.setAttribute(\"class\", \"board\");\n      ShipBtn.style.display = \"\";\n      (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createCaption)(\"Расставьте корабли\");\n    }\n  };\n\n  const handlerPlayer = () => {\n    player = playerInput.value;\n    outGame.setAttribute(\"class\", \"\");\n    outGame.innerHTML = \"\";\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.searchOpponent)(player).then(res => {\n      if (res.success) {\n        restartGameHandler(); // gameId = res.gameId;\n        // opponentBoard.setAttribute(\"class\", \"board\");\n        // board.setAttribute(\"class\", \"board\");\n        // outGame.setAttribute(\"class\", \"button btnOut\");\n        // outGame.innerHTML = \"Закончить игру\";\n      }\n    }).catch(() => {\n      gameId = null;\n      (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board);\n      (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.initateShips)(shipPanel);\n      board.setAttribute(\"class\", \"board\");\n      ShipBtn.style.display = \"\";\n      (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createCaption)(\"Расставьте корабли\");\n    });\n    playerDiv.style.display = \"none\";\n  };\n\n  const convert = matrix => {\n    let result = \"\";\n\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        if (matrix[i][j] === 2) result += \"0\";else result += matrix[i][j];\n      }\n    }\n\n    return result;\n  };\n\n  const cancelAllShipOnBoard = () => {\n    (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(board);\n    (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.initateShips)(shipPanel);\n  };\n\n  const pendingOpponent = async name => {\n    const intervalObj = setInterval(() => {\n      if (gameId) {\n        clearInterval(intervalObj);\n        return;\n      }\n\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.searchOpponent)(name).then(res => {\n        console.log(res);\n\n        if (res.success) {\n          gameId = res.gameId;\n          (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createCaption)(\"Противник найден\");\n        }\n\n        return res;\n      });\n    }, 1000);\n  };\n\n  const renderGameStart = () => {\n    (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)(opponentBoard);\n    opponentBoard.setAttribute(\"class\", \"board\");\n    shipPanel.style.display = \"none\";\n    ShipBtn.style.display = \"none\";\n    outGame.setAttribute(\"class\", \"button btnOut\");\n    outGame.innerHTML = \"Закончить игру\"; // createCaption(\"Ход: player\");\n\n    (0,_render_elements_js__WEBPACK_IMPORTED_MODULE_0__.createCaption)(\"ожидание\");\n    boardOpponent.style.display = 'block';\n  };\n\n  startBtn.addEventListener(\"click\", renderGameStart);\n  startBtn.addEventListener(\"click\", () => (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.startGame)(player, convert(_matrix_logic_js__WEBPACK_IMPORTED_MODULE_4__.matrix)));\n  startBtn.addEventListener(\"click\", () => pendingOpponent(player));\n\n  outGame.onmousedown = e => (0,_game_logic_js__WEBPACK_IMPORTED_MODULE_3__.gameOver)(gameId, player, outGame, boardOpponent, restartGameHandler);\n\n  playerBtn.addEventListener(\"click\", () => handlerPlayer());\n\n  opponentBoard.onmousedown = e => (0,_game_logic_js__WEBPACK_IMPORTED_MODULE_3__.handlerOpponentBoard)(e, gameId, player, opponentBoard, board);\n\n  board.onmouseover = board.onmouseout = board.onmousedown = _placement_ship_js__WEBPACK_IMPORTED_MODULE_1__.placementShip;\n  shipPanel.onmousedown = _placement_ship_js__WEBPACK_IMPORTED_MODULE_1__.chooseShip;\n  cancelAllShipBtn.onmousedown = cancelAllShipOnBoard;\n})();\n\n//# sourceURL=webpack:///./client/js/index.js?");

/***/ }),

/***/ "./client/js/matrix-logic.js":
/*!***********************************!*\
  !*** ./client/js/matrix-logic.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"matrix\": () => (/* binding */ matrix),\n/* harmony export */   \"valid\": () => (/* binding */ valid),\n/* harmony export */   \"setShipInMatrix\": () => (/* binding */ setShipInMatrix)\n/* harmony export */ });\nconst createMatrix = () => {\n  let matrix = [];\n\n  for (let i = 0; i < 10; i++) {\n    matrix[i] = new Array(10).fill(0);\n  }\n\n  return matrix;\n};\n\nconst matrix = createMatrix();\nconst valid = (row, column, clickShip) => {\n  for (let i = 0; i < clickShip; i++) {\n    let cell = matrix[row + i][column];\n    if (cell != 0) return false;\n    if (!validCellInBord(row + i, column)) return false;\n  }\n\n  return true;\n};\n\nconst validCellInBord = (row, column) => {\n  if (row > 9 || row < 0 || column > 9 || column < 0) return false;\n  return true;\n};\n\nconst CellStatus = {\n  Empty: 0,\n  Ship: 1,\n  Lock: 2\n};\nconst setShipInMatrix = (row, column, clickShip) => {\n  const validCell = valid(row, column, clickShip);\n  if (validCell === false) return false;\n\n  for (let i = 0; i < clickShip; i++) {\n    if (validCellInBord(row + i, column)) {\n      matrix[row + i][column] = CellStatus.Ship;\n    }\n  }\n\n  for (let i = 0; i < clickShip; i++) {\n    if (validCellInBord(row + i, column - 1)) {\n      matrix[row + i][column - 1] = CellStatus.Lock;\n    }\n\n    if (validCellInBord(row + i, column + 1)) {\n      matrix[row + i][column + 1] = CellStatus.Lock;\n    }\n  }\n\n  for (let i = -1; i < 2; i++) {\n    if (validCellInBord(row - 1, column + i)) {\n      matrix[row - 1][column + i] = CellStatus.Lock;\n    }\n\n    if (validCellInBord(row + clickShip, column + i)) {\n      matrix[row + clickShip][column + i] = CellStatus.Lock;\n    }\n  }\n\n  return true;\n};\n\n//# sourceURL=webpack:///./client/js/matrix-logic.js?");

/***/ }),

/***/ "./client/js/placement-ship.js":
/*!*************************************!*\
  !*** ./client/js/placement-ship.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"chooseShip\": () => (/* binding */ chooseShip),\n/* harmony export */   \"placementShip\": () => (/* binding */ placementShip)\n/* harmony export */ });\n/* harmony import */ var _matrix_logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix-logic.js */ \"./client/js/matrix-logic.js\");\n\nlet clickShip = 0;\nconst chooseShip = e => {\n  console.log(e.target);\n  if (e.target.className || e.target.id) return false;\n  const nameShip = e.target.parentElement.className;\n  clickShip = parseInt(nameShip.split(\" \")[1]);\n  e.target.parentElement.style.display = \"none\";\n};\nconst placementShip = e => {\n  if (clickShip === 0) return;\n  const cell = e.target.id;\n  const idCell = cell.split(\" \");\n  const row = parseInt(idCell[0]);\n  const column = parseInt(idCell[1]);\n  const elementBoard = document.getElementById(`${row} ${column}`);\n  if (elementBoard === null) return;\n  if (cell === null) return;\n\n  if (e.type == \"mouseover\") {\n    if ((0,_matrix_logic_js__WEBPACK_IMPORTED_MODULE_0__.valid)(row, column, clickShip)) {\n      for (var i = 0; i < clickShip; i++) {\n        let elem = document.getElementById(`${row + i} ${column}`);\n        elem.setAttribute(\"class\", \"spipPlace shipFocus\");\n      }\n    }\n  }\n\n  if (e.type == \"mouseout\") {\n    if ((0,_matrix_logic_js__WEBPACK_IMPORTED_MODULE_0__.valid)(row, column, clickShip)) {\n      for (var i = 0; i < clickShip; i++) {\n        let elem = document.getElementById(`${row + i} ${column}`);\n        elem.removeAttribute(\"class\", \"spipPlace shipFocus\");\n      }\n    }\n  }\n\n  if (e.type == \"mousedown\") {\n    const validCell = (0,_matrix_logic_js__WEBPACK_IMPORTED_MODULE_0__.setShipInMatrix)(row, column, clickShip);\n    if (validCell === false) return;\n\n    for (var i = 0; i < clickShip; i++) {\n      let elem = document.getElementById(`${row + i} ${column}`);\n      elem.setAttribute(\"class\", \"spipPlace\");\n    }\n\n    clickShip = 0; // для сроса выбранного корабля\n  }\n};\n\n//# sourceURL=webpack:///./client/js/placement-ship.js?");

/***/ }),

/***/ "./client/js/render-elements.js":
/*!**************************************!*\
  !*** ./client/js/render-elements.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createCaption\": () => (/* binding */ createCaption),\n/* harmony export */   \"loadIndex\": () => (/* binding */ loadIndex),\n/* harmony export */   \"initateShips\": () => (/* binding */ initateShips),\n/* harmony export */   \"createBoard\": () => (/* binding */ createBoard)\n/* harmony export */ });\nconst shipDeck = {\n  one: {\n    cell: 1,\n    count: 4\n  },\n  two: {\n    cell: 2,\n    count: 3\n  },\n  three: {\n    cell: 3,\n    count: 2\n  },\n  four: {\n    cell: 4,\n    count: 1\n  }\n};\nconst createCaption = text => {\n  const caption = document.getElementById('caption');\n  const h2 = caption.childNodes[0];\n  h2.innerHTML = '';\n  h2.innerHTML = text;\n};\nconst loadIndex = ShipBtn => {\n  createCaption(\"Введите имя\");\n  ShipBtn.style.display = \"none\";\n};\n\nconst createShip = countCell => {\n  const ship = document.createElement(\"div\");\n  ship.setAttribute(\"class\", \"ship \" + countCell);\n\n  for (let i = 0; i < countCell; i++) {\n    const deck = document.createElement(\"div\");\n    ship.appendChild(deck);\n  }\n\n  return ship;\n};\n\nconst initateShips = shipPanel => {\n  shipPanel.style.display = \"block\";\n\n  while (shipPanel.firstChild) {\n    shipPanel.firstChild.remove();\n  }\n\n  for (var key in shipDeck) {\n    for (let i = 0; i < shipDeck[key].count; i++) {\n      let ship = createShip(shipDeck[key].cell);\n      shipPanel.appendChild(ship);\n    }\n  }\n};\nconst createBoard = board => {\n  while (board.firstChild) {\n    board.firstChild.remove();\n  }\n\n  for (var i = 0; i < 10; i++) {\n    const row = document.createElement(\"span\");\n    row.setAttribute(\"class\", \"row\");\n    board.appendChild(row);\n\n    for (let j = 0; j < 10; j++) {\n      const cell = document.createElement(\"div\");\n      cell.setAttribute(\"id\", `${i} ${j}`);\n      row.appendChild(cell);\n    }\n  }\n};\n\n//# sourceURL=webpack:///./client/js/render-elements.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/js/index.js");
/******/ 	
/******/ })()
;