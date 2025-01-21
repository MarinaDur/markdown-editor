import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Match all JavaScript files
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key, value]) => [
            key.trim(),
            value,
          ]),
        ),
        ...Object.fromEntries(
          Object.entries(globals.node).map(([key, value]) => [
            key.trim(),
            value,
          ]),
        ),
      },
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        project: "./tsconfig.json", // Point to your TypeScript config
      },
    },
    plugins: {
      "@typescript-eslint": {}, // Add TypeScript plugin
      react: {}, // Add React plugin
      "react-hooks": {}, // Add React hooks plugin
    },
    ignores: ["eslint.config.js", "vite.config.ts"],

    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",
      "prettier/prettier": "error",
      "@/no-unused-vars": "warn", // Use TypeScript version of this rule
      // Use TypeScript version of this rule
      "react/jsx-uses-react": "off", // Disable React rules conflicting with Prettier
      "react/react-in-jsx-scope": "off", // Disable React rules conflicting with Prettier
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },

  eslintConfigPrettier,
  eslintPluginPrettierRecommended, // Add Prettier rules
];
