// This file configures ESLint, a tool for identifying and reporting on patterns in JavaScript code.

// Imports the recommended ESLint configuration for JavaScript.
import js from '@eslint/js'
// Imports global variables that are available in different environments (e.g., browser, node).
import globals from 'globals'
// Imports the ESLint plugin for React Hooks, which enforces the Rules of Hooks.
import reactHooks from 'eslint-plugin-react-hooks'
// Imports the ESLint plugin for React Refresh, which enables Fast Refresh with Vite.
import reactRefresh from 'eslint-plugin-react-refresh'
// Imports helper functions from the ESLint config package.
import { defineConfig, globalIgnores } from 'eslint/config'

// Exports the main ESLint configuration array.
export default defineConfig([
  // Ignores the 'dist' directory, which contains production build artifacts.
  globalIgnores(['dist']),
  {
    // Specifies that this configuration applies to all .js and .jsx files.
    files: ['**/*.{js,jsx}'],
    // Extends several recommended configurations.
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    // Configures language-specific options.
    languageOptions: {
      // Sets the ECMAScript version.
      ecmaVersion: 2020,
      // Defines global variables available in a browser environment.
      globals: globals.browser,
      // Configures the parser options.
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enables parsing of JSX.
        sourceType: 'module', // Allows for the use of imports.
      },
    },
    // Defines specific rules and their error levels.
    rules: {
      // Configures the 'no-unused-vars' rule to treat unused variables as an error,
      // but ignores variables that start with an uppercase letter or underscore.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])