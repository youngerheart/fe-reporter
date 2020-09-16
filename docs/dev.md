# 开发文档

借鉴于 [fundebug](https://docs.fundebug.com) 以及 [badjs](https://github.com/BetterJS/badjs-report)

## 错误数据

### 错误类型后缀

* JavaScript 执行错误: `${错误信息 message 的前 20 个字符(行数,列数)}`
* Vue 与手动自定义报错: `${错误信息 message 的前 20 个字符}`
* 资源加载与 HTTP 请求错误: `${url.pathname}`
* unhandledrejection 错误: `${reason 字段转字符串后的前 20 个字符}`

### 公共数据

*配合后端接口格式进行数据的整理*

| 参数 | 说明 | 类型 |
|------|------|------|
| type | 错误类型:url `jsError...`, `notify...`, `resourceError...`, `unhandledRejection...`, `vueError...`, `xhrError...` | String |
| log_level | 报错等级:`debug`、`info`、`warning`、`error`等 | String |
| module_name | 当前项目名 | String |
| message | error.message | String |
| begin_time | 当前时间戳 | Number |
| trace | 相当于 js 的 stack.split('\n') | Array |
| content | 需要额外获取的数据 | JSONString |

**content中的共有部分**

| 参数 | 说明 | 类型 |
|------|------|------|
| title | 页面标题 | String |
| lineNumber | 报错行数 | Number |
| columnNumber | 报错列数 | Number |

### JavaScript执行错误

```
aler("hello") // alert 被写成了 aler
// 需要额外获取到：
{
  "name": "ReferenceError",
  "message": "Uncaught ReferenceError: aler is not defined",
  "fileName": "http://localhost:4000/test.js",
  "lineNumber": 1,
  "columnNumber": 1
}
```

### 资源加载错误

```
<img src="test.jpg"> // 并不存在该图片，返回了404
// 需要额外获取到：
{
  "title":"test page",
  "url":"http://0.0.0.0:8080/abc.js",
  "name":"error"
}
```

**silentResource**

如果你不需要监控资源加载错误，则可以将silentResource属性设为true。

### HTTP 请求错误

```
// 登陆账户时密码错误，因此会报403错误。
var xhr = new XMLHttpRequest()
xhr.open("POST", "https://api.domain.com/login")
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(JSON.stringify({
    email: "help@domain.com",
    password: "akhakfnak"
}))

// 需要额外获取到：
{
  "name": "load",
  "url": "/api/getData"
}
```

**silentHttp**

如果你不需要监控HTTP请求错误，则可以将silentHttp属性设为true。

### unhandledrejection

```
Promise.reject("hello") // 该 reject 未被 catch。

// 需要额外获取到
{
  "message": "hello"
}
```
**slientUnhandledRejection**

如果你不需要监控unhandledrejection错误，则可以将slientUnhandledRejection属性设为true。
