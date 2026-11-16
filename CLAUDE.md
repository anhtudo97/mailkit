# CLAUDE.md

Guidance for Claude Code when working in this repository. See [README.md](README.md) for setup.

## Stack

- Bun monorepo (workspaces: `apps/*`, `packages/*`), ESM only (`"type": "module"`)
- TypeScript 7 (strict)
- oxlint (lint) + oxfmt (format), both pinned to minor (0.x/1.x are young), Husky, commitlint
- tsdown for package builds, zod for schemas, commander (CLI), `@modelcontextprotocol/sdk` (MCP), Hono + Clerk (remote MCP)
- CI: GitHub Actions runs `format:check` + `typecheck` on push to `master` and PRs

## Commands

Always use Bun, never npm/npx/yarn/pnpm.

```bash
bun install          # install deps + husky hooks
bun run lint         # oxlint .
bun run lint:fix
bun run format       # oxfmt .
bun run format:check
bun run typecheck    # tsc --noEmit
bun test             # bun test runner
bun run dev:cli      # run CLI from source
bun run dev:mcp      # run local stdio MCP server (needs TELEGRAM_BOT_TOKEN)
bun run dev:remote   # run remote HTTP MCP server (needs CLERK_* env vars)
bun run build:core   # tsdown build of core
bun run build:cli    # tsdown build of CLI
bunx <tool>          # instead of npx
```

Run `bun run lint`, `bun run typecheck` and `bun test` after changing code.

## Conventions

- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:` ...), enforced by commitlint via `.husky/commit-msg`. No AI references in messages
- Formatting: oxfmt (double quotes, semicolons, trailing commas, width 100, LF). Do not hand-format
- Use `import type` for type-only imports (`consistent-type-imports`, `verbatimModuleSyntax`)
- Unused variables are errors; prefix intentionally unused args with `_`
- Bun globals (`Bun`) and `@types/bun` are available; prefer Bun APIs over Node equivalents where reasonable
- File names: kebab-case, descriptive. Keep files under ~200 lines
- Never commit `.env` or secrets. Add new env vars to `.env.example` (empty values) and the README table

## Layout

- `packages/core` (`@cwa-dou/mailkit-core`) - shared zod schemas + operations (`sendTelegramMessage`). All business logic lives here; other packages are thin adapters
- `packages/cli` - mailkit CLI (commander). Token stored in `~/.config/mailkit/config.json` via `mailkit init`
- `packages/local-mcp` (`@cwa-dou/mailkit-mcp`) - stdio MCP server, token from `TELEGRAM_BOT_TOKEN`
- `apps/remote-mcp` - Hono HTTP MCP server, Clerk OAuth, bot token taken from the `/:botToken/mcp` path
- New capability: add schema + operation in `core`, then register it in CLI / local-mcp / remote-mcp
- Each package has `tsdown.config.ts` + `tsconfig.build.json`; workspace deps are kept external (`deps.neverBundle`)
- `.mcp.json` is git-ignored (holds a real token); never commit it
- Root configs: `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig.json`, `commitlint.config.mjs`, `.editorconfig`, `.vscode/`
