import {CATEGORY_LOADED_SUCCESS, CATEGORY_LOADED_FAIL} from '../actions/types';
const intialState = {
  category: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case CATEGORY_LOADED_SUCCESS:
      return {...state, category: action.payload};
    default:
      return state;
  }
};
