import initialState from './initialState';
import { SELECT, REMOVE } from '../actions/actionTypes';

export default function search(state = initialState.select, action) {
  let newState;
  switch (action.type) {
    case SELECT:
      newState = state.concat(action.selected);
      return newState;
    case REMOVE:
      let removeItemId
      state.forEach((item, i) => {
        if (item.image === action.removed.image) {
          removeItemId = i
        }
      })
      let beforeItem = Object.values(state).map(item => item).slice(0, removeItemId)
      let afterItem = Object.values(state).map(item => item).slice(removeItemId + 1)
      state = beforeItem.concat(afterItem)
      return newState = state;
    default:
      return state;
  }
}
