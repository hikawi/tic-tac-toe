import { useStore } from "@nanostores/solid";
import { Index, Match, onCleanup, onMount, Switch } from "solid-js";
import { isServer } from "solid-js/web";
import { $game, $tie, $winner, mark, nextTurn } from "../../stores/game";
import { $multiplayer } from "../../stores/multiplayer";
import { $scores } from "../../stores/scores";
import { $selection } from "../../stores/selection";
import { $splash } from "../../stores/splash";
import IconO from "../icons/IconO";
import IconX from "../icons/IconX";
import { $tl } from "./tl";

export default function GameBoard() {
  const game = useStore($game);
  const winner = useStore($winner);
  const tie = useStore($tie);
  const scores = useStore($scores);

  const selection = useStore($selection);
  const multiplayer = useStore($multiplayer);

  const tl = useStore($tl);

  function handleClick(index: number) {
    mark(index);

    // If there is a tie, announce so.
    if (tie()) {
      $splash.set("tie");
      return;
    }

    // If there is a winner, announce so.
    if (winner() !== "") {
      $splash.set("win");
      return;
    }

    // Game hasn't ended, switch turns.
    nextTurn();
  }

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
        handleClick(parseInt(event.key) - 1);
        break;
    }
  }

  onMount(() => {
    if (isServer) return;
    window.addEventListener("keydown", handleKeyboard);
  });

  onCleanup(() => {
    if (isServer) return;
    window.removeEventListener("keydown", handleKeyboard);
  });

  return (
    <div class="grid grid-flow-row auto-rows-auto grid-cols-3 place-content-center gap-5">
      <Index each={game().board}>
        {(cell, index) => (
          <button
            class="bg-semi-dark-navy text-silver group flex size-24 items-center justify-center rounded-2xl shadow-[0px_-4px_0px_0px_#10212A_inset] md:size-[8.75rem]"
            onClick={() => handleClick(index)}
            aria-label={
              cell() === ""
                ? `Mark slot ${index} to ${game().turn}`
                : `Slot ${index} is already marked as ${cell()}`
            }
            disabled={cell() !== ""}
          >
            <Switch>
              <Match when={cell() === "o"}>
                <IconO className="fill-light-yellow size-12 md:size-[4.375rem]" />
              </Match>
              <Match when={cell() === "x"}>
                <IconX className="fill-light-blue size-12 md:size-[4.375rem]" />
              </Match>
              <Match when={game().turn === "x"}>
                <IconX className="stroke-light-blue fill-semi-dark-navy invisible size-12 stroke-2 group-hover:visible md:size-[4.375rem]" />
              </Match>
              <Match when={game().turn === "o"}>
                <IconO className="stroke-light-yellow fill-semi-dark-navy invisible size-12 stroke-2 group-hover:visible md:size-[4.375rem]" />
              </Match>
            </Switch>
          </button>
        )}
      </Index>

      {/* Displaying scores for the X mark. */}
      <div class="bg-light-blue body text-dark-navy flex h-16 flex-col items-center justify-center rounded-xl text-center leading-none md:h-[4.5rem]">
        <Switch>
          <Match when={selection() === "x" && multiplayer()}>
            <span>X (P1)</span>
          </Match>
          <Match when={selection() === "o" && multiplayer()}>
            <span>X (P2)</span>
          </Match>
          <Match when={selection() === "x" && !multiplayer()}>
            <span>X ({tl().you})</span>
          </Match>
          <Match when={selection() === "o" && !multiplayer()}>
            <span>X ({tl().cpu})</span>
          </Match>
        </Switch>

        <span class="heading-s md:heading-m">{scores().x}</span>
      </div>

      {/* Displaying tied. */}
      <div class="bg-silver body text-dark-navy flex h-16 flex-col items-center justify-center rounded-xl text-center leading-none md:h-[4.5rem]">
        <span>{tl().ties}</span>
        <span class="heading-s md:heading-m">{scores().ties}</span>
      </div>

      {/* Displaying scores for the O mark. */}
      <div class="bg-light-yellow body text-dark-navy flex h-16 flex-col items-center justify-center rounded-xl text-center leading-none md:h-[4.5rem]">
        <Switch>
          <Match when={selection() === "o" && multiplayer()}>
            <span>O (P1)</span>
          </Match>
          <Match when={selection() === "x" && multiplayer()}>
            <span>O (P2)</span>
          </Match>
          <Match when={selection() === "o" && !multiplayer()}>
            <span>O ({tl().you})</span>
          </Match>
          <Match when={selection() === "x" && !multiplayer()}>
            <span>O ({tl().cpu})</span>
          </Match>
        </Switch>

        <span class="heading-s md:heading-m">{scores().o}</span>
      </div>
    </div>
  );
}
