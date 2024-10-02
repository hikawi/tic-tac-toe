import { persistentAtom } from "@nanostores/persistent";
import { type Mark } from "./turn";

const $firstTurn = persistentAtom<Mark>("first-turn", "x");

export { $firstTurn };
