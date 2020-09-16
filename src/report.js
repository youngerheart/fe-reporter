import axios from 'axios'

export default function (Reporter) {
  const timeout = 1000
  // get cache data

  let switchObj = {}

  let cachedStr = localStorage.getItem('xiaoe-reporter-switch')

  if (cachedStr) {
    try {
      switchObj = JSON.parse(cachedStr)
    } catch (err) {
      switchObj = {}
    }
  }

  const isSwitchOpen = moduleName => {
    return new Promise((reslove, reject) => {
      if (switchObj[moduleName] && Date.now() - switchObj[moduleName] < 120000) return reslove()
      axios.get('/switch', {
        params: {
          module_name: moduleName
        },
        timeout
      }).then(({ data }) => {
        if (data && data.status) {
          switchObj[moduleName] = Date.now()
          localStorage.setItem('xiaoe-reporter-switch', JSON.stringify(switchObj))
          reslove()
        } else reject('switch closed')
      }).catch(reject)
    })
  }

  let index = 0

  // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // axios.defaults.withCredentials = true
  Reporter.send = function (data) {
    let { baseURL, moduleName } = this.config

    axios.defaults.baseURL = baseURL
    if (Array.isArray(data) && !index) {
      isSwitchOpen(moduleName).then(() => {
        index = data.length
        return axios.post('/send', data, { timeout })
      }).then(() => {
        data.splice(0, index)
        this.setStorage(data)
        index = 0
      }).catch(error => {
        console.log('report failed', error)
        this.stop()
      })
    }
  }
}
