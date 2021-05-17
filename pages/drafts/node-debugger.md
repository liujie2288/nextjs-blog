---
title: "Nodejs 调试指南"
date: "2021-04-29"
---

## debugger 调试器

通过 `inspect` 启动内置的调试客户端，启动后终端会进入一个repl环境，可以用命令参数控制程序运行

```bash
 node inspect server.js
```

## ChromeDevTool 调试

1. 浏览器标签页打开`chrome://insepect`或者`edge://inspect`，点击配置按钮添加IP和端口（这样会被自动发现有调试任务）
2. 打开调试工具，点击nodejs调试图标
3. 访问`127.0.0.1/json/list`，将`devtoolsFrontendUrl`复制并用浏览器打开

```bash
 node --inspect-brk server.js
 node --inspect-brk=[host:port] server.js
```

## VSCode 调试

1. Vscode调试npm scirpts


## 参考链接

- [官方调试指南](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [debugger 调试器](http://nodejs.cn/api/debugger.html#debugger_v8_inspector_integration_for_node_js)
- [阮一峰 Node 调试入门教程](http://www.ruanyifeng.com/blog/2018/03/node-debugger.html)
