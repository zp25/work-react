# actions

FSA

~~~javascript
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}
~~~

basic

~~~javascript
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
~~~

error

~~~javascript
{
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  },
  meta: {
    text: 'meta data'
  }
}
~~~

meta

## action types

部分规则

+ SET: 添加／更新所有
+ CLEAR: 移除所有
+ ADD: 添加一条
+ UPDATE: 更新一条
+ RM: 移除一条
+ REQ: fetch
+ RES: fetch
+ ERR: fetch
+ TOGGLE: bool切换

示例

~~~javascript
const SET_NAME = 'SET_NAME';

const actionCreator = () => ({
  type: SET_NAME,
  payload: 'user foo',
});

const reducer = (state = '', { type, payload }) => {
  switch(type) {
    case SET_NAME:
      return payload || state;
    case default:
      return state;
  }
};
~~~

示例

## 其他

将actions分为3类

+ 普通action，例如操作全局状态(token, modal等)
+ 表单，文件名以form开头，通常包含操作
  + set，更新/替换整个表单
  + update，通过field区分表单项
  + clear，清除表单
+ 异步，常用于fetch，通常包含操作
  + req发送请求
  + res请求相应
  + err发生错误

fetch通常使用数据结构

~~~javascript
{
  loading: false,
  error: false,
  data: null,
}
~~~

其中data建议只有两种类型

+ PropTypes.instanceOf(Error)
+ 与fetch响应数据相同类型

不建议req时将请求数据存储在data，因为造成类型混乱，且req时请求数据应该可以从别的状态中获取；req时如何更新data依照需求处理，可以初始化，或保留原数据等待res更新

若出现较复杂操作，例如增删改已有数据，可将data单独存储，使用普通action操作，fetch文件以req开头区分普通action，数据结构中的data主要用于记录err

+ [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action "Flux Standard Action")
