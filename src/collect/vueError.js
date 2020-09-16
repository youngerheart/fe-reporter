import { getMessageSuffix } from '../utils'

const vueError = {}

vueError.install = (Vue, Reporter) => {
  Vue.config.errorHandler = (err, vm, info) => {
    if (Reporter.config.silent) throw err
    let { message, name, stack } = err

    let vueError = {
      type: `vueError${getMessageSuffix(message)}`,
      message,
      name,
      trace: stack && stack.split('\n'),
      info
    }

    Reporter.pushToStack && Reporter.pushToStack(vueError)
  }
  // add global prototype
  Vue.prototype.$reporter = Reporter
}

export default function (Reporter) {
  Reporter.vueError = vueError
}
