# mailkit

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

| Variable             | Description        |
| -------------------- | ------------------ |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |

## Structure

```
.
├── packages/
│   └── cli/          # mailkit CLI package
├── .husky/           # git hooks (commit-msg -> commitlint)
├── .vscode/          # shared editor settings + recommended extensions
├── commitlint.config.mjs
├── eslint.config.mjs
└── tsconfig.json
```

## Scripts

| Command             | Description           |
| ------------------- | --------------------- |
| `bun run lint`      | Lint with ESLint      |
| `bun run lint:fix`  | Lint and auto-fix     |
| `bun run format`    | Format with Prettier  |
| `bun run typecheck` | Type-check with `tsc` |
| `bun test`          | Run tests with Bun    |

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
(Prettier, ESLint, EditorConfig, Bun). Format and ESLint fixes run on save.
