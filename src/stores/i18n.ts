import { browser, createI18n, formatter, localeFrom } from "@nanostores/i18n";
import { persistentAtom } from "@nanostores/persistent";

const $locale = persistentAtom<string>("locale", "en", { listen: false });
const locale = localeFrom(
  $locale,
  browser({
    fallback: "en",
    available: ["en", "ja", "vi"],
  }),
);

const format = formatter(locale);
const i18n = createI18n(locale, {
  get(key: string) {
    return import(`../i18n/${key}.json`);
  },
});

export { $locale, format, i18n, locale };
