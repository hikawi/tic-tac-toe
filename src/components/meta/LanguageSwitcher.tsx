import { useStore } from "@nanostores/solid";
import { Portal } from "solid-js/web";
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

  return (
    <Portal>
      <div class="absolute right-6 top-6 z-10 flex flex-col items-end gap-2">
        <button
          class="stroke-silver hover:stroke-silver-hover flex items-center gap-3 px-2 py-1"
          onClick={() => $languageDropdown.set(!languageDropdown())}
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
