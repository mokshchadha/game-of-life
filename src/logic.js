export function getNextStateOfTheMatrix(board) {
  const newBoard = getMatrixOfNXM(board.length, board[0].length);

  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[0].length; j++)
      newBoard[i][j] = getCellNextState(
        board[i][j],
        countOfAliveNeighbours(board, i, j)
      );
  return newBoard;
}

function getCellNextState(currentCell, countOfAliveNeighbours) {
  return currentCell > 0
    ? getNextStateOfAliveCell(countOfAliveNeighbours)
    : getNextStateOfDeadCell(countOfAliveNeighbours);
}

function countOfAliveNeighbours(board, i, j) {
  const first = board[i]?.[j - 1];
  const second = board[i - 1]?.[j - 1];
  const third = board[i - 1]?.[j];
  const fourth = board[i - 1]?.[j + 1];
  const fifth = board[i]?.[j + 1];
  const sixth = board[i + 1]?.[j + 1];
  const seventh = board[i + 1]?.[j];
  const eighth = board[i + 1]?.[j - 1];

  return [first, second, third, fourth, fifth, sixth, seventh, eighth].filter(
    (e) => e && e > 0
  ).length;
}

function getNextStateOfAliveCell(countOfAliveNeighbours) {
  return countOfAliveNeighbours === 2 || countOfAliveNeighbours === 3 ? 1 : 0;
}

function getNextStateOfDeadCell(countOfAliveNeighbours) {
  return countOfAliveNeighbours === 3 ? 1 : 0;
}

export function getMatrixOfNXM(row, column, isRandom = false) {
  const mainArray = new Array(row).fill("");
  const finalArray = mainArray.map(function (e) {
    const random = isRandom ? (Math.random() > 0.7 ? 1 : 0) : 0;
    const newArray = new Array(column).fill(random);
    return newArray;
  });
  return finalArray;
}
