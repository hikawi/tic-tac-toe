import { persistentMap } from "@nanostores/persistent";
import { $winner } from "./game";

const $scores = persistentMap<{
  x: number;
  o: number;
  ties: number;
}>(
  "scores:",
  {
    x: 0,
    o: 0,
    ties: 0,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: false,
  },
);

function updateScores() {
  const winner = $winner.get();
  switch (winner) {
    case "x":
      $scores.setKey("x", $scores.get().x + 1);
      break;
    case "o":
      $scores.setKey("o", $scores.get().o + 1);
      break;
    case "":
      $scores.setKey("ties", $scores.get().ties + 1);
      break;
  }
}

function resetScores() {
  $scores.set({
    x: 0,
    o: 0,
    ties: 0,
  });
}

export { $scores, resetScores, updateScores };
