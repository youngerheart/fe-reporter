import { getMessageSuffix } from '../utils'

const Tools = {
  // 合并错误
  //用try包裹普通对象
  catNormal: function (func, args) {
    return function () {
      try {
        return func.apply(this, args || arguments)
      } catch (err) {
        throw err
      }
    }
  },
  catTimeout (foo) {
    return function (func, timeout) {
      // for setTimeout(string, delay)
      if (typeof func === 'string') {
        try {
          func = new Function(func)
        } catch (err) {
          throw err
        }
      }
      var args = Array.prototype.slice.call(arguments, 2)

      // for setTimeout(function, delay, param1, ...)

      func = Tools.catNormal(func, args.length && args)
      return foo(func, timeout)
    }
  }
}


export default function (Reporter) {
  // 同步异常
  window.onerror = function (message, url, lineNumber, columnNumber, others) {
    
    let jsError = {
      type: `jsError${getMessageSuffix(message)}`,
      log_level: 'error',
      message,
      lineNumber,
      columnNumber,
      url
    }

    if (others) {
      jsError.trace =  others.stack && others.stack.split('\n')
      jsError.name = others.name
    }

    Reporter.pushToStack && Reporter.pushToStack(jsError)
    // return true
  }
  // setTimeout 异步异常
  window.setTimeout = Tools.catTimeout(window.setTimeout)
  window.setInverval = Tools.catTimeout(window.setInverval)
}
