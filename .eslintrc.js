module.exports = {

  extends: 'eslint:recommended',

  parser: 'babel-eslint',

  root: true,

  parserOptions: {
    sourceType: 'module'
  },

  env: {
    node: true,
    es6: true
  },

  plugins: [
    'html'
  ],

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error'],
    'generator-star-spacing': 0,
    'arrow-parens': ['error'],
    'require-jsdoc': 'warn',
    'indent': ['error', 2],
    'no-console': 'off',
    'valid-jsdoc': ['warn', {
      'requireReturn': false,
      'prefer': {
        'return': 'returns'
      }
    }]
  }

}
