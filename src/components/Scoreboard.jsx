export default function Scoreboard({ scores, names, onResetScores }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__item">
        <span className="scoreboard__label">{names.X}</span>
        <span className="scoreboard__value">{scores.X}</span>
      </div>
      <div className="scoreboard__item">
        <span className="scoreboard__label">Draws</span>
        <span className="scoreboard__value">{scores.draws}</span>
      </div>
      <div className="scoreboard__item">
        <span className="scoreboard__label">{names.O}</span>
        <span className="scoreboard__value">{scores.O}</span>
      </div>
      <button className="link-button" onClick={onResetScores}>
        reset scores
      </button>
    </div>
  );
}
