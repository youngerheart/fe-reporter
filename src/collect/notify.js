import { getMessageSuffix } from '../utils'

export default function (Reporter) {
  Reporter.notify = function (name, message, option) {
    if (typeof option !== 'object') {
      if (typeof option == 'string') option = {otherMessage: option}
      else option = {}
    }

    let notify = {
      message,
      type: `notify-${name}${getMessageSuffix(message)}`,
      ...option
    }

    this.pushToStack(notify)
  }
}
