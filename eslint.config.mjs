import globals from 'globals';
import js from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  js.configs.recommended,
  {
      rules: {
          "no-unused-vars": "error"
      }
  }
];