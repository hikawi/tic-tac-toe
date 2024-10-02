import { useStore } from "@nanostores/solid";
import MarkSelection from "./MarkSelection";
import { $tl } from "./tl";

export default function MarkSection() {
  const tl = useStore($tl);

  return (
    <div class="bg-semi-dark-navy flex w-full flex-col gap-4 rounded-2xl p-6 text-center">
      <span class="heading-xs pb-4">{tl().pick}</span>
      <MarkSelection />
      <p class="body uppercase">{tl().notice}</p>
    </div>
  );
}
