import {createStore,applyMiddleware} from 'redux';
import countReduces from './reducer';
import thunk from 'redux-thunk'
const store = createStore(countReduces,applyMiddleware(thunk))

export default store