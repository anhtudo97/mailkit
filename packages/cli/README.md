# @cwa-dou/mailkit

Command line tool to send notifications (currently Telegram) with mailkit.

## Install

```bash
npm install -g @cwa-dou/mailkit
# or run without installing
npx @cwa-dou/mailkit --help
```

Requires Node.js >= 18.

## Setup

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the bot token.
2. Get the chat ID you want to message (send a message to your bot, then open
   `https://api.telegram.org/bot<token>/getUpdates` and read `message.chat.id`).
3. Save the token locally:

```bash
mailkit init --telegram-bot-token <token>
```

The token is stored in `~/.config/mailkit/config.json` (file mode `600`).

## Usage

```bash
mailkit telegram <chatId> "<message>"
```

Prints the result as JSON on success:

```json
{ "ok": true, "chatId": "123456789", "messageId": 42 }
```

On failure the error message is printed to stderr and the exit code is `1`.

## Commands

| Command                                 | Description                                 |
| --------------------------------------- | ------------------------------------------- |
| `mailkit init --telegram-bot-token <t>` | Save the Telegram bot token to local config |
| `mailkit telegram <chatId> <message>`   | Send a Telegram message                     |

## Related packages

- [`@cwa-dou/mailkit-core`](https://www.npmjs.com/package/@cwa-dou/mailkit-core) - shared schemas and operations
- [`@cwa-dou/mailkit-mcp`](https://www.npmjs.com/package/@cwa-dou/mailkit-mcp) - local stdio MCP server

Part of [mailkit](https://github.com/anhtudo97/mailkit).

## License

ISC
