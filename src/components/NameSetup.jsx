import { useState } from "react";

const MAX_NAME_LENGTH = 12;

// The "who's playing?" screen for 2-player mode.
// What you type is kept in local state until you press Start; then the
// names are handed to the parent with onStart({ X: "...", O: "..." }).
export default function NameSetup({ onStart }) {
  const [nameX, setNameX] = useState("");
  const [nameO, setNameO] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser reloading the page on submit

    // if someone leaves a box empty, give them a default name
    onStart({
      X: nameX.trim() || "Player 1",
      O: nameO.trim() || "Player 2",
    });
  }

  return (
    <form className="name-setup" onSubmit={handleSubmit}>
      <h2 className="name-setup__title">Who's playing?</h2>

      <label className="name-setup__field">
        <span className="name-setup__mark name-setup__mark--x">X</span>
        <input
          className="name-setup__input"
          type="text"
          placeholder="Player 1"
          maxLength={MAX_NAME_LENGTH}
          value={nameX}
          onChange={(event) => setNameX(event.target.value)}
          autoFocus
        />
      </label>

      <label className="name-setup__field">
        <span className="name-setup__mark name-setup__mark--o">O</span>
        <input
          className="name-setup__input"
          type="text"
          placeholder="Player 2"
          maxLength={MAX_NAME_LENGTH}
          value={nameO}
          onChange={(event) => setNameO(event.target.value)}
        />
      </label>

      <button type="submit" className="restart-button">
        Start game
      </button>
    </form>
  );
}
