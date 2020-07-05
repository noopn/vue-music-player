var axios = require('axios')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  configureWebpack: {
    devServer: {
      open: false,
      port: 9000, // 自定义修改8080端口
      // proxy: {
      //   '/api/getDiscList': {
      //     target: 'https://c.y.qq.com/',
      //     changeOrigin: true,
      //     host: 'c.y.qq.com',
      //     secure: false
      //   }
      // },
      before (app) {
        app.get('/api/getDiscList', (req, res) => {
          var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
          axios.get(url, {
            headers: {
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            },
            params: req.query
          }).then((response) => {
            res.json(response.data)
          }).catch((e) => {
            console.log(e)
          })
        })
      }
    }
  }
}
