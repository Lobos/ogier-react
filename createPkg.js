const fs = require('fs')

const json = {
  main: './src/index.js',
  author: '',
  scripts: {
    start: 'cross-env NODE_ENV=development node dev-server.js',
    build: 'cross-env NODE_ENV=production webpack --config webpack/config.prod.js'
  }
}

module.exports = async ({ appName, version, description }) =>
  new Promise((resolve, reject) => {
    console.log('create package.json')

    const package = Object.assign({}, {
      name: appName,
      version,
      description
    }, json)

    const str = JSON.stringify(package, null, 2)

    fs.writeFile('./package.json', str, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })