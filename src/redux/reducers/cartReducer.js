import {CART_LOADED_SUCCESS, CART_LOADED_FAIL, API_URI} from '../actions/types';
const intialState = {
  foodCart: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case CART_LOADED_SUCCESS:
      return {...state, foodCart: action.payload};
    default:
      return state;
  }
};
