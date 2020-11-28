const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, './dist')))
app.use('/boss', createProxyMiddleware({ 
  target: 'http://eduboss.lagou.com',
  changeOrigin: true 
}))
app.use('/front', createProxyMiddleware({ 
  target: 'http://edufront.lagou.com',
  changeOrigin: true 
}))

app.listen(3000, () => {
  console.log('server is runing!')
})
