# @cwa-dou/telekit

Command line tool to send notifications (currently Telegram) with telekit.

## Install

```bash
npm install -g @cwa-dou/telekit
# or run without installing
npx @cwa-dou/telekit --help
```

Requires Node.js >= 18.

## Setup

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the bot token.
2. Get the chat ID you want to message (send a message to your bot, then open
   `https://api.telegram.org/bot<token>/getUpdates` and read `message.chat.id`).
3. Save the token locally:

```bash
telekit init --telegram-bot-token <token>
```

The token is stored in `~/.config/telekit/config.json` (file mode `600`).

## Usage

```bash
telekit telegram <chatId> "<message>"
```

Prints the result as JSON on success:

```json
{ "ok": true, "chatId": "123456789", "messageId": 42 }
```

On failure the error message is printed to stderr and the exit code is `1`.

## Commands

| Command                                 | Description                                 |
| --------------------------------------- | ------------------------------------------- |
| `telekit init --telegram-bot-token <t>` | Save the Telegram bot token to local config |
| `telekit telegram <chatId> <message>`   | Send a Telegram message                     |

## Related packages

- [`@cwa-dou/telekit-core`](https://www.npmjs.com/package/@cwa-dou/telekit-core) - shared schemas and operations
- [`@cwa-dou/telekit-mcp`](https://www.npmjs.com/package/@cwa-dou/telekit-mcp) - local stdio MCP server

Part of [telekit](https://github.com/anhtudo97/telekit).

## License

ISC
