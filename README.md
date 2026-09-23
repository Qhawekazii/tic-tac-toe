# Tic-Tac-Toe (React HQ Internship Edition) 🎮

My "first day" project as a JR Frontend Intern: a classic Tic-Tac-Toe game, but
built the way an actual engineer would — one reducer, no spaghetti `useState`
calls scattered around, and components that just render props.

## Play it

- **Live app:** _add your Netlify/Vercel link here after deploying_
- **Loom walkthrough:** _add your Loom link here_

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## What's in here

**Core game**
- 3x3 board, X and O alternate turns
- Can't overwrite a filled square
- Detects wins (row/column/diagonal) and draws, with the winning line
  highlighted on the board
- Status text updates live: `Next Player: X`, `Winner: O`, `Draw!`

**Manual feature — Scoreboard**
Tracks X wins / O wins / draws across games. Scores persist through
"Restart" (only the board resets) and there's a small "reset scores" link
if you want a clean slate.

**Advanced feature — Move History + Time Travel**
Every move is kept in history. Click any entry in the "Move history" list
to jump back to that point in the game and see the board as it was. Play a
new move from an earlier point and it branches off from there (the old
"future" gets replaced) — same behavior the official React tutorial teaches,
just wired up through a reducer instead of a raw `useState` array.

## State management

Everything lives in one `useReducer` in [`src/gameReducer.js`](src/gameReducer.js):

- `history` — array of board snapshots
- `currentMove` — which snapshot we're currently viewing
- `scores` — running tally of X / O / draws

Actions: `PLAY`, `JUMP_TO`, `RESTART`, `RESET_SCORES`. All the game rules
(whose turn it is, whether a move is legal, whether someone just won) live in
the reducer and a shared `calculateWinner` helper — nothing is duplicated
between components. Components (`Board`, `Square`, `StatusBar`, `Scoreboard`,
`MoveHistory`) just take props and render; `App.jsx` is the only thing that
dispatches.

## Stack

React + Vite, plain CSS (no UI library, no Tailwind — kept it simple on
purpose). No TypeScript, no external state library — `useReducer` does the
whole job here.

## Deploying

This is a stock Vite app, so it deploys to Netlify or Vercel with zero config:

- **Netlify:** build command `npm run build`, publish directory `dist`
- **Vercel:** framework preset "Vite", it auto-detects the rest

---
Built by Emily Maramani 👋
