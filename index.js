#!/usr/bin/env node

const path = require('path')
const inquirer = require('inquirer')
const createPkg = require('./createPkg')
const createConfig = require('./createConfig')
const copyFile = require('./copyFile')
const installDependencies = require('./installDependencies')

const basename = path.basename(process.cwd())

const questions = [
  {
    type: 'input',
    name: 'appName',
    message: 'App Name: ',
    default: basename,
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version: ',
    default: '1.0.0',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description: '
  },
  {
    type: 'checkbox',
    name: 'loaders',
    message: 'Loaders: ',
    choices: ['sass', 'less'],
    default: ['sass']
  },
  {
    type: 'input',
    name: 'extractPath',
    message: 'ExtractTextPlugin path: '
  },
  {
    type: 'checkbox',
    name: 'options',
    message: 'Options: ',
    choices: [
      { name: 'Use rctui', value: 'rctui' },
      { name: 'Use css module', value: 'cssModule' },
      { name: 'Use eslint', value: 'eslint' },
      { name: 'Use taobao registry', value: 'taobao' },
    ],
    default: ['eslint', 'taobao']
  }
]

inquirer.prompt(questions).then(async (config) => {
  ;['cssModule', 'rctui', 'eslint', 'taobao'].forEach(key => {
    config[key] = config.options.indexOf(key) >= 0
  })
  ;['sass', 'less'].forEach(key => {
    config[key] = config.loaders.indexOf(key) >= 0
  })

  if (!config.sass && !config.less) config.cssModule = false

  if (config.rctui) {
    config.cssModule = true
    config.sass = true
  }

  await createConfig(config)
  await createPkg(config)
  await createConfig(config)
  copyFile(config)
  await installDependencies(config)
  console.log('✨ Success.')
})