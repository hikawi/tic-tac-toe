import { useStore } from "@nanostores/solid";
import { createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { $selection } from "../../stores/selection";
import IconO from "../icons/IconO";
import IconX from "../icons/IconX";

export default function MarkSelection() {
  const selection = useStore($selection);
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    if (isServer) return;
    setMounted(true);
  });

  return (
    <div class="bg-dark-navy relative flex h-[4.5rem] flex-row rounded-xl p-2">
      {/* Pseudo div to animate the sliding tab */}
      <div class="absolute inset-2">
        <div
          class="bg-silver hover:bg-silver-hover h-full w-1/2 rounded-xl duration-200 motion-reduce:duration-0"
          classList={{
            "translate-x-0": mounted() && selection() === "x",
            "translate-x-full": mounted() && selection() === "o",
          }}
        ></div>
      </div>

      <button
        class="hover:bg-silver z-10 flex w-full items-center justify-center rounded-xl hover:bg-opacity-5"
        aria-label="X Mark"
        onClick={() => $selection.set("x")}
      >
        <IconX
          className="size-8"
          classList={{
            "fill-dark-navy": mounted() && selection() === "x",
            "fill-silver": mounted() && selection() !== "x",
          }}
        />
      </button>

      <button
        class="hover:bg-silver z-10 flex w-full items-center justify-center rounded-xl hover:bg-opacity-5"
        aria-label="O Mark"
        onClick={() => $selection.set("o")}
      >
        <IconO
          className="size-8"
          classList={{
            "fill-dark-navy": mounted() && selection() === "o",
            "fill-silver": mounted() && selection() !== "o",
          }}
        />
      </button>
    </div>
  );
}
