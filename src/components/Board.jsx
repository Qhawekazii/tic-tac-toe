import Square from "./Square";

export default function Board({ squares, onSquareClick, winningLine, gameOver }) {
  return (
    <div className={`board${gameOver ? " board--over" : ""}`}>
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
