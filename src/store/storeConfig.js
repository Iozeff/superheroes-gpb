import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
// import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk'

export default function storeConfig() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
  );
}
