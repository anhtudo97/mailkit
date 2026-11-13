# CLAUDE.md

Guidance for Claude Code when working in this repository. See [README.md](README.md) for setup.

## Stack

- Bun monorepo (workspaces: `apps/*`, `packages/*`), ESM only (`"type": "module"`)
- TypeScript 7 (strict)
- oxlint (lint) + oxfmt (format), both pinned to minor (0.x/1.x are young), Husky, commitlint

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

- `packages/cli` - mailkit CLI package
- Root configs: `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig.json`, `commitlint.config.mjs`, `.editorconfig`, `.vscode/`
