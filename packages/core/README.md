# @cwa-dou/telekit-core

Shared [zod](https://zod.dev) schemas and operations behind the telekit
[CLI](https://www.npmjs.com/package/@cwa-dou/telekit) and
[MCP server](https://www.npmjs.com/package/@cwa-dou/telekit-mcp). Currently supports sending
Telegram messages.

ESM only.

## Install

```bash
npm install @cwa-dou/telekit-core
# or
bun add @cwa-dou/telekit-core
```

## Usage

```ts
import { sendTelegramMessage } from "@cwa-dou/telekit-core";

const result = await sendTelegramMessage({
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  chatId: "123456789",
  message: "Hello from telekit",
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

- [`@cwa-dou/telekit`](https://www.npmjs.com/package/@cwa-dou/telekit) - CLI
- [`@cwa-dou/telekit-mcp`](https://www.npmjs.com/package/@cwa-dou/telekit-mcp) - local stdio MCP server

Part of [telekit](https://github.com/anhtudo97/telekit).

## License

ISC
