# error-reporter

Front-end error reporter.

## 使用方法

### 安装
```
// 未发布
$ cnpm install error-reporter

import Reporter from 'error-reporter'
Reporter.init(params)

// 在使用 Vue 的情况下，还需要使用 use 以获取框架内部报错。
Vue.use(Reporter.vueError, Reporter)
// 之后可以在 Vue 组件中通过 this.$reporter 取得 Reporter 对象。
```

### params参数

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| moduleName | 项目标识名 | String | `demo` |
| filter | url匹配该正则或字符串则不上报 | RegExp | `null` |
| delay | 每隔多少毫秒上报缓冲区数据 | Number | `1000` |
| url | 指定上报地址 | String | `http://localhost:8089` |
| sample | 上报比例(0-1) | Number | `1` |
| repeat | 单页重复上报次数，高于此值不上报 | Number | `10` |
| globals| 需要上报的全局变量 | Array | `['APPID', 'USERID']` |
| silent | 不上报错误，手动自定义报错可以正常上报 | Boolean | `false` |
| silentResource | 不上报资源加载错误 | Boolean | `false` |
| silentHttp | 不上报 HTTP 请求错误 | Boolean | `false` |
| slientUnhandledRejection | 不上报 unhandledrejection 错误 | Boolean | `false` |
| slientPerformance | 不上报 performance 信息 | Boolean | `false` |

### 手动自定义报错

`Reporter.notify(name, message, option)`

| 参数 | 说明 | 类型 |
|------|------|------|
| name | 错误名称，如 `TypeError` | String |
| message | 错误信息 | String |
| option | 可选对象，用于发送一些额外信息。为字符串时存于 content 中的 otherMessage 字段。 | Object or String |

## Laravel/Lumen 异常日志中的常用字段

报错信息主要位于 message 字段；系统与浏览器信息位于 agent 字段；页面标题、APPID、USERID（如果有的话）位于 content 字段。

### 报错 js 与请求失败资源的 url

* jsError、xhrError、resourceError 均位于 content 的 url 字段。
* vueError 位于 trace 数组中。


## 开发

```
$ npm run dev
```

* 之后按照运行提示访问本地端口，结合 demo 中暴露的全局 `Reporter` 进行开发。
* 在 demo 中要使用的未定义变量可以写在 `.eslintrc.js` 的 `globals` 中防止 eslint 报错。

[开发文档](./docs/dev.md)

## TODO

- [x] 明确错误类型，各种错误需要上报的数据
- [x] Error 对象的 normalize

### 收集部分
- [x] 全局错误
- [x] setTimeout、setInterval
- [x] ajax异步方法(监听promise，其余的监听XMLHttpRequest事件)
- [x] 关键静态资源错误（window.addEventListener('error')）
- [x] 收集 Vue 报错的 plugin
- [x] 手动报错

### 缓存与上报部分
- [x] 缓存队列
- [x] 合并上报，抽样上报，重复多次后不再上报
- [x] 上报（图片，跨域接口）处理微信浏览器可能的问题
