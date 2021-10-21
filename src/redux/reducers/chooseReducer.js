import {CHOOSE_LOADED_SUCCESS} from '../actions/types';
const intialState = {
  choose: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case CHOOSE_LOADED_SUCCESS:
      return {...state, choose: action.payload};
    default:
      return state;
  }
};
