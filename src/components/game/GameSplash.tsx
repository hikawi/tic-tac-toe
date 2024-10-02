import { useStore } from "@nanostores/solid";
import { createEffect } from "solid-js";
import { Match, Portal, Show, Switch } from "solid-js/web";
import { $winner, clearBoard } from "../../stores/game";
import { $multiplayer } from "../../stores/multiplayer";
import { resetScores, updateScores } from "../../stores/scores";
import { $selection } from "../../stores/selection";
import { $splash } from "../../stores/splash";
import { $turn } from "../../stores/turn";
import IconO from "../icons/IconO";
import IconX from "../icons/IconX";
import { $tl } from "./tl";

function QuitAndNext() {
  const tl = useStore($tl);
  return (
    <div class="heading-xs text-dark-navy flex flex-row items-center justify-center gap-4">
      <button
        class="bg-silver hover:bg-silver-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#6B8997_inset]"
        onClick={() => {
          $splash.set(""); // Close splash
          resetScores();
          window.location.href = "/";
        }}
      >
        {tl().quit}
      </button>
      <button
        class="bg-light-yellow hover:bg-light-yellow-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#CC8B13_inset]"
        onClick={() => {
          $splash.set("");
          updateScores();
          clearBoard();
        }}
      >
        {tl().nextGame}
      </button>
    </div>
  );
}

function Restart() {
  const tl = useStore($tl);
  return (
    <div class="heading-xs text-dark-navy z-50 flex flex-row items-center justify-center gap-4">
      <button
        class="bg-silver hover:bg-silver-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#6B8997_inset]"
        onClick={() => {
          // Cancel restart, just close the splash
          $splash.set("");
        }}
      >
        {tl().noRestart}
      </button>
      <button
        class="bg-light-yellow hover:bg-light-yellow-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#CC8B13_inset]"
        onClick={() => {
          // Restart the game, don't update scores
          $splash.set("");
          clearBoard();
        }}
      >
        {tl().yesRestart}
      </button>
    </div>
  );
}

export default function GameSplash() {
  const turn = useStore($turn);
  const splash = useStore($splash);
  const multiplayer = useStore($multiplayer);
  const winner = useStore($winner);
  const selection = useStore($selection);
  const tl = useStore($tl);

  createEffect(() => {
    if (splash() === "next") {
      setTimeout(() => {
        $splash.set("");
      }, 700);
    }
  });

  return (
    <Portal>
      <Show when={splash() !== ""}>
        <div class="fixed inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div class="bg-semi-dark-navy flex h-[14.25rem] w-full flex-col items-center justify-center gap-6 md:h-[16.625rem]">
            <Switch fallback={splash()}>
              <Match when={splash() === "tie"}>
                <span class="heading-m md:headling-l">{tl().tied}</span>
                <QuitAndNext />
              </Match>

              <Match when={splash() === "restart"}>
                <span class="heading-m md:headling-l">{tl().restart}</span>
                <Restart />
              </Match>

              <Match when={splash() === "next"}>
                <div class="flex flex-row items-center gap-4">
                  <Switch>
                    <Match when={turn() === "x"}>
                      <IconX className="fill-light-blue size-7 md:size-16" />
                      <span class="heading-m md:heading-l text-light-blue">
                        {tl().yourTurn}
                      </span>
                    </Match>

                    <Match when={turn() === "o"}>
                      <IconO className="fill-light-yellow size-7 md:size-16" />
                      <span class="heading-m md:heading-l text-light-yellow">
                        {tl().yourTurn}
                      </span>
                    </Match>
                  </Switch>
                </div>
              </Match>

              <Match when={splash() === "win"}>
                <span class="heading-xs text-sm md:text-base">
                  <Switch>
                    <Match when={!multiplayer() && winner() === selection()}>
                      {tl().won}
                    </Match>

                    <Match when={!multiplayer() && winner() !== selection()}>
                      {tl().lost}
                    </Match>

                    <Match when={multiplayer() && winner() === selection()}>
                      {tl().p1Wins}
                    </Match>

                    <Match when={multiplayer() && winner() !== selection()}>
                      {tl().p2Wins}
                    </Match>
                  </Switch>
                </span>

                <div class="flex flex-row items-center justify-center gap-2 md:gap-6">
                  <Switch>
                    <Match when={winner() === "x"}>
                      <IconX className="fill-light-blue size-7 md:size-16" />
                      <span class="heading-m md:heading-l text-light-blue">
                        {tl().takesTheRound}
                      </span>
                    </Match>
                    <Match when={winner() === "o"}>
                      <IconO className="fill-light-yellow size-7 md:size-16" />
                      <span class="heading-m md:heading-l text-light-yellow">
                        {tl().takesTheRound}
                      </span>
                    </Match>
                  </Switch>
                </div>

                <QuitAndNext />
              </Match>
            </Switch>
          </div>
        </div>
      </Show>
    </Portal>
  );
}
