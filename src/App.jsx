import { useEffect, useReducer, useState } from "react";
import Board from "./components/Board";
import StatusBar from "./components/StatusBar";
import Scoreboard from "./components/Scoreboard";
import MoveHistory from "./components/MoveHistory";
import ModeSelect from "./components/ModeSelect";
import NetworkBackground from "./components/NetworkBackground";
import LoadingScreen from "./components/LoadingScreen";
import NameSetup from "./components/NameSetup";
import { gameReducer, initialGameState, getGameStatus } from "./gameReducer";
import { getCpuMove } from "./cpu";
import "./App.css";

const CPU_DELAY_MS = 600; // small pause so the CPU feels like it's "thinking"
const LOADING_MS = 3000; // how long the loading screen shows (keep in sync with .loader__bar-fill in App.css)

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // show the loading screen when the app first opens.
  // this is just a UI thing (not game state), so a simple useState is enough
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_MS);
    return () => clearTimeout(timer);
  }, []);

  const { history, currentMove, scores, mode, difficulty, playerNames } = state;

  const currentSquares = history[currentMove];
  const { winner, winningLine, isDraw, isGameOver } = getGameStatus(currentSquares);
  const currentPlayer = currentMove % 2 === 0 ? "X" : "O";

  // the names shown on screen instead of plain "X" and "O"
  let names;
  if (mode === "cpu") {
    names = { X: "You", O: "CPU" };
  } else {
    names = playerNames || { X: "X", O: "O" };
  }

  // in 2-player mode, ask for names first (until they've been entered)
  const needsNames = mode === "pvp" && playerNames === null;

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

  // while loading, show only the background + the loading screen.
  // NetworkBackground is in the same spot in both returns, so React keeps
  // the same one running and the dots don't jump when loading finishes
  if (isLoading) {
    return (
      <>
        <NetworkBackground />
        <LoadingScreen />
      </>
    );
  }

  return (
    <>
      <NetworkBackground />

      <div className="app">
        <header className="app__header">
          <h1>Tic-Tac-Toe</h1>
          <p className="app__subtitle">
            {needsNames ? "Neon Arena" : `Neon Arena · ${names.X} vs ${names.O}`}
          </p>
        </header>

        <ModeSelect
          mode={mode}
          difficulty={difficulty}
          onModeChange={(newMode) => dispatch({ type: "SET_MODE", mode: newMode })}
          onDifficultyChange={(level) => dispatch({ type: "SET_DIFFICULTY", difficulty: level })}
        />

        {needsNames ? (
          <NameSetup onStart={(newNames) => dispatch({ type: "SET_PLAYER_NAMES", names: newNames })} />
        ) : (
          <>
            <Scoreboard
              scores={scores}
              names={names}
              onResetScores={() => dispatch({ type: "RESET_SCORES" })}
            />

            <StatusBar
              winner={winner}
              isDraw={isDraw}
              currentPlayer={currentPlayer}
              isCpuThinking={isCpuTurn}
              names={names}
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

            {mode === "pvp" && (
              <button className="link-button" onClick={() => dispatch({ type: "CHANGE_PLAYER_NAMES" })}>
                change player names
              </button>
            )}

            <MoveHistory
              history={history}
              currentMove={currentMove}
              onJumpTo={(move) => dispatch({ type: "JUMP_TO", move })}
            />
          </>
        )}
      </div>
    </>
  );
}
