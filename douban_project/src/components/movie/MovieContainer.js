import React from 'react'

// 导入 AntDesign 组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 导入路由组件
import { Link, Route, Switch } from 'react-router-dom'
// 导入电影列表组件
import MovieList from './MovieList.js'
// 导入电影详情组件
import MovieDetail from './MovieDetail.js'

export default class MovieContainer extends React.Component {

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return <Layout style={{ height: '100%' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[this.props.location.pathname.split('/')[2]]}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
          <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
          <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ paddingLeft: '1px' }}>
        <Content style={{ background: '#fff', padding: 4, margin: 0, minHeight: 280 }}>
          {/* 在 Route中， : 表示此处不匹配具体的URL地址，而是将匹配到的内容，作为路由的一个参数 */}
          {/* /movie/detail/25823277 */}
          {/* /movie/in_theaters/1 */}
          {/* Switch的作用，好比JS中的switch，如果第一个规则能够成功匹配，则后续规则不在进行匹配，在 Switch 中，一定要把最特殊的规则，往前提 */}
          <Switch>
            <Route path="/movie/detail/:id" component={MovieDetail}></Route>
            <Route path="/movie/:type/:page" component={MovieList}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  }
}