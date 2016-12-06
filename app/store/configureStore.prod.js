import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const enhancer = applyMiddleware(thunk);

export default initState => createStore(reducer, initState, enhancer);
