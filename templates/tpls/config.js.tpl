const request = require('request')
const path = require('path')

module.exports = {
  appName: '{{appName}}',
  dev: {
    // 实际访问的 server 端口
    publishPort: 3000,
    // webpack dev server 的端口
    webpackPort: 3001,
    // dev-server会代理这个路径的文件，其他的文件如果需要配置proxy
    // ** 是版本号，如 1.0.0
    scriptPath: '/{{appName}}/**/*.*',
    // 配置了externals，单独引用react
    scripts: [
      '/react.min.js',
      '/react-dom.min.js',
      '/prop-types.min.js',
    ],
  },
  webpack: {
    entry: {
      app: './src/index.js',
    },
    output: {
      path: path.join(__dirname, '/build'),
      filename: '[name].js',
    },
    alias: { _: path.resolve(__dirname, 'src') },
    devtool: 'cheap-module-source-map',
    externals: { react: 'React', 'react-dom': 'ReactDOM', 'prop-types': 'PropTypes' },
    // extractTextPluginPath 为空时，css文件和js文件打包在一起
    extractTextPluginPath: '{{ extractPath }}',
    {% if cssModule || rctui %}
    cssModule: {
      {% if sass %}sass: '[name]-[local]',{% endif %}
      {% if less %}less: '[name]-[local]',{% endif %}
    },
    {% endif %}
    {% if rctui %}
    //  loader 预处理文件放在这里
    preloader: {
      sass: [
        /*
        {
          loader: 'rctui-theme-loader',
          options: {
            files: ['src/styles/_variables.scss'],
          },
        },
        */
      ],
    },
    {% endif %}
    // image-loader path
    imagePath: './images/[name].[ext]',
  },

  // 代理配置
  proxy: (router) => {
    /* 其他资源文件
    router.get('/*', async (ctx) => {
      console.log(ctx.url)
      const options = {
        hostname: 'ip address',
        uri: `http://${ctx.request.host}${ctx.url}`,
        mothed: 'GET',
        headers: ctx.request.headers,
      }
      const response = request(options)
      ctx.body = response
    })
    */
  },
}
