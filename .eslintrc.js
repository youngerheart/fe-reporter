module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  globals: {
    Promise: false,
    setTimeoutError: false,
    setIntervalError: false,
    onloadError: false,
    syncError: false,
    process: false,
    require: false
  },
  extends: [
    'eslint:recommended'
  ],
  // add your custom rules here
  rules: {
    'indent': ['error', 2],

    'no-console': 0,

    // 引号类型
    'quotes': [1, 'single'],

    // 对象字面量项尾不能有逗号
    'comma-dangle': [2, 'never'],

    // 逗号风格，换行时在行首还是行尾
    'comma-style': [2, 'last'],

    // switch语句最后必须有default
    'default-case': 0,

    //声明时必须赋初值
    'init-declarations': 0,

    //对象字面量中冒号的前后空格
    'key-spacing': [0, { 'beforeColon': false, 'afterColon': true }],

    //禁止比较时使用NaN，只能用isNaN()
    'use-isnan': 2,

    //强制对象字面量缩写语法
    'object-shorthand': 0,

    //变量声明后需要空一行
    'newline-after-var': 2,

    // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    'array-bracket-spacing': [2, 'always'],

    // 强制不以分号结尾
    'semi': [2, 'never'],

    // if while function 后面的{必须与if在同一行，java风格。
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],

    // 关键字后面是否要空一格
    'space-after-keywords': [0, 'always'],

    // 不允许赋值到关键字
    'no-native-reassign': 2,

    // 不允许tab和空格混合
    'no-mixed-spaces-and-tabs': ['error'],

    'block-spacing': ['error', 'always'],

    // 正确示例 [ 1, 2, 3 ] 错误示例 [1, 2, 3]
    'array-bracket-spacing': ['error', 'always'],

    // 箭头函数用小括号括起来
    'arrow-parens': ['error', 'as-needed'],

    // =>的前/后括号
    'arrow-spacing': ['error', { before: true, after: true }],

    // 函数前后空格
    'space-before-function-paren':  ["error", "always"],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 冒号前面不能有空格, 后面必须有空格, 键值需水平对齐
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: "strict"
      }
    ],

    // 函数调用时 函数名与()之间不能有空格
    'no-spaced-func': 2,

    // 一元运算符的前/后要不要加空格
    'space-unary-ops': [0, { words: true, nonwords: false }],

    // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-keys': 2,

    // 函数参数不能重复
    'no-dupe-args': 2,

    // switch中的case标签不能重复
    'no-duplicate-case': 2,

    // 如果if语句里面有return,后面不能跟else语句
    'no-else-return': 2,

    // 块语句中的内容不能为空
    'no-empty': 2,

    // 块声明前必须有空格
    'space-before-blocks': 2,

    // 对象访问符的位置，换行的时候在行首
    'dot-location': ['error', 'property'],

    // 使用严格模式
    'strict': 2
  }
}
