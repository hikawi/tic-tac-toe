import { useStore } from "@nanostores/solid";
import { $selection } from "../../stores/selection";
import IconO from "../icons/IconO";
import IconX from "../icons/IconX";

export default function MarkSelection() {
  const selection = useStore($selection);

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
        class="hover:bg-silver z-10 flex w-full items-center justify-center rounded-xl hover:bg-opacity-5"
        aria-label="X Mark"
        onClick={() => $selection.set("x")}
      >
        <IconX
          className="size-8"
          classList={{
            "fill-dark-navy": selection() === "x",
            "fill-silver": selection() !== "x",
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
            "fill-dark-navy": selection() === "o",
            "fill-silver": selection() !== "o",
          }}
        />
      </button>
    </div>
  );
}
