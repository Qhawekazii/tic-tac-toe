import Square from "./Square";

// "locked" means nobody can click right now (game over, or the CPU is thinking)
// "currentPlayer" is used to show a faint preview of X or O when you hover
// "hasWinner" makes the board do a little celebration shake
export default function Board({
  squares,
  onSquareClick,
  winningLine,
  locked,
  currentPlayer,
  hasWinner,
}) {
  let className = "board";
  if (locked) className += " board--locked";
  if (hasWinner) className += " board--won";
  className += currentPlayer === "X" ? " board--turn-x" : " board--turn-o";

  return (
    <div className={className}>
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
