import {PAY_LOADED_SUCCESS, MENU_LOADED_FAIL} from '../actions/types';
const intialState = {
  pay: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case PAY_LOADED_SUCCESS:
      return {...state, pay: action.payload};
    default:
      return state;
  }
};
