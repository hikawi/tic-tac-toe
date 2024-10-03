import { persistentAtom } from "@nanostores/persistent";
import { computed } from "nanostores";
import { $selection } from "./selection";
import { $splash } from "./splash";
import { $turn, swap, type Mark } from "./turn";

const winPatterns = [
  [0, 1, 2], // Horizontal 1
  [3, 4, 5], // Horizontal 2
  [6, 7, 8], // Horizontal 3
  [0, 3, 6], // Vertical 1
  [1, 4, 7], // Vertical 2
  [2, 5, 8], // Vertical 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

type Cell = Mark | "";

const $game = persistentAtom<Cell[]>(
  "board",
  ["", "", "", "", "", "", "", "", ""],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
  },
);

function checkWinPattern(board: Cell[]): number[] {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== "")
      return pattern;
  }
  return [];
}

function checkWinner(board: Cell[]) {
  const winPattern = checkWinPattern(board);
  return winPattern.length > 0 ? board[winPattern[0]] : "";
}

function clearBoard() {
  $game.set(["", "", "", "", "", "", "", "", ""]);
}

function mark(index: number) {
  const state = [...$game.get()];
  state[index] = $turn.get();
  $game.set(state);
}

const $winPattern = computed($game, checkWinPattern);
const $winner = computed($game, checkWinner);
const $tie = computed(
  $game,
  (board) => board.every((cell) => cell !== "") && checkWinner(board) === "",
);

$winner.subscribe((val) => {
  if (val !== "") $splash.set("win");
});

$tie.subscribe((val) => {
  if (val) $splash.set("tie");
});

// ==============================
// CPU Logic Section
// ==============================

const $cpu = computed($selection, swap);

function isTerminal(board: Cell[]): boolean {
  return checkWinner(board) !== "" || board.every((cell) => cell !== "");
}

function value(board: Cell[]): number {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== "")
      return board[a] === $cpu.get() ? 1 : -1;
  }
  return 0;
}

function actions(board: Cell[]): number[] {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") moves.push(i);
  }
  return moves;
}

function result(board: Cell[], move: number, mark: Mark): Cell[] {
  const newBoard = [...board];
  newBoard[move] = mark;
  return newBoard;
}

function minimax(board: Cell[], current: Mark): [number, number] {
  if (isTerminal(board)) return [-1, value(board)];

  if (current === $cpu.get()) {
    // Maximize
    let [move, max] = [-1, -Infinity];
    for (const action of actions(board)) {
      const [_, ev] = minimax(result(board, action, current), swap(current));
      if (ev > max) [move, max] = [action, ev];
    }

    return [move, max];
  } else {
    // Minimize
    let [move, min] = [-1, Infinity];
    for (const action of actions(board)) {
      const [_, ev] = minimax(result(board, action, current), swap(current));
      if (ev < min) [move, min] = [action, ev];
    }

    return [move, min];
  }
}

function cpuMove() {
  const state = [...$game.get()];

  // If the board is empty, return a random move
  if (state.every((cell) => cell === "")) {
    return Math.floor(Math.random() * 9);
  }

  const [move] = minimax(state, swap($selection.get()));
  return move;
}

export { $game, $tie, $winner, $winPattern, clearBoard, cpuMove, mark };
