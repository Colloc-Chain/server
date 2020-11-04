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
  plugins: ['prettier', 'jest', 'module-resolver'],
  rules: {
    'func-names': 'off',
    'arrow-parens': 'off',
    'prettier/prettier': 'error',
    'module-resolver/use-alias': 2,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
