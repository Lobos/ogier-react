const path = require('path')
const fs = require('fs')
const swig = require('swig')

module.exports = async (args) => new Promise((resolve, reject) => {
  console.log('create config.js')

  const template = swig.compileFile(path.resolve(__dirname, 'templates/tpls/config.js.tpl'))
  const config = template(args)

  fs.writeFile('./config.js', config, (err) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})