(function () {
  let matrix = [];
  const board = document.getElementById("board");

  const CreateBoard = () => {
    for (var i = 0; i < 10; i++) {
      matrix[i] = new Array(10).fill(0);
      const row = document.createElement("span");
      row.setAttribute("class", "row");
      board.appendChild(row);
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.setAttribute("id", `${i} ${j}`);
        row.appendChild(cell);
      }
    }
    return matrix;
  };

  CreateBoard();

  board.addEventListener('click', function(e) {
    const idCell = e.target.id;
    indexMatrix = idCell.split(' ');
    document.getElementById(idCell).innerHTML = "X";
    
    matrix[indexMatrix[0]] [indexMatrix[1]] = "X";
    console.log(matrix[0][0])
  })

  
})();
