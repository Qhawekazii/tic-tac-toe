// Full-screen "loading" splash: a ring of glowing dots that spins and pulses,
// plus a bar that fills up while the game "boots".
const DOT_COUNT = 8;

export default function LoadingScreen() {
  // make a list [0, 1, 2, ... 7] so we can draw one <span> per dot
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => i);

  return (
    <div className="loader" role="status" aria-label="Loading game">
      <div className="loader__spinner">
        {dots.map((i) => (
          // "--i" tells the CSS which dot this is, so it can place it
          // around the circle and start its pulse a little later
          <span key={i} className="loader__dot" style={{ "--i": i }} />
        ))}
      </div>

      <p className="loader__text">
        Loading arena
        <span className="loader__ellipsis">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>

      <div className="loader__bar">
        <div className="loader__bar-fill" />
      </div>
    </div>
  );
}
