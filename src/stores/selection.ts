import { persistentAtom } from "@nanostores/persistent";

const $selection = persistentAtom<"x" | "o">("selection", "x");

export { $selection };
