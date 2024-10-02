import { useStore } from "@nanostores/solid";
import {
  createEffect,
  Index,
  Match,
  onCleanup,
  onMount,
  Switch,
} from "solid-js";
import { $firstTurn } from "../../stores/firstTurn";
import { $game, $tie, $winner, cpuMove, mark } from "../../stores/game";
import { $gameStarted } from "../../stores/gameStarted";
import { $multiplayer } from "../../stores/multiplayer";
import { $selection } from "../../stores/selection";
import { $splash } from "../../stores/splash";
import { $turn, swapTurn } from "../../stores/turn";
import IconO from "../icons/IconO";
import IconX from "../icons/IconX";
import GameScores from "./GameScores";

export default function GameBoard() {
  const turn = useStore($turn);
  const game = useStore($game);
  const winner = useStore($winner);
  const tie = useStore($tie);
  const selection = useStore($selection);
  const multiplayer = useStore($multiplayer);
  const gameStarted = useStore($gameStarted);

  function splashNext() {
    if (winner() !== "" || tie() || (!multiplayer() && turn() !== selection()))
      return;
    $splash.set("next");
  }

  // Hopefully, this gets called when the CPU should be playing.
  function cpuPlay() {
    // Check if game ended before making a move
    if (winner() !== "" || tie()) return;

    // Check if it's 2 players or it's NOT the cpu's turn.
    if (multiplayer() || turn() === selection()) return;

    // Make the CPU move
    const move = cpuMove();
    if (move < 0) return; // No moves left

    // Mark the cell
    mark(move);
    swapTurn();

    // Splash screen.
    splashNext();
  }

  // What happens when the user clicks the cell
  function handleClick(index: number) {
    // Check if game ended before making a move
    if (winner() !== "" || tie()) return;

    // Mark the cell
    mark(index);
    swapTurn();

    // Splash screen.
    splashNext();
    cpuPlay();
  }

  // Keyboard controls
  function handleKeyboard(event: KeyboardEvent) {
    switch (event.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        const button = document.getElementById(`button-${event.key}`);
        button?.focus();
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        const active = document.activeElement;
        if (!active?.id?.startsWith("button-")) break;
        const index = Number(active.id.split("-")[1]);
        let next = index;
        switch (event.key) {
          case "ArrowUp":
            next -= 3;
            if (next < 1) next += 9;
            break;
          case "ArrowDown":
            next += 3;
            if (next > 9) next -= 9;
            break;
          case "ArrowLeft":
            next -= 1;
            if (next < 1) next += 9;
            break;
          case "ArrowRight":
            next += 1;
            if (next > 9) next -= 9;
            break;
        }
        const buttonNext = document.getElementById(`button-${next}`);
        buttonNext?.focus();
        console.log(document.activeElement);
        break;
      case "R":
      case "r":
        $splash.set("restart");
        break;
    }
  }

  // Can't set from the start buttons since this isn't mounted yet.
  // So we force the cpu to play if possible.
  onMount(() => {
    $firstTurn.set("x");
    $turn.set($firstTurn.get());
    $gameStarted.set(true);
    window.addEventListener("keydown", handleKeyboard);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyboard);
  });

  // Hook to game started
  createEffect(() => {
    if (gameStarted()) {
      cpuPlay(); // First move by CPU?
      $gameStarted.set(false);
      splashNext();
    }
  });

  return (
    <div class="grid grid-flow-row auto-rows-auto grid-cols-3 place-content-center gap-5">
      <Index each={game()}>
        {(cell, index) => (
          <button
            id={`button-${index + 1}`}
            class="bg-semi-dark-navy text-silver group flex size-24 items-center justify-center rounded-2xl shadow-[0px_-4px_0px_0px_#10212A_inset] md:size-[8.75rem]"
            onClick={() => handleClick(index)}
            disabled={cell() !== ""}
            aria-label={`Mark cell ${index + 1} as ${turn()}`}
          >
            <Switch>
              <Match when={cell() === "o"}>
                <IconO className="fill-light-yellow size-12 md:size-[4.375rem]" />
              </Match>
              <Match when={cell() === "x"}>
                <IconX className="fill-light-blue size-12 md:size-[4.375rem]" />
              </Match>
              <Match when={turn() === "x"}>
                <IconX className="stroke-light-blue fill-semi-dark-navy invisible size-12 stroke-2 group-hover:visible group-focus:visible md:size-[4.375rem]" />
              </Match>
              <Match when={turn() === "o"}>
                <IconO className="stroke-light-yellow fill-semi-dark-navy invisible size-12 stroke-2 group-hover:visible group-focus:visible md:size-[4.375rem]" />
              </Match>
            </Switch>
          </button>
        )}
      </Index>

      <GameScores />
    </div>
  );
}
