import { getUrlSuffix } from '../utils'

export default function (Reporter) {
  window.addEventListener(
    'error',
    error => {
      let { tagName, src, href, outerHTML} = error.target

      let url = src || href

      if(tagName && [ 'script', 'link' ].indexOf(tagName.toLowerCase()) > -1) {
        let resourceError = {
          url,
          href: location.href,
          type: `resourceError${getUrlSuffix(url)}`,
          name: error.type,
          message: outerHTML
        }

        Reporter.pushToStack && Reporter.pushToStack(resourceError)
      }
    },
    true
  )
}
