// "names" looks like { X: "Emily", O: "Sam" } — so names[winner] gives
// the name of whoever won, and names[currentPlayer] whose turn it is
export default function StatusBar({ winner, isDraw, currentPlayer, isCpuThinking, names }) {
  if (winner) {
    return (
      <p className="status status--winner">
        🎉 Winner: {names[winner]} ({winner})!
      </p>
    );
  }
  if (isDraw) {
    return <p className="status status--draw">🤝 Draw! Nobody blinked.</p>;
  }
  if (isCpuThinking) {
    return <p className="status status--thinking">Next Player: {names.O} (thinking…)</p>;
  }
  return (
    <p className="status">
      Next Player: {names[currentPlayer]} ({currentPlayer})
    </p>
  );
}
