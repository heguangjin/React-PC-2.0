// 项目的JS入口文件
import React from 'react'
import ReactDOM from 'react-dom'


// import { DatePicker } from 'antd'
// 这种方式不推荐，最好使用 webpack 的按需加载
// import 'antd/dist/antd.css'
// 可以使用 babel-plugin-import 来实现组件样式和JS的按需加载

// 在入口中，全局引用一下 es6-promise ，让 IE 浏览器变相的支持 ES6 中的 Promise
require('es6-promise').polyfill();

// 导入应用程序主界面组件
import App from '../components/App.js'

ReactDOM.render(
  <App></App>,
  document.getElementById("app")
);