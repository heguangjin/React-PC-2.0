var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin'); // 导入在内存中自动生成HTML页面的插件

module.exports = {
  entry: path.join(__dirname, './src/js/Main.js'), // 项目入口
  output: { // 配置项目的输出参数
    path: path.join(__dirname, './dist'), // 输出路径
    filename: 'bundle.js' // 输出文件名
  },
  module: { // 配置所有的第三方 loader 模块
    rules: [ // 所有第三方 loader 的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理样式表的规则
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置babel-loader
      { test: /\.(png|gif|jpg|bmp)$/, use: 'url-loader' }
    ]
  },
  plugins: [ // 配置插件节点
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), // 模板文件路径
      filename: 'index.html' // 指定在内存中生成的页面的名称
    })
  ]
}