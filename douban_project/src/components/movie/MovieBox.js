import React from 'react'

import '../../css/moviebox.css'

// 导入 AntDesign 组件
import { Rate } from 'antd';

export default class MovieBox extends React.Component {
  render() {
    return <div className="moviebox" onClick={() => { this.goDetail(this.props.id) }}>
      <img src={this.props.images.medium} style={{ width: 100, height: 140 }} />
      <p><strong>名称：</strong>{this.props.title}</p>
      <p><strong>上映年份：</strong>{this.props.year}</p>
      <p><strong>电影类型：</strong>{this.props.genres.join(', ')}</p>
      <div>
        <Rate disabled allowHalf defaultValue={this.props.rating.average / 2} />
      </div>
    </div>
  }

  // 跳转到详细页面
  goDetail = (id) => {
    console.log(this.props);
    // 拿到当前点击这一项的id之后，需要通过 编程式导航，跳转到 电影详细页面；
    // 通过调用 父组件 MovieList 传递过来的 history.push 方法，跳转到 电影详细页面
    this.props.history.push('/movie/detail/' + id);
  }
}