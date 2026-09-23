// All the ways to win: 3 rows, 3 columns, 2 diagonals.
const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(squares) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

// One place that answers "what's going on with this board?"
// Both the reducer and App.jsx use this, so the rules are only written once.
export function getGameStatus(squares) {
  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const isGameOver = winner !== null || isDraw;
  return { winner, winningLine: line, isDraw, isGameOver };
}

const emptyBoard = Array(9).fill(null);

export const initialGameState = {
  // history[0] is the empty board, history[n] is the board after move n
  history: [emptyBoard],
  currentMove: 0,
  scores: { X: 0, O: 0, draws: 0 },
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "PLAY": {
      const currentSquares = state.history[state.currentMove];
      const { isGameOver } = getGameStatus(currentSquares);

      // ignore clicks once the game is decided, or on a square that's taken
      if (isGameOver || currentSquares[action.squareIndex]) {
        return state;
      }

      const player = state.currentMove % 2 === 0 ? "X" : "O";
      const nextSquares = currentSquares.slice();
      nextSquares[action.squareIndex] = player;

      // if we'd time-traveled back before playing, this move starts a new
      // branch, so anything "in the future" gets dropped
      const nextHistory = [...state.history.slice(0, state.currentMove + 1), nextSquares];

      const { winner: newWinner } = calculateWinner(nextSquares);
      let scores = state.scores;
      if (newWinner) {
        scores = { ...scores, [newWinner]: scores[newWinner] + 1 };
      } else if (nextSquares.every(Boolean)) {
        scores = { ...scores, draws: scores.draws + 1 };
      }

      return {
        ...state,
        history: nextHistory,
        currentMove: nextHistory.length - 1,
        scores,
      };
    }

    case "JUMP_TO":
      return { ...state, currentMove: action.move };

    case "RESTART":
      // scores stick around across restarts, only the board resets
      return { ...state, history: [emptyBoard], currentMove: 0 };

    case "RESET_SCORES":
      return { ...state, scores: { X: 0, O: 0, draws: 0 } };

    default:
      return state;
  }
}
