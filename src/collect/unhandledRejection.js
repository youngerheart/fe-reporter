import { getReasonSuffix } from '../utils'

export default function (Reporter) {
  window.addEventListener('unhandledrejection', error => {
    let message = error.reason

    let unhandledRejection = {
      type: `unhandledRejection${getReasonSuffix(message)}`,
      message
    }

    Reporter.pushToStack && Reporter.pushToStack(unhandledRejection)
    // return true
  })
}
