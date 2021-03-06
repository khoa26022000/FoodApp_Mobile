import {
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_CATEGORY_SUCCESS,
  RESTAURANT_HAVERSINE_SUCCESS,
  RESTAURANT_SEARCH_SUCCESS,
  RESTAURANT_DISCOUNT_SUCCESS,
  RESTAURANT_LOADING,
  RESTAURANT_SENDING,
  RESTAURANT_SENT,
  API_URI,
} from '../actions/types';
const intialState = {
  restaurant: [],
  restaurant1: [],
  restaurant2: [],
  restaurantDiscount: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case RESTAURANT_LOADED_SUCCESS:
      return {...state, restaurant: action.payload};
    case RESTAURANT_CATEGORY_SUCCESS:
      return {...state, restaurant: action.payload};
    case RESTAURANT_HAVERSINE_SUCCESS:
      return {...state, restaurant1: action.payload};
    case RESTAURANT_SEARCH_SUCCESS:
      return {...state, restaurant2: action.payload};
    case RESTAURANT_DISCOUNT_SUCCESS:
      return {...state, restaurantDiscount: action.payload};
    default:
      return state;
  }
};
