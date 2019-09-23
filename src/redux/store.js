import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import combineReducers from  './reducers/main.js'
import AppReducers from './reducers/Reducers.js';
const store =  createStore(AppReducers,applyMiddleware(thunk));
export default store;

/*
1dced081-aa2a-427b-b527-63abb29ad9b3
82772d62-38f2-475d-8fea-47746cd0a995
a59b39ab-65f0-4b05-95c2-d4a67135816b
d7a30386-60fb-4903-8ba2-ccf96ce12f1f*/