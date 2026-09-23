// Two small toggle groups: game mode, and (in CPU mode) difficulty.
export default function ModeSelect({ mode, difficulty, onModeChange, onDifficultyChange }) {
  return (
    <div className="mode-select">
      <div className="toggle">
        <button
          className={mode === "pvp" ? "toggle__button toggle__button--active" : "toggle__button"}
          onClick={() => onModeChange("pvp")}
        >
          2 Players
        </button>
        <button
          className={mode === "cpu" ? "toggle__button toggle__button--active" : "toggle__button"}
          onClick={() => onModeChange("cpu")}
        >
          vs CPU
        </button>
      </div>

      {mode === "cpu" && (
        <div className="toggle toggle--small">
          <button
            className={
              difficulty === "easy" ? "toggle__button toggle__button--active" : "toggle__button"
            }
            onClick={() => onDifficultyChange("easy")}
          >
            Easy
          </button>
          <button
            className={
              difficulty === "hard" ? "toggle__button toggle__button--active" : "toggle__button"
            }
            onClick={() => onDifficultyChange("hard")}
          >
            Hard
          </button>
        </div>
      )}
    </div>
  );
}
