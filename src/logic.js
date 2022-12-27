export function getNextStateOfTheMatrix(board) {
  const newBoard = getMatrixOfNXM({
    numberOfRows: board.length,
    numberOfColumns: board[0].length,
    shouldPrefillWithRandom: false,
  });

  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[0].length; j++)
      newBoard[i][j] = getNextStateOfCurrentCell(
        board[i][j],
        countOfAliveNeighbours(board, i, j)
      );
  return newBoard;
}

function getNextStateOfCurrentCell(currentCell, countOfAliveNeighbours) {
  return isAlive(currentCell)
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
    isAlive
  ).length;
}

function getNextStateOfAliveCell(countOfAliveNeighbours) {
  return countOfAliveNeighbours === 2 || countOfAliveNeighbours === 3 ? 1 : 0;
}

function getNextStateOfDeadCell(countOfAliveNeighbours) {
  return countOfAliveNeighbours === 3 ? 1 : 0;
}

export function isAlive(currentValueOfCell) {
  return currentValueOfCell === 1;
}

export function getMatrixOfNXM({
  numberOfRows,
  numberOfColumns,
  shouldPrefillWithRandom = false,
}) {
  const rows = getArrayOfSizeN({ N: numberOfRows });
  const rowsFilledWithColumns = rows.map((_) =>
    getArrayOfSizeN({ N: numberOfColumns, shouldPrefillWithRandom })
  );
  return rowsFilledWithColumns;
}

function getArrayOfSizeN({ N, shouldPrefillWithRandom = false }) {
  return new Array(N)
    .fill("")
    .map((_) =>
      shouldPrefillWithRandom ? (Math.random() > 0.666 ? 1 : 0) : 0
    );
}
