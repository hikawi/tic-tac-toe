import { persistentMap } from "@nanostores/persistent";
import { computed, type StoreValue } from "nanostores";

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

const $game = persistentMap<{
  turn: "x" | "o";
  board: ("x" | "o" | "")[];
}>(
  "state",
  {
    turn: "x",
    board: ["", "", "", "", "", "", "", "", ""],
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
  },
);

function checkWinner(game: StoreValue<typeof $game>): "x" | "o" | "" {
  const board = game.board;
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] === board[b] && board[b] === board[c]) return board[a];
  }

  return "";
}
const $winner = computed($game, checkWinner);

function checkTie(
  game: StoreValue<typeof $game>,
  winner: StoreValue<typeof $winner>,
) {
  return game.board.every((cell) => cell !== "") && winner === "";
}
const $tie = computed([$game, $winner], checkTie);

function clearBoard() {
  $game.set({
    turn: "x",
    board: ["", "", "", "", "", "", "", "", ""],
  });
}

function mark(index: number) {
  const board = [...$game.get().board];
  board[index] = $game.get().turn;
  $game.setKey("board", board);
}

function nextTurn() {
  $game.setKey("turn", $game.get().turn === "x" ? "o" : "x");
}

export { $game, $tie, $winner, clearBoard, mark, nextTurn };
