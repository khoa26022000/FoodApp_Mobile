import {COMBO_LOADED_SUCCESS, COMBO_LOADED_FAIL} from '../actions/types';
const intialState = {
  combo: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case COMBO_LOADED_SUCCESS:
      return {...state, combo: action.payload};
    default:
      return state;
  }
};
