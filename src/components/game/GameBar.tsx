import { useStore } from "@nanostores/solid";
import { Match, Switch } from "solid-js";
import { $splash } from "../../stores/splash";
import { $turn } from "../../stores/turn";
import IconO from "../icons/IconO";
import IconRestart from "../icons/IconRestart";
import IconX from "../icons/IconX";
import { $tl } from "./tl";

function GameBarContents() {
  const turn = useStore($turn);
  const tl = useStore($tl);

  return (
    <>
      <div class="flex shrink-0 flex-row gap-2">
        <IconX className="fill-light-blue size-8" />
        <IconO className="fill-light-yellow size-8" />
      </div>

      <div class="heading-xs bg-semi-dark-navy flex h-10 w-24 shrink-0 -translate-x-3 flex-row items-center justify-center gap-2 rounded-xl text-sm shadow-[0px_-4px_0px_0px_#10212A_inset] md:h-[3.25rem] md:w-[8.75rem] md:text-base">
        <Switch>
          <Match when={turn() === "o"}>
            <IconO className="fill-silver size-4 md:size-5" />
          </Match>
          <Match when={turn() === "x"}>
            <IconX className="fill-silver size-4 md:size-5" />
          </Match>
        </Switch>

        <span class="text-sm md:text-base">{tl().turn}</span>
      </div>

      <button
        class="bg-silver hover:bg-silver-hover flex size-10 shrink-0 items-center justify-center rounded-xl md:size-[3.25rem]"
        onClick={() => $splash.set("restart")}
        aria-label="Restart"
      >
        <IconRestart className="size-5" />
      </button>
    </>
  );
}

export default function GameBar() {
  return (
    <>
      <div class="absolute inset-x-6 top-16 flex flex-row items-center justify-between md:static md:w-full">
        <GameBarContents />
      </div>
    </>
  );
}
