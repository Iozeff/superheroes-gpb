import initialState from './initialState';
import { SEARCH } from '../actions/actionTypes';

export default function search(state = initialState.search, action) {
  let newState;
  switch (action.type) {
    case SEARCH:
      newState = action.result;
            
      return newState ? newState : null;
    default:
      return state ? state : null;
  }
}
