import { useStore } from "@nanostores/solid";
import { onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { $selection } from "../../stores/selection";
import IconO from "../icons/IconO";
import IconX from "../icons/IconX";

function useKeyboardHandler() {
  function keyboardHandler(event: KeyboardEvent) {
    if (event.key.toLowerCase() === "x" || event.key.toLowerCase() === "o")
      $selection.set(event.key as "x" | "o");
  }

  onMount(() => {
    if (isServer) return;
    window.addEventListener("keydown", keyboardHandler);
  });

  onCleanup(() => {
    if (isServer) return;
    window.removeEventListener("keydown", keyboardHandler);
  });
}

export default function MarkSelection() {
  const selection = useStore($selection);
  useKeyboardHandler();

  return (
    <div class="bg-dark-navy relative flex h-[4.5rem] flex-row rounded-xl p-2">
      {/* Pseudo div to animate the sliding tab */}
      <div class="absolute inset-2">
        <div
          class="bg-silver hover:bg-silver-hover h-full w-1/2 rounded-xl duration-200 motion-reduce:duration-0"
          classList={{
            "translate-x-0": selection() === "x",
            "translate-x-full": selection() === "o",
          }}
        ></div>
      </div>

      <button
        class="z-10 flex w-full items-center justify-center"
        aria-label="X Mark"
        onClick={() => $selection.set("x")}
      >
        <IconX width={32} silver outline={selection() === "x"} />
      </button>

      <button
        class="z-10 flex w-full items-center justify-center"
        aria-label="O Mark"
        onClick={() => $selection.set("o")}
      >
        <IconO width={32} silver outline={selection() === "o"} />
      </button>
    </div>
  );
}
