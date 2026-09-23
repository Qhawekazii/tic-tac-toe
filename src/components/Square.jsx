export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square${value ? " square--filled" : ""}${isWinning ? " square--winning" : ""}`}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}
