# mailkit

Send notifications (currently Telegram) from a CLI, a local MCP server, or a remote MCP server,
all backed by one shared core package.

Bun monorepo (workspaces: `apps/*`, `packages/*`).

## Requirements

- [Bun](https://bun.sh) >= 1.3
- Git

## Setup

```bash
bun install          # also installs Husky git hooks via the `prepare` script
cp .env.example .env # then fill in values
```

Environment variables (see [.env.example](.env.example)):

| Variable                | Used by      | Description                   |
| ----------------------- | ------------ | ----------------------------- |
| `TELEGRAM_BOT_TOKEN`    | `local-mcp`  | Telegram bot token            |
| `CLERK_PUBLISHABLE_KEY` | `remote-mcp` | Clerk publishable key (OAuth) |
| `CLERK_SECRET_KEY`      | `remote-mcp` | Clerk secret key (OAuth)      |
| `PORT`                  | `remote-mcp` | HTTP port (default `3000`)    |

## Structure

```
.
├── packages/
│   ├── core/         # @cwa-dou/mailkit-core: zod schemas + operations (sendTelegramMessage)
│   ├── cli/          # mailkit CLI (commander)
│   └── local-mcp/    # @cwa-dou/mailkit-mcp: stdio MCP server
├── apps/
│   └── remote-mcp/   # Hono HTTP MCP server, protected by Clerk OAuth
├── .github/workflows/ci.yml  # format check + typecheck
├── .husky/           # git hooks (commit-msg -> commitlint)
├── .vscode/          # shared editor settings + recommended extensions
├── commitlint.config.mjs
├── .oxlintrc.json    # oxlint config
├── .oxfmtrc.json     # oxfmt config
└── tsconfig.json
```

Each package under `packages/` builds with [tsdown](https://tsdown.dev) (`tsdown.config.ts`:
ESM, `.d.ts`, sourcemaps, output in `dist/`) and has a `tsconfig.build.json`.

## Usage

### CLI

```bash
bun run dev:cli init --telegram-bot-token <token>   # saves ~/.config/mailkit/config.json (mode 600)
bun run dev:cli telegram <chatId> "<message>"
```

### Local MCP server (stdio)

```bash
TELEGRAM_BOT_TOKEN=<token> bun run dev:mcp
```

Example client config (`.mcp.json` is git-ignored because it holds the token):

```json
{
  "mcpServers": {
    "mailkit-local": {
      "command": "bun",
      "args": ["run", "dev:mcp"],
      "env": { "TELEGRAM_BOT_TOKEN": "<token>" }
    }
  }
}
```

Exposes one tool: `telegram` (`chatId`, `message`).

### Remote MCP server (HTTP)

```bash
bun run dev:remote
```

- `POST /:botToken/mcp` - MCP endpoint (stateless Streamable HTTP); needs a Clerk OAuth bearer token
- `GET /.well-known/oauth-protected-resource/:botToken/mcp` - OAuth protected resource metadata

## Scripts

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `bun run dev:cli`      | Run the CLI from source        |
| `bun run dev:mcp`      | Run the local stdio MCP server |
| `bun run dev:remote`   | Run the remote HTTP MCP server |
| `bun run build:core`   | Build `@cwa-dou/mailkit-core`  |
| `bun run build:cli`    | Build the CLI                  |
| `bun run lint`         | Lint with oxlint               |
| `bun run lint:fix`     | Lint and auto-fix              |
| `bun run format`       | Format with oxfmt              |
| `bun run format:check` | Check formatting               |
| `bun run typecheck`    | Type-check with `tsc`          |
| `bun test`             | Run tests with Bun             |

## CI

GitHub Actions ([ci.yml](.github/workflows/ci.yml)) runs `format:check` and `typecheck` on pushes
to `master` and on pull requests.

## Commit convention

Commit messages are checked by [commitlint](https://commitlint.js.org) using
[Conventional Commits](https://www.conventionalcommits.org):

```
feat: add smtp transport
fix(cli): handle empty config
docs: update readme
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## Editor

Open the project in VS Code and install the recommended extensions
(Oxc, EditorConfig, Bun). Format and oxlint fixes run on save.
