import { useEffect, useReducer } from "react";
import Board from "./components/Board";
import StatusBar from "./components/StatusBar";
import Scoreboard from "./components/Scoreboard";
import MoveHistory from "./components/MoveHistory";
import ModeSelect from "./components/ModeSelect";
import NetworkBackground from "./components/NetworkBackground";
import { gameReducer, initialGameState, getGameStatus } from "./gameReducer";
import { getCpuMove } from "./cpu";
import "./App.css";

const CPU_DELAY_MS = 600; // small pause so the CPU feels like it's "thinking"

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { history, currentMove, scores, mode, difficulty } = state;

  const currentSquares = history[currentMove];
  const { winner, winningLine, isDraw, isGameOver } = getGameStatus(currentSquares);
  const currentPlayer = currentMove % 2 === 0 ? "X" : "O";

  // in CPU mode the computer is always O
  const isCpuTurn = mode === "cpu" && currentPlayer === "O" && !isGameOver;

  // whenever it becomes the CPU's turn, wait a moment and then make its move
  useEffect(() => {
    if (!isCpuTurn) return;

    const timer = setTimeout(() => {
      const squareIndex = getCpuMove(currentSquares, difficulty);
      dispatch({ type: "PLAY", squareIndex });
    }, CPU_DELAY_MS);

    // if things change before the timer fires (e.g. Restart), cancel the move
    return () => clearTimeout(timer);
  }, [isCpuTurn, currentSquares, difficulty]);

  function handleSquareClick(i) {
    // the human can't click for the CPU
    if (isCpuTurn) return;
    dispatch({ type: "PLAY", squareIndex: i });
  }

  return (
    <div className="app">
      <NetworkBackground />

      <header className="app__header">
        <h1>Tic-Tac-Toe</h1>
        <p className="app__subtitle">
          {mode === "cpu" ? "Neon Arena · Player vs CPU" : "Neon Arena · Player vs Player"}
        </p>
      </header>

      <ModeSelect
        mode={mode}
        difficulty={difficulty}
        onModeChange={(newMode) => dispatch({ type: "SET_MODE", mode: newMode })}
        onDifficultyChange={(level) => dispatch({ type: "SET_DIFFICULTY", difficulty: level })}
      />

      <Scoreboard scores={scores} onResetScores={() => dispatch({ type: "RESET_SCORES" })} />

      <StatusBar
        winner={winner}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
        isCpuThinking={isCpuTurn}
      />

      <Board
        squares={currentSquares}
        winningLine={winningLine}
        locked={isGameOver || isCpuTurn}
        currentPlayer={currentPlayer}
        hasWinner={!!winner}
        onSquareClick={handleSquareClick}
      />

      <button className="restart-button" onClick={() => dispatch({ type: "RESTART" })}>
        Restart
      </button>

      <MoveHistory
        history={history}
        currentMove={currentMove}
        onJumpTo={(move) => dispatch({ type: "JUMP_TO", move })}
      />
    </div>
  );
}
