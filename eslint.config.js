import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      /* 🔹 JavaScript */
      "no-console": "warn", // antes error
      "no-debugger": "warn",

      /* 🔹 TypeScript */
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off", // deja usar any
      "@typescript-eslint/ban-ts-comment": "off",

      /* 🔹 React Hooks */
      "react-hooks/exhaustive-deps": "warn", // menos estricto

      "react-hooks/set-state-in-effect": "warn",

      /* 🔹 React Refresh */
      "react-refresh/only-export-components": "off",

      /* 🔹 Generales útiles */
      "no-unused-vars": "off", // usa la versión de TS en su lugar
    },
  },
]);
