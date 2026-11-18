# @cwa-dou/mailkit-core

Shared [zod](https://zod.dev) schemas and operations behind the mailkit
[CLI](https://www.npmjs.com/package/@cwa-dou/mailkit) and
[MCP server](https://www.npmjs.com/package/@cwa-dou/mailkit-mcp). Currently supports sending
Telegram messages.

ESM only.

## Install

```bash
npm install @cwa-dou/mailkit-core
# or
bun add @cwa-dou/mailkit-core
```

## Usage

```ts
import { sendTelegramMessage } from "@cwa-dou/mailkit-core";

const result = await sendTelegramMessage({
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  chatId: "123456789",
  message: "Hello from mailkit",
});

console.log(result); // { ok: true, chatId: "123456789", messageId: 42 }
```

Input is validated with zod. The call throws if the input is invalid or if the Telegram API
returns an error.

## API

| Export                         | Description                                               |
| ------------------------------ | --------------------------------------------------------- |
| `sendTelegramMessage(options)` | Send a message through the Telegram Bot API               |
| `telegramMessageInputSchema`   | zod schema for `{ chatId, message }` (used for MCP tools) |
| `telegramMessageOptionsSchema` | zod schema for `{ chatId, message, botToken }`            |
| `telegramMessageOutputSchema`  | zod schema for `{ ok: true, chatId, messageId }`          |
| `TelegramMessageInput`         | Type inferred from `telegramMessageInputSchema`           |
| `TelegramMessageOptions`       | Type inferred from `telegramMessageOptionsSchema`         |
| `TelegramMessageOutput`        | Type inferred from `telegramMessageOutputSchema`          |

## Related packages

- [`@cwa-dou/mailkit`](https://www.npmjs.com/package/@cwa-dou/mailkit) - CLI
- [`@cwa-dou/mailkit-mcp`](https://www.npmjs.com/package/@cwa-dou/mailkit-mcp) - local stdio MCP server

Part of [mailkit](https://github.com/anhtudo97/mailkit).

## License

ISC
