import { calculateWinner } from "./gameReducer";

// The computer always plays "O" and the human always plays "X".

// list the indexes of every empty square, e.g. [0, 4, 7]
function getEmptySquares(squares) {
  const empty = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) empty.push(i);
  }
  return empty;
}

// EASY: just pick any empty square at random
function getEasyMove(squares) {
  const empty = getEmptySquares(squares);
  const randomIndex = Math.floor(Math.random() * empty.length);
  return empty[randomIndex];
}

// Minimax: imagine every possible rest-of-the-game and score how it ends.
//   CPU wins  → positive score (good for the CPU)
//   X wins    → negative score (bad for the CPU)
//   draw      → 0
// "depth" counts how many moves ahead we are, so a quick win scores higher
// than a slow one (and a slow loss is better than a quick one).
function minimax(squares, isCpuTurn, depth) {
  const { winner } = calculateWinner(squares);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (squares.every(Boolean)) return 0;

  const scores = [];
  for (const i of getEmptySquares(squares)) {
    const next = squares.slice();
    next[i] = isCpuTurn ? "O" : "X";
    scores.push(minimax(next, !isCpuTurn, depth + 1));
  }

  // the CPU picks the best score for itself, the human picks the worst for the CPU
  return isCpuTurn ? Math.max(...scores) : Math.min(...scores);
}

// HARD: try every empty square and keep the one with the best minimax score.
// This CPU can't be beaten — the best you can do is a draw.
function getHardMove(squares) {
  let bestMove = null;
  let bestScore = -Infinity;

  for (const i of getEmptySquares(squares)) {
    const next = squares.slice();
    next[i] = "O";
    const score = minimax(next, false, 1);
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return bestMove;
}

export function getCpuMove(squares, difficulty) {
  return difficulty === "hard" ? getHardMove(squares) : getEasyMove(squares);
}
