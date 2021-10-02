import {
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_LOADING,
  RESTAURANT_SENDING,
  RESTAURANT_SENT,
  API_URI,
} from '../actions/types';
const intialState = {
  restaurant: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case RESTAURANT_LOADED_SUCCESS:
      return {...state, restaurant: action.payload};
    default:
      return state;
  }
};
