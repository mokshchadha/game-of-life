export function gameOfLife(board) {
  let newBoard = createNxNMatrix(board.length);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      newBoard[i][j] = cellDOAInNextGeneration({ board, xIndex: i, yIndex: j });
    }
  }
  return newBoard;
}

function cellDOAInNextGeneration({ board, xIndex, yIndex }) {
  const aliveNeighBours = countOfAliveNeighbours(board, xIndex, yIndex);
  return board[xIndex][yIndex] > 0
    ? aliveCellDOAInNextGeneration(aliveNeighBours)
    : deadCellDOAInNextGeneration(aliveNeighBours);
}

function countOfAliveNeighbours(mat, x, y) {
  const first = mat[x]?.[y - 1];
  const second = mat[x - 1]?.[y - 1];
  const third = mat[x - 1]?.[y];
  const fourth = mat[x - 1]?.[y + 1];
  const fifth = mat[x]?.[y + 1];
  const sixth = mat[x + 1]?.[y + 1];
  const seventh = mat[x + 1]?.[y];
  const eighth = mat[x + 1]?.[y - 1];

  return [first, second, third, fourth, fifth, sixth, seventh, eighth].filter(
    (e) => e && e > 0
  ).length;
}

function aliveCellDOAInNextGeneration(aliveNeighBours) {
  if (aliveNeighBours < 2 || aliveNeighBours > 3) return 0;
  else if (aliveNeighBours === 2 || aliveNeighBours === 3) return 1;
}

function deadCellDOAInNextGeneration(aliveNeighBours) {
  return aliveNeighBours === 3 ? 1 : 0;
}

export function createNxNMatrix(n, isRandom = true) {
  const mainArray = new Array(n).fill("");
  const finalArray = mainArray.map(function (e) {
    const random = isRandom ? (Math.random() > 0.7 ? 1 : 0) : 0;
    const newArray = new Array(n).fill(random);
    return newArray;
  });
  return finalArray;
}
