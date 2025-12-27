/**
 * Type-safe i18n message keys
 * This file defines all available message keys and provides type safety
 * for the getMessage function.
 */

/**
 * All available message keys in the extension
 * Add new keys here when adding new messages to messages.json
 */
export type MessageKey =
  | "extName"
  | "extDescription"
  | "hello"
  | "world"
  | "count"
  | "clickToIncrement"
  | "learnMore"
  | "welcomeUser";

/**
 * Messages that require placeholder substitutions
 * Maps message keys to their placeholder argument types
 */
export interface MessagePlaceholders {
  count: [count: string | number];
  learnMore: [topic: string];
  welcomeUser: [userName: string];
}

/**
 * Keys of messages that have placeholders
 */
export type MessageWithPlaceholders = keyof MessagePlaceholders;

/**
 * Keys of messages without placeholders
 */
export type MessageWithoutPlaceholders = Exclude<
  MessageKey,
  MessageWithPlaceholders
>;
