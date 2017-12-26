自用的react脚手架。虽然有create-react-app和parcel，但是项目中往往有很多需要自己配置的地方，所以造个轮子。

## Quick Overview
```
npm install -g ogier-react
mkdir my-app
cd my-app
ogier-react
npm start 或 yarn start
```
执行 ogier-react，可选参数
|App Name|项目名称，默认值为当前文件夹名称|
|Version|版本号，默认值为 "1.0.0"|
|Description|项目描述|
|Loaders|可选值 "sass", "less"，可以同时选中或都不选|
|ExtractTextPlugin path|默认为空，css打包在js文件中；如果填写地址，会配置ExtractTextPlugin插件，提取css到指定文件地址|
|Options|其他选项，注意如果选中rctui，则无论是否选中css module，都会使用css module|

执行完成后会在项目根目录创建一个Config.js文件，大部分dev server配置和webpack配置修改这个文件即可。

## Feature
- webpack babel 配置
- css 配置，包含sass和less，CSS Module 配置
- eslint 配置
- react-router, redux
- 一个简单demo，包含 redux 和 react-router
- 代理服务器
