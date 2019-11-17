# work-react

react起始模版

webpack@4 + redux + react-router@5 + react-hot-loader@4

## 目录

app目录

    +-- actions
    +-- components
    +-- containers
    |   +-- devtools
    |   +-- root
    |   |   +-- dev.jsx
    |   |   +-- index.jsx
    |   |   +-- prod.jsx
    |   +-- app.js
    +-- images
    +-- pages
    |   +-- app.jsx
    |   +-- app.scss
    +-- reducers
    +-- sagas
    +-- store
    +-- apis.js
    +-- index.jsx
    +-- routes.js

public目录存放html模板(handlebars)和不需要经模块系统处理的资源(使用copy-webpack-plugin复制到dist目录)

## env

.env文件配置

~~~
# devserver
HOST=localhost
PORT=8080

# html文件名
INDEX=index.html
~~~

serve配置在serve.json

## libpng issues

image-webpack-loader依赖libpng，缺少会报错，<https://github.com/tcoopman/image-webpack-loader/issues/142>

~~~bash
# osx
brew install libpng

# ubuntu
sudo apt-get install libpng16-dev
~~~

安装依赖

## 资源

+ [Webpack Configuration](https://webpack.js.org/configuration/ "Webpack Configuration")
+ [webpack releases page](https://github.com/webpack/webpack/releases "webpack releases page")
+ [React Hot Loader](https://github.com/gaearon/react-hot-loader/tree/next "React Hot Loader")
+ [Starter Kits](https://github.com/gaearon/react-hot-loader/tree/master/docs#starter-kits "Starter Kits")
+ [React Router](https://github.com/ReactTraining/react-router "React Router")
+ [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux "react-router-redux")
+ [Redux DevTools](https://github.com/gaearon/redux-devtools "Redux DevTools")
  + [Redux DevTools Dock Monitor](https://github.com/gaearon/redux-devtools-dock-monitor "Redux DevTools Dock Monitor")
  + [Redux DevTools Log Monitor](https://github.com/gaearon/redux-devtools-log-monitor "Redux DevTools Log Monitor")
  + [Walkthrough](https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md "Walkthrough")
+ [Building for Production](https://webpack.js.org/guides/production-build/ "Building for Production")
+ [Caching](https://webpack.js.org/guides/caching/ "Caching")
+ [Analysing and minimising the size of client side bundle with webpack and source-map-explorer](https://medium.com/@nimgrg/analysing-and-minimising-the-size-of-client-side-bundle-with-webpack-and-source-map-explorer-41096559beca "Analysing and minimising the size of client side bundle with webpack and source-map-explorer")
+ [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin "HTML Webpack Plugin")
+ [webpack 4: released today!!](https://medium.com/webpack/webpack-4-released-today-6cdb994702d4 "webpack 4: released today!!")
+ [redux-immutable-state-invariant](https://github.com/leoasis/redux-immutable-state-invariant "redux-immutable-state-invariant")
