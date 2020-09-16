if (!window.Promise) require('babel-polyfill')
import handleJSError from './collect/jsError'
import handlResourceError from './collect/resourceError'
import handleXhrError from './collect/xhrError'
import handleUnhandledRejection from './collect/unhandledRejection'
import handleNotify from './collect/notify'
import handleVueError from './collect/vueError'
import handlePerformance from './collect/performance'

import handleCache from './cache'
import handleReport from './report'

const Reporter = {
  info: {},
  config: {}
}

Reporter.init = function (config) {
  this.config = {
    moduleName: 'demo',
    filter: null,
    delay: 1000,
    baseURL: 'http://localhost:8089',
    sample: 1,
    repeat: 10,
    globals: [ 'APPID', 'USERID' ],
    silent: false,
    silentResource: false,
    silentHttp: false,
    slientUnhandledRejection: false,
    ...config
  }

  handleCache(Reporter)
  handleReport(Reporter)

  if (!this.config.silent) {
    if (!this.config.silentResource) handlResourceError(Reporter)
    if (!this.config.silentHttp) handleXhrError(Reporter)
    if (!this.config.slientUnhandledRejection) handleUnhandledRejection(Reporter)
    if (!this.config.slientPerformance) handlePerformance(Reporter)
    handleJSError(Reporter)
  }

  handleNotify(Reporter)
  handleVueError(Reporter)

  this.run()
}

export default Reporter
