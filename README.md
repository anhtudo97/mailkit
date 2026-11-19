# telekit

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
│   ├── core/         # @cwa-dou/telekit-core: zod schemas + operations (sendTelegramMessage)
│   ├── cli/          # @cwa-dou/telekit: CLI (commander)
│   └── local-mcp/    # @cwa-dou/telekit-mcp: stdio MCP server
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

## Packages

Published to npm (public). Each package has its own README, shown on the npm page.

| Package                                      | Description                            | Docs                                   |
| -------------------------------------------- | -------------------------------------- | -------------------------------------- |
| [`@cwa-dou/telekit-core`](packages/core)     | Shared zod schemas + operations        | [README](packages/core/README.md)      |
| [`@cwa-dou/telekit`](packages/cli)           | `telekit` CLI                          | [README](packages/cli/README.md)       |
| [`@cwa-dou/telekit-mcp`](packages/local-mcp) | Local stdio MCP server (`telekit-mcp`) | [README](packages/local-mcp/README.md) |

`apps/remote-mcp` is private and not published.

Use the published packages without cloning:

```bash
npx @cwa-dou/telekit telegram <chatId> "<message>"   # after `telekit init`
npx -y @cwa-dou/telekit-mcp                           # MCP stdio server, needs TELEGRAM_BOT_TOKEN
```

## Usage

### CLI

```bash
bun run dev:cli init --telegram-bot-token <token>   # saves ~/.config/telekit/config.json (mode 600)
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
    "telekit-local": {
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

| Command                                       | Description                                                |
| --------------------------------------------- | ---------------------------------------------------------- |
| `bun run dev:cli`                             | Run the CLI from source                                    |
| `bun run dev:mcp`                             | Run the local stdio MCP server                             |
| `bun run dev:remote`                          | Run the remote HTTP MCP server                             |
| `bun run build:core`                          | Build `@cwa-dou/telekit-core`                              |
| `bun run build:cli`                           | Build the CLI                                              |
| `bun run build:mcp`                           | Build `@cwa-dou/telekit-mcp`                               |
| `bun run release:pack:core` / `:cli` / `:mcp` | Build + `bun pm pack --dry-run` to preview the npm tarball |
| `bun run lint`                                | Lint with oxlint                                           |
| `bun run lint:fix`                            | Lint and auto-fix                                          |
| `bun run format`                              | Format with oxfmt                                          |
| `bun run format:check`                        | Check formatting                                           |
| `bun run typecheck`                           | Type-check with `tsc`                                      |
| `bun test`                                    | Run tests with Bun                                         |

## Publishing

Publish order matters: `@cwa-dou/telekit-core` first (the CLI and MCP packages depend on it).

1. Bump `version` in the package(s) and update the `@cwa-dou/telekit-core` range in dependents.
2. Preview the tarball: `bun run release:pack:core` (or `:cli`, `:mcp`). Check that `README.md` and
   `dist/` are listed.
3. From the package directory: `bun publish` (`prepublishOnly` runs the build; `publishConfig.access`
   is `public`).

README changes in `packages/*/README.md` only reach npm on the next publish.

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
