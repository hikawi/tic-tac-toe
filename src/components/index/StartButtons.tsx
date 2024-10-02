import { useStore } from "@nanostores/solid";
import { clearBoard } from "../../stores/game";
import { $multiplayer } from "../../stores/multiplayer";
import { resetScores } from "../../stores/scores";
import { $tl } from "./tl";

export default function StartButtons() {
  const tl = useStore($tl);

  function handleClick(multi: boolean) {
    $multiplayer.set(multi);
    resetScores(); // Just to be sure.
    clearBoard();
    window.location.href = "/game";
  }

  return (
    <div class="heading-xs text-dark-navy flex w-full flex-col gap-4 md:gap-5">
      <button
        class="heading-s bg-light-yellow hover:bg-light-yellow-hover h-14 w-full rounded-2xl shadow-[0px_-8px_0px_0px_#CC8B13_inset] duration-200 md:h-[4.1875rem]"
        onClick={() => handleClick(false)}
      >
        {tl().cpu}
      </button>

      <button
        class="heading-s bg-light-blue hover:bg-light-blue-hover h-14 w-full rounded-2xl shadow-[0px_-8px_0px_0px_#118C87_inset] duration-200 md:h-[4.1875rem]"
        onClick={() => handleClick(true)}
      >
        {tl().player}
      </button>
    </div>
  );
}
