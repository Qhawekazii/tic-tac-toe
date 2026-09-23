import Square from "./Square";

// "locked" means nobody can click right now (game over, or the CPU is thinking)
export default function Board({ squares, onSquareClick, winningLine, locked }) {
  return (
    <div className={locked ? "board board--locked" : "board"}>
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onSquareClick(i)}
          isWinning={!!winningLine && winningLine.includes(i)}
        />
      ))}
    </div>
  );
}
