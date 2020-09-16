const assignData = function ({
  type,
  log_level = 'warning',
  message,
  trace,
  lineNumber,
  columnNumber,
  ...content
}, { globals, moduleName, version }) {

  // add global params
  if (Array.isArray(globals)) {
    globals.forEach(key => {
      if (typeof window[key] !== 'undefined') content[key] = window[key]
    })
  }
  if (lineNumber || columnNumber) type += `(${lineNumber || 0},${columnNumber || 0})`
  if (!content.url) content.url = location.href
  content = JSON.stringify({
    title: document.title,
    npmVersion: version,
    ...content
  })
  return {
    type,
    log_level,
    message,
    trace,
    module_name: moduleName,
    begin_time: Date.now(),
    content
  }
}

const getMessageSuffix = function (message) {
  if (!message) return ''
  let messageStr = message.split(':')[1]

  return messageStr ? ':' + messageStr.substr(0,20) : ':' + message.substr(0,20)
}

const getUrlSuffix = function (url) {
  if (!url) return ''
  url = url.replace(/http:\/\/|https:\/\//, '').split('?')[0].split('/').slice(1).join('/')
  return url ? `:${url}` : ''
}

const getReasonSuffix = function (reason) {
  if (!reason) return ''
  return ':' + reason.toString().substr(0, 20)
}

export {
  assignData,
  getMessageSuffix,
  getUrlSuffix,
  getReasonSuffix
}
