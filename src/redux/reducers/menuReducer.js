import {MENU_LOADED_SUCCESS, MENU_LOADED_FAIL} from '../actions/types';
const intialState = {
  menu: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case MENU_LOADED_SUCCESS:
      return {...state, menu: action.payload};
    default:
      return state;
  }
};
