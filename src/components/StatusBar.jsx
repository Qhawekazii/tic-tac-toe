export default function StatusBar({ winner, isDraw, currentPlayer }) {
  if (winner) {
    return <p className="status status--winner">🎉 Winner: {winner}!</p>;
  }
  if (isDraw) {
    return <p className="status status--draw">🤝 Draw! Nobody blinked.</p>;
  }
  return <p className="status">Next Player: {currentPlayer}</p>;
}
