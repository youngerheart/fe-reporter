import { getUrlSuffix } from '../utils'

const xhrError = function (Reporter) {
  let xhrProto = window.XMLHttpRequest.prototype

  let originOpen = xhrProto.open

  xhrProto.open = function (methods, url) {
    this._requestUrl = url
    return originOpen.apply(this, arguments)
  }

  var oldXHR = window.XMLHttpRequest

  function newXHR () {
    var realXHR = new oldXHR()

    // realXHR.addEventListener('abort', function () {
    // }, false)
    realXHR.addEventListener('error', function (error) {
      let url = error.target._requestUrl

      let { status } = error.target

      let xhrError = {
        type: `xhrError${getUrlSuffix(url)}`,
        name: error.type,
        status,
        href: location.href,
        url
      }

      Reporter.pushToStack && Reporter.pushToStack(xhrError)
    }, false)
    realXHR.addEventListener('load', function (error) {
      let { status } = error.target

      if(status === 404) {
        let url = error.target._requestUrl

        let xhrError = {
          type: `xhrNotFoundError${getUrlSuffix(url)}`,
          name: error.type,
          status,
          href: location.href,
          url
        }

        Reporter.pushToStack && Reporter.pushToStack(xhrError)
      }
    }, false)
    // realXHR.addEventListener('timeout', function () {
    // }, false)
    // realXHR.addEventListener('readystatechange', function () {
    // }, false)
    return realXHR
  }
  window.XMLHttpRequest = newXHR
}

export default xhrError
