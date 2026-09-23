export default function MoveHistory({ history, currentMove, onJumpTo }) {
  return (
    <div className="history">
      <h2 className="history__title">Move history</h2>
      <ol className="history__list">
        {history.map((_, move) => {
          const label = move === 0 ? "Go to game start" : `Go to move #${move}`;
          const isCurrent = move === currentMove;
          return (
            <li key={move}>
              <button
                className={`history__button${isCurrent ? " history__button--current" : ""}`}
                onClick={() => onJumpTo(move)}
                disabled={isCurrent}
              >
                {isCurrent ? `You are at move #${move}` : label}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
