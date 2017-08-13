import React from 'react'

// 导入 AntDesign 的组件
import { Button, Radio, Icon, Spin, Alert } from 'antd';

// 导入 第三方的 fetch-jsonp 模块
import FetchJsonp from 'fetch-jsonp'

export default class MovieDetail extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true, // 表示正在加载数据
      movieInfo: {} // 电影信息
    }
  }

  // 在组件将要加载的时候，调用一下获取详情的方法
  componentWillMount() {
    this.getMovieInfo();
  }

  // 获取电影数据的方法
  getMovieInfo = () => {
    var url = `https://api.douban.com/v2/movie/subject/${this.props.match.params.id}`;
    // 获取 电影数据
    FetchJsonp(url)
      .then(res => { return res.json() })
      .then(data => {
        this.setState({
          isLoading: false,
          movieInfo: data
        });
      })
  }

  render() {
    return <div>
      <Button type="primary" onClick={this.goback}>
        <Icon type="left" />返回电影列表页面
      </Button>
      {this.createMovieInfo()}
    </div>
  }

  // 渲染电影详细的方法
  createMovieInfo = () => {
    if (this.state.isLoading) {
      return <Spin tip="Loading...">
        <Alert
          message="正在请求电影列表..."
          description="请耐心等待..."
          type="info"
        />
      </Spin>
    } else {
      return <div>
        <h1 style={{ textAlign: 'center' }}>{this.state.movieInfo.title}</h1>
        <div style={{ textAlign: 'center' }}>
          <img src={this.state.movieInfo.images.large} alt="" />
        </div>
        <p>{this.state.movieInfo.summary}</p>
      </div>
    }
  }

  // 点击按钮后退到上一次的页面
  goback = () => {
    this.props.history.go(-1);
  }
}