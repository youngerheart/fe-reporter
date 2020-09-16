const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const router = new Router()

router.get('/switch', (ctx) => {
  ctx.body = {
    status: true
  }
})

router.post('/send', (ctx) => {
  ctx.body = 'ok'
})

app.use(async (ctx, next) => {
  let startTime = Date.now()
  await next()
  // 设置跨域头
  ctx.type = 'json'
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  // 处理OPTIONS请求
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Headers', 'content-type')
    ctx.set('Access-Control-Allow-Methods', 'GET,POST')
    ctx.status = 204
  }
  console.log(ctx.method, ctx.url, `${Date.now() - startTime}ms`)
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8089, () => {
  console.info('server started at port 8089')
})
