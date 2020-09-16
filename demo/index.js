import Reporter from '../src'
import Vue from 'vue'
import axios from 'axios'

{
  // 设置需要上报的全局变量
  window.USERID = 'cxk'
  window.APPID = 'chickenYouAreBeautiful'

  Reporter.init({
  })
  window.Reporter = Reporter
  // 异步错误
  setTimeout(() => {
    setTimeoutError
  }, 1000)
  let i = 0

  let interval = setInterval(() => {
    if (i > 2) clearInterval(interval)
    else {
      i++
      setIntervalError
    }
  }, 1000)

  // 事件错误

  window.onload = () => {
    onloadError
  }

  Vue.use(Reporter.vueError, Reporter)
  new Vue({
    el: '#box',
    data: {
      a: 1
    },
    mounted: function () {
      // 确认已经安装于this
      console.log('Vue: this.$reporter', this.$reporter)
      // 发送手动报错
      this.$reporter.notify("Vue notify", "this is Vue notify error", "other info")
      console.log(this.a, 'vueError', this.b.run)
    }
  })
  // promise报错
  new Promise((resolve, reject) => {
    reject(1)
  }).then(res => {
    console.log('promise error', res)
  })
  // 手动报错
  Reporter.notify('name', 'message', 'option')
  // 6秒后手动关闭
  setTimeout(() => {
    Reporter.stop()
  }, 6000)

  // 静态资源报错
  let script = document.createElement('script')
  script.setAttribute('src', 'abc.js')
  document.querySelector('body').appendChild(script)
  let css = document.createElement('link')
  css.setAttribute('href', 'abc.css')
  css.setAttribute('rel', 'stylesheet')
  css.setAttribute('type', 'text/css')
  document.querySelector('body').appendChild(css)

  // xhr报错
  let xhr = new XMLHttpRequest()
  xhr.open('get', 'http://www.baidu.com')
  xhr.send()
  xhr.onreadystatechange = (res) => {
    // console.log(res, res._requestUrl, '_requestUrl')
    if(res.readyState === 4 && res.status === 200){
      // console.log(res, 'XMLHttpRequest')
    }else {
      // console.log(res, 'XMLHttpRequestError')
    }
  }

  axios.get('/api/getData')

  // 同步错误
  syncError
}
