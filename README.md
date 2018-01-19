# work-react

react起始模版

webpack + redux + react router 4 + react hot loader 4

## 目录
app目录

~~~
+-- actions
+-- assets
+-- components
|   +-- app.jsx
+-- constants
|   +-- actionTypes.js
+-- containers
|   +-- root
|   |   +-- dev.jsx
|   |   +-- index.jsx
|   |   +-- prod.jsx
|   +-- app.jsx
|   +-- devtools.jsx
+-- images
+-- lib
|   +-- createAction.jsx
|   +-- createReducer.jsx
|   +-- index.jsx
+-- reducers
+-- store
+-- styles
+-- index.jsx
~~~
assets目录存放其他资源，使用copy-webpack-plugin复制到dist目录

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
