import { persistentAtom } from "@nanostores/persistent";

const $multiplayer = persistentAtom("multiplayer", false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export { $multiplayer };
