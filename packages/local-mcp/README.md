# @cwa-dou/mailkit-mcp

Local [MCP](https://modelcontextprotocol.io) server (stdio) that lets AI clients send notifications
(currently Telegram) through mailkit.

## Setup

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the bot token.
2. Add the server to your MCP client and pass the token via `TELEGRAM_BOT_TOKEN`.

### Generic MCP client config

```json
{
  "mcpServers": {
    "mailkit": {
      "command": "npx",
      "args": ["-y", "@cwa-dou/mailkit-mcp"],
      "env": { "TELEGRAM_BOT_TOKEN": "<token>" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add mailkit --env TELEGRAM_BOT_TOKEN=<token> -- npx -y @cwa-dou/mailkit-mcp
```

Requires Node.js >= 18. Keep the token out of version control.

## Tools

| Tool       | Input                                 | Description             |
| ---------- | ------------------------------------- | ----------------------- |
| `telegram` | `chatId` (string), `message` (string) | Send a Telegram message |

Returns a text confirmation plus structured content: `{ ok: true, chatId, messageId }`.

## Environment variables

| Variable             | Required | Description        |
| -------------------- | -------- | ------------------ |
| `TELEGRAM_BOT_TOKEN` | yes      | Telegram bot token |

## Related packages

- [`@cwa-dou/mailkit-core`](https://www.npmjs.com/package/@cwa-dou/mailkit-core) - shared schemas and operations
- [`@cwa-dou/mailkit`](https://www.npmjs.com/package/@cwa-dou/mailkit) - CLI

Part of [mailkit](https://github.com/anhtudo97/mailkit).

## License

ISC
