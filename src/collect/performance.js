import { getUrlSuffix } from '../utils'

export default function (Reporter) {
  let { totalJSHeapSize, usedJSHeapSize } = performance.memory

  let { redirectEnd, redirectStart, domainLookupEnd, domainLookupStart, connectEnd, connectStart, responseEnd, responseStart, navigationStart } = performance.timing

  let message = {
    freeMemory: `${parseInt((totalJSHeapSize - usedJSHeapSize) / 1024)}kb`,
    redirect: `${redirectEnd - redirectStart}ms`,
    domain: `${domainLookupEnd - domainLookupStart}ms`,
    tcp: `${connectEnd - connectStart}ms`,
    http: `${responseEnd - responseStart}ms`,
    whiteScreen: `${responseStart - navigationStart}ms`
  }

  let info = {
    href: location.href,
    type: `performance${getUrlSuffix(location.pathname)}`,
    name: 'performance',
    message
  }

  console.warn(info)
  Reporter.pushToStack && Reporter.pushToStack(info)
}
