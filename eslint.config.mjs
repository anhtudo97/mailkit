import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

// Flat config: eslint recommended + typescript-eslint recommended, Bun globals.
export default tseslint.config(
  { ignores: ["**/dist/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: { globals: { ...globals.node, Bun: "readonly" } },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  // Must be last: turns off stylistic rules that conflict with Prettier.
  prettier,
);
