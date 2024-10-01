import { useStore } from "@nanostores/solid";
import { i18n } from "../../stores/i18n";
import MarkSelection from "./MarkSelection";

const $tl = i18n("index", {
  pick: "Pick player 1's mark",
  notice: "Remember : x goes first",
});

export default function MarkSection() {
  const tl = useStore($tl);

  return (
    <div class="bg-semi-dark-navy flex w-full flex-col gap-8 rounded-2xl p-6 text-center">
      <span class="heading-xs">{tl().pick}</span>
      <MarkSelection />
      <p class="body uppercase">{tl().notice}</p>
    </div>
  );
}
