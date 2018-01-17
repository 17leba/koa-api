// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  'globals': {
    'alert': true,
    'localStorage': true,
    'location': true
  },
  // add your custom rules here
  // 0: 不报错 1: 警告 2:报错   默认为2
  'rules': {
    "quotes": [1, "single"],
    "no-useless-escape": 0,
    "one-var": "off",
    "no-new": 1,
    "space-before-blocks": [0, "always"], //不以新行开始的块{前面要不要有空格
    "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'new-cap': "off",
    'no-new': "off"
  }
}