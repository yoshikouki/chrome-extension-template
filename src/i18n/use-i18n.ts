/**
 * React hook for Chrome Extension i18n
 */

import { useCallback, useMemo } from "react";
import {
  type DetectLanguageResult,
  detectLanguage,
  getAcceptLanguages,
  getMessage,
  getUILanguage,
  type MessageKey,
  type MessagePlaceholders,
  type MessageWithoutPlaceholders,
  type MessageWithPlaceholders,
} from "./index";

export interface UseI18nReturn {
  /**
   * Get a localized message by key
   */
  t: {
    (key: MessageWithoutPlaceholders): string;
    <K extends MessageWithPlaceholders>(
      key: K,
      substitutions: MessagePlaceholders[K]
    ): string;
  };
  /**
   * The current UI language code
   */
  locale: string;
  /**
   * Get the browser's accepted languages
   */
  getAcceptLanguages: () => Promise<string[]>;
  /**
   * Detect the language of given text
   */
  detectLanguage: (text: string) => Promise<DetectLanguageResult>;
}

/**
 * React hook providing i18n utilities
 *
 * @returns Object containing translation function and locale utilities
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, locale } = useI18n();
 *
 *   return (
 *     <div>
 *       <p>{t("hello")} {t("world")}</p>
 *       <p>{t("count", [5])}</p>
 *       <p>Current locale: {locale}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useI18n(): UseI18nReturn {
  const locale = useMemo(() => getUILanguage(), []);

  const t = useCallback(
    (key: MessageKey, substitutions?: (string | number)[]) => {
      if (substitutions) {
        return getMessage(
          key as MessageWithPlaceholders,
          substitutions as MessagePlaceholders[MessageWithPlaceholders]
        );
      }
      return getMessage(key as MessageWithoutPlaceholders);
    },
    []
  ) as UseI18nReturn["t"];

  return {
    t,
    locale,
    getAcceptLanguages,
    detectLanguage,
  };
}
