module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    ENV: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'linebreak-style': [
      'off',
      'unix'
    ],
    quotes: [
      'off',
      'single'
    ],
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'valid-v-slot': 'off'
  },

  root: true,

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard'
  ]
}
