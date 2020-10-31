module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['prettier', 'jest'],
  rules: {
    'func-names': 'off',
    'arrow-parens': 'off',
    'prettier/prettier': 'error',
  },
};
