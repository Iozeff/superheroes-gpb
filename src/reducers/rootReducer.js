import { combineReducers } from 'redux';
import search from './searchReducer';
import select from './selectReducer'

const rootReducer = combineReducers({
  search,
  select
});

export default rootReducer;
