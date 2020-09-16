import { assignData } from './utils'
import { version } from './../package.json'

export default function (Reporter) {
  let interval

  let stack = []

  let countObj = {}

  let storageStr = localStorage.getItem('xiaoe-reporter')

  if (storageStr) {
    try {
      stack = JSON.parse(storageStr)
    } catch (err) {
      stack = []
    }
  }

  Reporter.pushToStack = function (error) {
    let { repeat, sample, delay, globals, moduleName, filter } = this.config
    // deal with filter

    if (filter && error.url ? error.url.match(filter) : location.href.match(filter)) return
    error = assignData(error, { globals, moduleName, version })
    // deal with config.repeat
    if (!countObj[error.type]) countObj[error.type] = 1
    if (!repeat || countObj[error.type] <= repeat) {
      countObj[error.type]++
      // deal with sample
      if (sample === 1 || Math.random() < sample) {
        if (!delay) this.send([ error ])
        else stack.push(error)
      }
    }
  }
  Reporter.setStorage = function (stack) {
    localStorage.setItem('xiaoe-reporter', JSON.stringify(stack))
  }
  Reporter.run = function () {
    let { delay } = this.config

    if (delay) {
      // setInterval for delay time
      interval = setInterval(() => {
        if (stack.length) this.send(stack)
        else localStorage.removeItem('xiaoe-reporter')
      }, delay)
    } else {
      // send cached stack only
      if (stack.length) this.send(stack)
    }
    console.log(`Reporter ${version} is running.`)
  }
  Reporter.stop = function () {
    if (interval) {
      clearInterval(interval)
      console.log('Reporter stoped')
      interval = 0
    }
  }
}
