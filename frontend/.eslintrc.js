module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 'off',
    'arrow-body-style': 'off',
  },
};
