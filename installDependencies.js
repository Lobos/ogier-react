const execSync = require('child_process').execSync
const spawn = require('cross-spawn')

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

const install = (dependencies, config) => new Promise((resolve, reject) => {
  const useYarn = shouldUseYarn()

  let command
  let args
  if (useYarn) {
    command = 'yarnpkg'
    args = ['add']
    if (config.dev) args.push('--dev')
    ;([]).push.apply(args, dependencies)
  } else {
    command = 'npm'
    args = [
      'install',
      config.dev ? '--save-dev' : '--save',
      '--save-exact',
      '--loglevel',
      'error',
    ].concat(dependencies)
  }

  if (config.verbose) {
    args.push('--verbose')
  }

  const child = spawn(command, args, { stdio: 'inherit' })
  child.on('close', code => {
    if (code !== 0) {
      reject({
        command: `${command} ${args.join(' ')}`,
      })
      return
    }
    resolve()
  })
})

module.exports = async (config) => {
  console.log('Installing packages. This might take a couple of minutes.')

  let dependencies = ['react', 'react-dom', 'prop-types', 'classnames',
    'react-router-dom', 'redux', 'react-redux', 'redux-thunk']
  let devDependencies = [
    'webpack', 'babel-core', 'babel-loader', 'babel-preset-react-app', 'autoprefixer',
    'css-loader', 'postcss-loader', 'style-loader', 'url-loader', 'file-loader',
    'koa', 'koa-router', 'koa-send', 'http-proxy', 'react-hot-loader', 'webpack-dev-server',
    'webpack-merge', 'swig', 'cross-env', 'babel-plugin-transform-react-remove-prop-types',
    'uglifyjs-webpack-plugin', 'extract-text-webpack-plugin']

  if (config.rctui) {
    dependencies = dependencies.concat(['rctui', 'refetch'])
  }

  if (config.loaders.indexOf('less') >= 0) {
    devDependencies = devDependencies.concat(['less', 'less-loader'])
  }
  if (config.loaders.indexOf('sass') >= 0 || config.rctui) {
    devDependencies = devDependencies.concat(['node-sass', 'sass-loader'])
  }
  if (config.eslint) {
    devDependencies = devDependencies.concat([
      'babel-eslint', 'eslint', 'eslint-config-airbnb', 'eslint-plugin-react',
      'eslint-plugin-jsx-a11y', 'eslint-plugin-import', 'eslint-import-resolver-webpack'
    ])
  }

  await install(dependencies, config)
  await install(devDependencies, { ...config, dev: true })
}