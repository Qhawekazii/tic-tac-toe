# Tic-Tac-Toe · Neon Arena 🎮

A neon-styled Tic-Tac-Toe game built with **React + `useReducer`**. Play a
friend on the same device or take on the computer. Your game keeps a move
history you can jump back through, a scoreboard, and player names.

Built as my "first day as a JR Frontend Intern at React HQ" assignment.

- **Live app:** https://tic-tac-toe-five-ebon-96.vercel.app/
- **Loom walkthrough:** _coming soon_
- **Repo:** https://github.com/Qhawekazii/tic-tac-toe

---

## Features

### Core game
- 3×3 board. X always goes first, then players take turns.
- You can't play on a square that's already taken.
- Detects a **win** (any row, column or diagonal) and a **draw** (board
  full, no winner). The winning line lights up and bounces.
- The status line always says what's going on: `Next Player: …`,
  `Winner: …`, or `Draw!`.

### Game modes: 2 Players or vs CPU
- **2 Players:** two people take turns on one device.
- **vs CPU:** you play X and the computer plays O. Choose a difficulty:
  - **Easy:** the CPU picks a random empty square.
  - **Hard:** the CPU uses the **minimax** algorithm. It plays out every
    possible rest of the game and picks the best move, so it can't be
    beaten. The best you can get is a draw.

### Player names
In 2-player mode the game first asks **"Who's playing?"**. After that it
uses your names instead of X and O in the status line, the winner message,
the scoreboard and the subtitle. Leave a box empty and you get "Player 1" or
"Player 2". Use **change player names** to go back to that screen. In vs CPU
mode the players are "You" and "CPU".

### Scoreboard
Counts wins for each player and draws. **Restart** clears only the board and
keeps the scores. **reset scores** sets them back to zero.

### Move history + time travel (advanced feature)
Every move is saved. Click any entry in **Move history** to jump back and see
the board as it was then. If you play a new move from that point, the game
continues from there and the old "future" moves are dropped.

### Look & feel
- Neon pink and sky-blue theme on a dark background, with an animated
  "network" of connected dots behind the game.
- A 3-second loading screen with a spinning ring of dots.
- X and O spin in when placed and then float gently. Hovering an empty
  square shows a faint preview of whose turn it is, and the board shakes
  when someone wins.
- Works on phones and desktops.
- If your device is set to reduce motion, the animations switch off.

---

## How the state works

All game state lives in **one reducer**, in
[`src/gameReducer.js`](src/gameReducer.js):

| State         | What it holds                                                   |
| ------------- | --------------------------------------------------------------- |
| `history`     | Every board so far. `history[0]` is empty, `history[n]` is after move n |
| `currentMove` | Which board in `history` is on screen                           |
| `scores`      | `{ X, O, draws }`                                               |
| `mode`        | `"pvp"` (2 players) or `"cpu"` (vs computer)                    |
| `difficulty`  | `"easy"` or `"hard"` (CPU mode only)                            |
| `playerNames` | `{ X, O }` in 2-player mode, or `null` until entered            |

| Action                | What it does                                               |
| --------------------- | ---------------------------------------------------------- |
| `PLAY`                | Puts X or O on a square, if that move is allowed           |
| `JUMP_TO`             | Time travel: shows an earlier board from `history`         |
| `RESTART`             | Clears the board and keeps the scores                      |
| `RESET_SCORES`        | Sets the scores back to 0                                  |
| `SET_MODE`            | Switches between 2 Players and vs CPU (fresh board)        |
| `SET_DIFFICULTY`      | Switches the CPU between Easy and Hard (fresh board)       |
| `SET_PLAYER_NAMES`    | Saves the names and starts a fresh game                    |
| `CHANGE_PLAYER_NAMES` | Goes back to the "Who's playing?" screen                   |

**Keeping it clean:**
- **Rules in one place.** `getGameStatus(squares)` is the only code that
  decides "winner / draw / game over", and both the reducer and the UI use it.
- **Dumb components.** Everything in `src/components/` just receives props
  and renders them. Only `App.jsx` dispatches actions.
- **The CPU follows the same rules as you.** When it's the CPU's turn, one
  `useEffect` in `App.jsx` waits a moment, asks [`src/cpu.js`](src/cpu.js)
  for a square, and dispatches a normal `PLAY` action.
- **`useState` only for UI.** It's used for two things that aren't game
  state: whether the loading screen is showing, and the text you're typing
  into the name boxes before pressing Start.

---

## Project structure

```
src/
├── App.jsx                  # holds the reducer, works out what to show, dispatches actions
├── gameReducer.js           # all game state + actions + win/draw rules
├── cpu.js                   # CPU moves: random (Easy) and minimax (Hard)
├── App.css / index.css      # styles, colours and animations
└── components/
    ├── Board.jsx            # the 3×3 grid
    ├── Square.jsx           # one square (X, O or empty)
    ├── StatusBar.jsx        # "Next Player" / "Winner" / "Draw"
    ├── Scoreboard.jsx       # wins + draws
    ├── MoveHistory.jsx      # time-travel list
    ├── ModeSelect.jsx       # 2 Players / vs CPU, Easy / Hard
    ├── NameSetup.jsx        # "Who's playing?" form
    ├── LoadingScreen.jsx    # the spinning dots on startup
    └── NetworkBackground.jsx# animated dots + lines behind everything
```

---

## Run it locally

You need [Node.js](https://nodejs.org/) installed.

```bash
git clone https://github.com/Qhawekazii/tic-tac-toe.git
cd tic-tac-toe
npm install
npm run dev
```

Then open the link it prints (usually `http://localhost:5173`).

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the dev server with live reload |
| `npm run build`   | Makes a production build in `dist/`   |
| `npm run preview` | Serves that production build locally  |
| `npm run lint`    | Checks the code with oxlint           |

---

## Deploying

It's a standard Vite app, so no extra config is needed:

- **Vercel:** import the GitHub repo. It detects Vite automatically.
- **Netlify:** build command `npm run build`, publish directory `dist`.

---

## Tech

React 19 · Vite · plain CSS, with no UI library, no TypeScript and no
external state library. `useReducer` handles all the state.

---

Built by Emily Maramani 👋
