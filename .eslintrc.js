module.exports = {

  extends: 'eslint:recommended',

  parser: 'babel-eslint',

  root: true,

  parserOptions: {
    sourceType: 'module'
  },

  env: {
    es6: true
  },

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'generator-star-spacing': 0,
    'no-console': 0
  }

}
