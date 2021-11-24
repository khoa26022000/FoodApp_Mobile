import {
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_CATEGORY_SUCCESS,
  RESTAURANT_HAVERSINE_SUCCESS,
  RESTAURANT_LOADING,
  RESTAURANT_SENDING,
  RESTAURANT_SENT,
  API_URI,
} from '../actions/types';
const intialState = {
  restaurant: [],
  restaurant1: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case RESTAURANT_LOADED_SUCCESS:
      return {...state, restaurant: action.payload};
    case RESTAURANT_CATEGORY_SUCCESS:
      return {...state, restaurant: action.payload};
    case RESTAURANT_HAVERSINE_SUCCESS:
      return {...state, restaurant1: action.payload};
    default:
      return state;
  }
};
