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

+ [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action "Flux Standard Action")
