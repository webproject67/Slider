module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
    jquery: true,
  },
  extends: [
    'airbnb-base',
    'plugin:fsd/all',
    'plugin:import/typescript',
    'prettier',
  ],
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
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
    'no-shadow': ['error', { allow: ['evt'] }],
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
  },
};
