import { useStore } from "@nanostores/solid";
import { onCleanup, onMount } from "solid-js";
import { isServer, Portal } from "solid-js/web";
import { i18n } from "../../stores/i18n";
import { $languageDropdown } from "../../stores/languageDropdown";
import IconTranslate from "../icons/IconTranslate";
import LanguageDropdown from "./LanguageDropdown";

const languageName = i18n("language", {
  name: "English",
});

export default function LanguageSwitcher() {
  const locale = useStore(languageName);
  const languageDropdown = useStore($languageDropdown);

  function keydownHandler(event: KeyboardEvent) {
    if (event.key.toLowerCase() === "t") {
      document.getElementById("button-language")?.click();
    }
  }

  onMount(() => {
    if (isServer) return;
    window.addEventListener("keydown", keydownHandler);
  });

  onCleanup(() => {
    if (isServer) return;
    window.removeEventListener("keydown", keydownHandler);
  });

  return (
    <Portal>
      <div class="absolute right-6 top-6 z-10 flex flex-col items-end gap-2">
        <button
          class="stroke-silver hover:stroke-silver-hover flex items-center gap-3 px-2 py-1"
          onClick={() => $languageDropdown.set(!languageDropdown())}
          id="button-language"
          aria-label="Change Language"
          aria-expanded={languageDropdown()}
        >
          <IconTranslate className="text-silver size-6" />
          <span>{locale().name}</span>
        </button>

        <LanguageDropdown />
      </div>
    </Portal>
  );
}
