export default function StatusBar({ winner, isDraw, currentPlayer, isCpuThinking }) {
  if (winner) {
    return <p className="status status--winner">🎉 Winner: {winner}!</p>;
  }
  if (isDraw) {
    return <p className="status status--draw">🤝 Draw! Nobody blinked.</p>;
  }
  if (isCpuThinking) {
    return <p className="status status--thinking">Next Player: {currentPlayer} (CPU thinking…)</p>;
  }
  return <p className="status">Next Player: {currentPlayer}</p>;
}
