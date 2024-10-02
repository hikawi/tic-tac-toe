import { useStore } from "@nanostores/solid";
import { Match, Portal, Show, Switch } from "solid-js/web";
import { clearBoard } from "../../stores/game";
import { resetScores, updateScores } from "../../stores/scores";
import { $splash } from "../../stores/splash";
import { $tl } from "./tl";

function QuitAndNext() {
  const tl = useStore($tl);
  return (
    <div class="heading-xs text-dark-navy flex flex-row items-center justify-center gap-4">
      <button
        class="bg-silver hover:bg-silver-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#CC8B13_inset]"
        onClick={() => {
          $splash.set(""); // Close splash
          resetScores();
          window.location.href = "/";
        }}
      >
        {tl().quit}
      </button>
      <button
        class="bg-light-yellow hover:bg-light-yellow-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#6B8997_inset]"
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
    <div class="heading-xs text-dark-navy flex flex-row items-center justify-center gap-4">
      <button
        class="bg-silver hover:bg-silver-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#CC8B13_inset]"
        onClick={() => {
          // Cancel restart, just close the splash
          $splash.set("");
        }}
      >
        {tl().noRestart}
      </button>
      <button
        class="bg-light-yellow hover:bg-light-yellow-hover h-[3.25rem] rounded-xl px-4 shadow-[0px_-4px_0px_0px_#6B8997_inset]"
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
  const splash = useStore($splash);
  const tl = useStore($tl);

  return (
    <Portal>
      <Show when={splash() !== ""}>
        <div class="fixed inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div class="bg-semi-dark-navy flex h-[14.25rem] w-full items-center justify-center gap-6 md:h-[16.625rem]">
            <Switch>
              <Match when={splash() === "tie"}>
                <span class="heading-m md:headling-l">{tl().tied}</span>
                <QuitAndNext />
              </Match>
              <Match when={splash() === "restart"}>
                <span class="heading-m md:headling-l">{tl().restart}</span>
                <Restart />
              </Match>
            </Switch>
          </div>
        </div>
      </Show>
    </Portal>
  );
}
