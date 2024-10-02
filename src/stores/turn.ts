import { persistentAtom } from "@nanostores/persistent";

type Mark = "x" | "o";
const $turn = persistentAtom<Mark>("turn", "x");

function swap(mark: Mark): Mark {
  return mark === "x" ? "o" : "x";
}

function swapTurn() {
  $turn.set(swap($turn.get()));
}

export { $turn, swap, swapTurn, type Mark };
