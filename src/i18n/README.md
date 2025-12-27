# Chrome Extension i18n (Internationalization)

This module provides type-safe internationalization for Chrome extensions using the [Chrome i18n API](https://developer.chrome.com/docs/extensions/reference/api/i18n).

## Directory Structure

```
public/
└── _locales/
    ├── en/
    │   └── messages.json   # English translations (default)
    └── ja/
        └── messages.json   # Japanese translations

src/
└── i18n/
    ├── index.ts            # Core i18n functions
    ├── messages.ts         # Type definitions for message keys
    ├── use-i18n.ts         # React hook
    └── README.md           # This file
```

## Quick Start

### 1. Add Messages to `messages.json`

Each locale has its own `messages.json` file in `public/_locales/{locale}/`:

```json
{
  "greeting": {
    "message": "Hello, $USER_NAME$!",
    "description": "Greeting with user name",
    "placeholders": {
      "user_name": {
        "content": "$1",
        "example": "John"
      }
    }
  }
}
```

### 2. Update Type Definitions

Add new message keys to `src/i18n/messages.ts`:

```ts
export type MessageKey =
  | "extName"
  | "greeting"  // Add new keys here
  // ...

// For messages with placeholders:
export interface MessagePlaceholders {
  greeting: [userName: string];  // Define placeholder types
  // ...
}
```

### 3. Use in React Components

```tsx
import { useI18n } from "@/i18n/use-i18n";

function MyComponent() {
  const { t, locale } = useI18n();

  return (
    <div>
      <p>{t("hello")}</p>
      <p>{t("greeting", ["John"])}</p>
      <p>Locale: {locale}</p>
    </div>
  );
}
```

### 4. Use Outside React

```ts
import { getMessage, getUILanguage } from "@/i18n";

const greeting = getMessage("hello");
const withName = getMessage("welcomeUser", ["John"]);
const locale = getUILanguage();
```

## API Reference

### `getMessage(key)`

Get a localized message without placeholders.

```ts
const hello = getMessage("hello"); // "Hello" or "こんにちは"
```

### `getMessage(key, substitutions)`

Get a localized message with placeholder substitutions.

```ts
const count = getMessage("count", [5]);        // "count is 5"
const welcome = getMessage("welcomeUser", ["John"]); // "Welcome, John!"
```

### `getUILanguage()`

Get the current browser UI language.

```ts
const locale = getUILanguage(); // "en" or "ja"
```

### `getAcceptLanguages()`

Get the browser's accepted languages in order of preference.

```ts
const languages = await getAcceptLanguages(); // ["en-US", "en", "ja"]
```

### `detectLanguage(text)`

Detect the language of given text.

```ts
const result = await detectLanguage("Hello, world!");
console.log(result.languages[0].language); // "en"
```

### `useI18n()` (React Hook)

Provides all i18n utilities in a React-friendly way.

```tsx
const { t, locale, getAcceptLanguages, detectLanguage } = useI18n();
```

## Message Format

### Basic Message

```json
{
  "hello": {
    "message": "Hello",
    "description": "A simple greeting"
  }
}
```

### Message with Placeholders

```json
{
  "welcomeUser": {
    "message": "Welcome, $USER_NAME$!",
    "description": "Welcome message with user name",
    "placeholders": {
      "user_name": {
        "content": "$1",
        "example": "John"
      }
    }
  }
}
```

**Rules for placeholders:**
- Placeholder names are **case-insensitive**
- Use `$1`, `$2`, etc. in `content` to reference substitution arguments
- The `example` field helps translators understand the context

### Using in Manifest

Reference messages in `manifest.config.ts`:

```ts
export default defineManifest({
  name: "__MSG_extName__",
  description: "__MSG_extDescription__",
  default_locale: "en",
  // ...
});
```

### Using in CSS

```css
body {
  direction: __MSG_@@bidi_dir__;
}
```

### Using in HTML

```html
<img src="logo.png" alt="__MSG_extName__" />
```

## Predefined Messages

Chrome provides these predefined message keys:

| Key | Description |
|-----|-------------|
| `@@extension_id` | The extension's unique ID |
| `@@ui_locale` | Current UI locale (e.g., "en", "ja") |
| `@@bidi_dir` | Text direction: "ltr" or "rtl" |
| `@@bidi_reversed_dir` | Opposite text direction |
| `@@bidi_start_edge` | "left" for LTR, "right" for RTL |
| `@@bidi_end_edge` | "right" for LTR, "left" for RTL |

**Note:** Do not create custom messages starting with `@@`.

## Adding a New Locale

1. Create a new directory: `public/_locales/{locale_code}/`
2. Copy `messages.json` from another locale
3. Translate all message values
4. Keep the same keys and placeholder structure

### Supported Locale Codes

Common examples:
- `en` - English
- `ja` - Japanese
- `zh_CN` - Chinese (Simplified)
- `zh_TW` - Chinese (Traditional)
- `ko` - Korean
- `es` - Spanish
- `fr` - French
- `de` - German

See [Chrome's supported locales](https://developer.chrome.com/docs/extensions/reference/api/i18n#locales) for the full list.

## Best Practices

1. **Always provide descriptions** - Help translators understand context
2. **Use meaningful placeholder names** - `$USER_NAME$` is clearer than `$1$`
3. **Keep keys consistent** - Use camelCase for all message keys
4. **Update types** - Always update `messages.ts` when adding new messages
5. **Test all locales** - Switch browser language to verify translations

## Testing

Run tests with:

```bash
bun test src/i18n
```

## References

- [Chrome i18n API](https://developer.chrome.com/docs/extensions/reference/api/i18n)
- [Internationalize the interface](https://developer.chrome.com/docs/extensions/develop/ui/i18n)
- [Localization message formats](https://developer.chrome.com/docs/extensions/mv3/i18n-messages/)
