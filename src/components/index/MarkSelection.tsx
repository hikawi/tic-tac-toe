import { createSignal, onCleanup, onMount, type Setter } from "solid-js";
import { isServer } from "solid-js/web";

function useKeyboardHandler(setSelected: Setter<"X" | "O">) {
  function keyboardHandler(event: KeyboardEvent) {
    if (event.key.toLowerCase() === "x" || event.key.toLowerCase() === "o")
      setSelected(event.key.toUpperCase() as "X" | "O");
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
  const [selected, setSelected] = createSignal<"X" | "O">("X");
  useKeyboardHandler(setSelected);
}
