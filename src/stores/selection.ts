import { atom } from "nanostores";

const $selection = atom<"x" | "o">("x");

export { $selection };
