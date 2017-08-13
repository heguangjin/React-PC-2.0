import React from 'react'

// 当展示 MovieList 组件的时候，要确保一下几点：
//  1. 需要知道，要展示哪种类型的电影数据
//  2. 要展示第几页的数据
//  3. 要能够得到，路由连接被修改了【切换了】，要知道用户进行了不同连接的切换，进行不同数据的展示

// 导入 AntDesign 组件
import { Spin, Alert, Pagination } from 'antd';

// 导入第三方模块，来实现 Fetch 请求 JSONP 的数据
import FetchJsonp from 'fetch-jsonp'
// 导入电影box组件
import MovieBox from './MovieBox.js'


export default class MovieList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      type: props.match.params.type, // 要展示的电影类型
      nowPage: props.match.params.page, // 当前显示的页码值
      totalCount: 0, // 总记录条数
      pageSize: 12, // 每页显示的记录条数
      movies: [], // 当前页中的所有电影数据
      isLoading: true // 默认展示loading效果
    }
  }

  // 组件将要挂载的事件
  componentWillMount() {
    // 当组件将要被挂载的时候,立即发送一个 Ajax 的数据请求
    // var url = `https://api.douban.com/v2/movie/${this.state.type}?start=${(this.state.nowPage - 1) * this.state.pageSize}&count=${this.state.pageSize}`;
    // 用什么来发起Ajax请求???  之前使用 Jquery 发送Ajax请求,在Jquery中,主要是用来进行DOM操作
    // fetch API ES6中新推出来的一个进行Ajax请求的API,相比与传统的 XHR 对象,使用更加方便;

    // 在浏览器中，存在跨域限制，在原生的 fetch API 中,目前不支持 JSONP 跨域数据请求
    /* fetch(url)
      .then(response => { return response.json(); }) // 第一次调用.then得到的是 一个 Response 类型的对象,这个对象,并不是最终的数据,所以我们需要调用 response.json();调用之后,会返回一个新的Promise对象,这个Promise对象中,存着 转换为 JSON 格式的最终数据
      .then(result => {
        console.log(result);
      }); */

    /* FetchJsonp(url)
      .then(res => res.json())
      .then(results => {
        console.log(results);
        // 当电影数据获取OK之后，重新设置一下 state， 主要 状态一被改变，必然会重新调用 render 函数
        this.setState({
          isLoading: false,
          movies: results.subjects
        });
      }); */
    this.loadMovieListByTypeAndPage();
  }

  // 根据电影类型和页码加载电影数据
  loadMovieListByTypeAndPage() {
    var url = `https://api.douban.com/v2/movie/${this.state.type}?start=${(this.state.nowPage - 1) * this.state.pageSize}&count=${this.state.pageSize}`;

    FetchJsonp(url)
      .then(res => res.json())
      .then(results => {
        console.log(results);
        // 当电影数据获取OK之后，重新设置一下 state， 主要 状态一被改变，必然会重新调用 render 函数
        this.setState({
          isLoading: false,
          movies: results.subjects,
          totalCount: results.total
        });
      });
  }

  render() {
    // 在发Ajax请求的时候，需要展示 loading 效果，当数据请求完毕之后，需要移除loading效果，同时展示电影列表数据和分页；
    return <div>
      {this.createMovieList()}
    </div>
  }

  // 渲染电影列表
  createMovieList = () => {
    // 当 Ajax 数据请求完毕之后,需要把 this.state 上的 isloading 设置为 false
    // 根据组件的生命周期,每当状态或者属性被改变的时候,都会重新触发 render 函数的渲染;
    if (this.state.isLoading) { // 代表正在显示loading效果
      return <Spin tip="Loading...">
        <Alert
          message="正在请求电影列表..."
          description="请耐心等待..."
          type="info"
        />
      </Spin>
    } else {
      return <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.movies.map((item, i) => {
            return <MovieBox {...item} key={i} history={this.props.history}></MovieBox>
          })}
        </div>

        {/* 分页功能 */}
        <Pagination
          defaultCurrent={parseInt(this.state.nowPage)}
          defaultPageSize={this.state.pageSize}
          total={this.state.totalCount}
          onChange={this.changePage} />
      </div>
    }
  }

  // 组件将要接收新属性的事件
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // 监听 props 属性的改变，每当 点击页签进行数据切换的时候，都会 把 最新的 电影类型和 页码 通过 props 传递过来，这样，我们可以把 最新的 类型 和 页码值，重新保存到 this.state 中；
    // 当 state 改变之后，需要重新 发起 JSONP 的数据请求，这时候，还需要把 isLoading 改为 true，表示又在加载数据；
    this.setState({ // 注意：this.setState是异步的
      type: nextProps.match.params.type, // 要展示的电影类型
      nowPage: nextProps.match.params.page, // 当前显示的页码值
      movies: [], // 当前页中的所有电影数据
      isLoading: true // 默认展示loading效果
    }, () => {
      // 立即重新请求数据：【注意：调用的时机很重要】
      this.loadMovieListByTypeAndPage();
    });
    // 如果在 setState 之后，需要立即做某件事情，同时，这件事情是依赖于 之前的 setState 的，此时，需要把 这件事情写到 this.setState 的第二个参数，也就是回调函数中去

    // this.setState({}, function(){})
  }

  // 当点击页码的时候，触发这个事件，然后加载 对应页码的数据
  changePage = (page) => {
    // console.log(this.props);
    // console.log(page);
    // 在 React 的 react-router-dom 中，通过 this.props.history.push 来实现编程式导航路由跳转
    this.props.history.push(`/movie/${this.state.type}/${page}`);
  }
}