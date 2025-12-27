/**
 * Chrome Extension i18n utilities
 *
 * This module provides type-safe internationalization functions
 * using the Chrome Extension i18n API.
 *
 * @see https://developer.chrome.com/docs/extensions/reference/api/i18n
 */

import type {
  MessageKey,
  MessagePlaceholders,
  MessageWithoutPlaceholders,
  MessageWithPlaceholders,
} from "./messages";

export type {
  MessageKey,
  MessagePlaceholders,
  MessageWithoutPlaceholders,
  MessageWithPlaceholders,
} from "./messages";

/**
 * Result of language detection from detectLanguage()
 */
export interface DetectLanguageResult {
  /** Whether the detection is reliable */
  isReliable: boolean;
  /** Array of detected languages with their percentages */
  languages: Array<{
    /** ISO language code (e.g., "en", "ja") */
    language: string;
    /** Percentage of text in this language */
    percentage: number;
  }>;
}

/**
 * Get a localized message by key (for messages without placeholders)
 *
 * @param key - The message key as defined in messages.json
 * @returns The localized message string
 *
 * @example
 * ```ts
 * const greeting = getMessage("hello"); // "Hello" or "こんにちは"
 * ```
 */
export function getMessage(key: MessageWithoutPlaceholders): string;

/**
 * Get a localized message by key with placeholder substitutions
 *
 * @param key - The message key as defined in messages.json
 * @param substitutions - Values to substitute into placeholders
 * @returns The localized message string with substitutions applied
 *
 * @example
 * ```ts
 * const countMsg = getMessage("count", [5]); // "count is 5"
 * const welcome = getMessage("welcomeUser", ["John"]); // "Welcome, John!"
 * ```
 */
export function getMessage<K extends MessageWithPlaceholders>(
  key: K,
  substitutions: MessagePlaceholders[K]
): string;

/**
 * Implementation of getMessage
 */
export function getMessage(
  key: MessageKey,
  substitutions?: string[] | (string | number)[]
): string {
  const subs = substitutions?.map(String);
  return chrome.i18n.getMessage(key, subs);
}

/**
 * Get the current UI language of the browser
 *
 * @returns The browser UI language code (e.g., "en", "ja", "en-US")
 *
 * @example
 * ```ts
 * const uiLanguage = getUILanguage(); // "en" or "ja"
 * ```
 */
export function getUILanguage(): string {
  return chrome.i18n.getUILanguage();
}

/**
 * Get the accept-languages of the browser
 *
 * @returns Promise resolving to an array of language codes in order of preference
 *
 * @example
 * ```ts
 * const languages = await getAcceptLanguages(); // ["en-US", "en", "ja"]
 * ```
 */
export function getAcceptLanguages(): Promise<string[]> {
  return chrome.i18n.getAcceptLanguages();
}

/**
 * Detect the language of the given text
 *
 * @param text - The text to detect the language of
 * @returns Promise resolving to the detection result
 *
 * @example
 * ```ts
 * const result = await detectLanguage("Hello, world!");
 * console.log(result.languages[0].language); // "en"
 * ```
 */
export function detectLanguage(text: string): Promise<DetectLanguageResult> {
  return chrome.i18n.detectLanguage(text);
}

/**
 * Predefined message keys provided by Chrome
 * These can be used in CSS and HTML with the __MSG_name__ syntax
 */
export const predefinedMessages = {
  /** The extension's ID */
  extensionId: "@@extension_id",
  /** The current UI locale */
  uiLocale: "@@ui_locale",
  /** "ltr" for left-to-right languages, "rtl" for right-to-left */
  bidiDir: "@@bidi_dir",
  /** "ltr" for left-to-right languages, "rtl" for right-to-left (reversed) */
  bidiReversedDir: "@@bidi_reversed_dir",
  /** "left" for LTR, "right" for RTL */
  bidiStartEdge: "@@bidi_start_edge",
  /** "right" for LTR, "left" for RTL */
  bidiEndEdge: "@@bidi_end_edge",
} as const;
