import { useStore } from "@nanostores/solid";
import { Match, Switch } from "solid-js";
import { $game } from "../../stores/game";
import IconO from "../icons/IconO";
import IconRestart from "../icons/IconRestart";
import IconX from "../icons/IconX";
import { $tl } from "./tl";

export default function GameBar() {
  const game = useStore($game);
  const tl = useStore($tl);

  return (
    <div class="flex w-full flex-row items-center justify-between">
      <div class="flex shrink-0 flex-row gap-2">
        <IconX className="fill-light-blue size-8" />
        <IconO className="fill-light-yellow size-8" />
      </div>

      <div class="heading-xs bg-semi-dark-navy flex h-10 w-24 shrink-0 flex-row items-center justify-center gap-2 rounded-xl text-sm shadow-[0px_-4px_0px_0px_#10212A_inset] md:h-[3.25rem] md:w-[8.75rem] md:text-base">
        <Switch>
          <Match when={game().turn === "o"}>
            <IconO className="fill-silver size-4 md:size-5" />
          </Match>
          <Match when={game().turn === "x"}>
            <IconX className="fill-silver size-4 md:size-5" />
          </Match>
        </Switch>

        <span class="text-sm md:text-base">{tl().turn}</span>
      </div>

      <button class="bg-silver hover:bg-silver-hover flex size-10 shrink-0 items-center justify-center rounded-xl md:size-[3.25rem]">
        <IconRestart className="size-5" />
      </button>
    </div>
  );
}
