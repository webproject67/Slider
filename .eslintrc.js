module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['plugin:fsd/all'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  plugins: ['fsd'],
  rules: {
    'no-var': 'error',
    'no-debugger': 'error',
    'no-console': 'error',
  },
};
