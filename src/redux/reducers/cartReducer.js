import {
  CART_LOADED_SUCCESS,
  CART_LOADED_FAIL,
  API_URI,
  ORDER_LOADED_SUCCESS,
  ORDER_LOADED_FAIL,
} from '../actions/types';
const intialState = {
  foodCart: [],
  isSuccess: false,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case CART_LOADED_SUCCESS:
      return {...state, foodCart: action.payload};
    case CART_LOADED_SUCCESS:
      return {...state, isSuccess: action.isSuccess};
    case ORDER_LOADED_FAIL:
      return {...state, isSuccess: action.isSuccess};
    default:
      return state;
  }
};
