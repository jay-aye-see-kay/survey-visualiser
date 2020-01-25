module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    // basic consistancy
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],

    // Unfortunately not viable on this project as we receive snake case from the api
    '@typescript-eslint/camelcase': 'off',

    // I know this localises type errors but it makes code way too verbose for my liking
    '@typescript-eslint/explicit-function-return-type': 'off',

    // this are super important so bumped from warnings to errors
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  }
};
