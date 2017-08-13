// 表示应用程序的主界面
import React from 'react'

// 导入 AntDesign 相关的布局组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

// 导入 react-router-dom 这个路由模块
// HashRouter : 是路由的根容器，所有路由相关的组件，比如 Route 和 Link 都需要包裹在 HashRouter；同时 HashRouter 必须作为 【唯一的根元素来使用】，也就说：整个网站中，【有且只能有一个】 HashRouter；
// Link : 表示是一个路由的链接，可以把它想象成 是一个a href链接； Link 通过 to 属性规定要跳转到的组件；
// Route ： 表示是一个路由匹配规则，当匹配到某个Route规则之后，就会加载这个 Route 规则中指定的 组件； 注意，在 Route 中，有两个关键的属性：
//  1. path :表示当前的路由规则，可以匹配哪个地址；
//  2. component ：表示通过 path 属性匹配到的地址，对应要展示哪个 组件页面
//  3. exact : 表示启用精确匹配
//  4. Route，即能表示 一个路由匹配规则， 同时，又能作为 占位符 来使用；
import { HashRouter, Route, Link } from 'react-router-dom'

// 导入HomeContainer组件
import HomeContainer from './home/HomeContainer.js'
// 导入MovieContainer组件
import MovieContainer from './movie/MovieContainer.js'
// 导入AboutContainer组件
import AboutContainer from './about/AboutContainer.js'

// 导入App自己的样式表
import '../css/app.css'

// 可以在 App 组件中，实现首页的上、中、下布局
export default class App extends React.Component {

  componentWillMount() {
    console.log(location);
  }

  render() {
    return <HashRouter>
      <Layout className="layout" style={{ height: '100%' }}>
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[ '/'+location.hash.split('/')[1] ]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="/movie"><Link to="/movie/in_theaters/1">电影</Link></Menu.Item>
            <Menu.Item key="/about"><Link to="/about">关于</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ backgroundColor: '#fff', flex: '1' }}>
          {/* 注意：下面的 Route 既是一个路由匹配规则，又是一个占位符 */}
          {/* 注意：在进行路由匹配的时候，是模糊匹配的，会导致一些问题，为了启用精确匹配，可以为 Route 指定一个新的属性，叫做 exact */}
          <Route path="/" exact component={HomeContainer}></Route>
          <Route path="/movie" component={MovieContainer}></Route>
          <Route path="/about" component={AboutContainer}></Route>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          React-何广进个人练习 ©2017 Created by Itcast
    </Footer>
      </Layout>
    </HashRouter>
  }
}