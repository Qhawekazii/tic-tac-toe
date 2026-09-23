import { useReducer } from "react";
import Board from "./components/Board";
import StatusBar from "./components/StatusBar";
import Scoreboard from "./components/Scoreboard";
import MoveHistory from "./components/MoveHistory";
import NetworkBackground from "./components/NetworkBackground";
import { gameReducer, initialGameState, getGameStatus } from "./gameReducer";
import "./App.css";

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { history, currentMove, scores } = state;

  const currentSquares = history[currentMove];
  const { winner, winningLine, isDraw, isGameOver } = getGameStatus(currentSquares);
  const currentPlayer = currentMove % 2 === 0 ? "X" : "O";

  return (
    <div className="app">
      <NetworkBackground />

      <header className="app__header">
        <h1>Tic-Tac-Toe</h1>
        <p className="app__subtitle">Neon Arena · Player vs Player</p>
      </header>

      <Scoreboard scores={scores} onResetScores={() => dispatch({ type: "RESET_SCORES" })} />

      <StatusBar winner={winner} isDraw={isDraw} currentPlayer={currentPlayer} />

      <Board
        squares={currentSquares}
        winningLine={winningLine}
        gameOver={isGameOver}
        onSquareClick={(i) => dispatch({ type: "PLAY", squareIndex: i })}
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
