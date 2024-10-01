import { useStore } from "@nanostores/solid";
import { For, Show } from "solid-js/web";
import { $locale } from "../../stores/i18n";
import { $languageDropdown } from "../../stores/languageDropdown";

const availableLocales: Record<string, string> = {
  en: "English",
  ja: "日本語",
  vi: "Tiếng Việt",
};

function LocaleSection(props: { locale: string; excluded?: boolean }) {
  return (
    <div
      class="ring-silver bg-semi-dark-navy flex h-fit w-full flex-col gap-4 rounded-xl px-6 py-3 ring-1 ring-opacity-40 md:w-fit md:gap-2"
      role="listbox"
      aria-label="Choose a language"
    >
      <For each={Object.keys(availableLocales)}>
        {(locale) => (
          <Show when={locale !== props.locale || !props.excluded}>
            <button
              class="text-silver hover:text-silver-hover"
              onClick={() => {
                $locale.set(locale);
                $languageDropdown.set(false);
              }}
              role="option"
              aria-selected={locale === props.locale}
            >
              {availableLocales[locale]}
            </button>
          </Show>
        )}
      </For>
    </div>
  );
}

export default function LanguageDropdown() {
  const localeValue = useStore($locale);
  const languageDropdown = useStore($languageDropdown);

  return (
    <Show when={languageDropdown()}>
      {/* Dropdown for mobiles. */}
      <div class="fixed inset-0 flex h-full w-full justify-center bg-black bg-opacity-25 p-6 backdrop-blur-sm md:hidden">
        <LocaleSection locale={localeValue()} />
      </div>

      {/* Dropdown for tablets and larger screens. */}
      <LocaleSection locale={localeValue()} excluded />
    </Show>
  );
}
