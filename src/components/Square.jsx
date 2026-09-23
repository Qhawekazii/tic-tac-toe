export default function Square({ value, onClick, isWinning }) {
  // build the class list step by step so it's easy to read
  let className = "square";
  if (value === "X") className += " square--filled square--x";
  if (value === "O") className += " square--filled square--o";
  if (isWinning) className += " square--winning";

  return (
    <button className={className} onClick={onClick} disabled={!!value}>
      {value}
    </button>
  );
}
