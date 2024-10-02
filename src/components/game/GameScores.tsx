import { useStore } from "@nanostores/solid";
import { Match, Switch } from "solid-js";
import { $multiplayer } from "../../stores/multiplayer";
import { $scores } from "../../stores/scores";
import { $selection } from "../../stores/selection";
import { $tl } from "./tl";

export default function GameScores() {
  const selection = useStore($selection);
  const multiplayer = useStore($multiplayer);
  const scores = useStore($scores);
  const tl = useStore($tl);

  return (
    <>
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
    </>
  );
}
