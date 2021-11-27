import {
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_LOADED_FAIL,
  RESTAURANT_CATEGORY_SUCCESS,
  RESTAURANT_HAVERSINE_SUCCESS,
  RESTAURANT_SEARCH_SUCCESS,
  RESTAURANT_LOADING,
  RESTAURANT_SENDING,
  RESTAURANT_SENT,
  API_URI,
} from './types';

import axios from 'axios';

export const getRestaurant = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URI}/restaurant`);
      if (response.data.success) {
        dispatch({
          type: RESTAURANT_LOADED_SUCCESS,
          payload: response.data.restaurant,
        });
      }
    } catch (error) {
      dispatch({type: RESTAURANT_LOADED_FAIL});
    }
  };
};

export const getRestaurantCategory = idCategory => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `${API_URI}/restaurant/category/${idCategory}`,
      );
      if (response.data.success) {
        dispatch({
          type: RESTAURANT_CATEGORY_SUCCESS,
          payload: response.data.restaurant,
        });
      }
    } catch (error) {
      dispatch({type: RESTAURANT_LOADED_FAIL});
    }
  };
};

export const getRestaurantHaversine = (lat, lng) => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `${API_URI}/restaurant/haversine?latStart=${lat}&lngStart=${lng}`,
      );
      console.log('data ac', response);
      if (response.data.success) {
        dispatch({
          type: RESTAURANT_HAVERSINE_SUCCESS,
          payload: response.data.restaurant,
        });
      }
    } catch (error) {
      dispatch({type: RESTAURANT_LOADED_FAIL});
    }
  };
};

export const getRestaurantSearch = key => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `${API_URI}/restaurant/search?name=${key}`,
      );
      if (response.data.success) {
        dispatch({
          type: RESTAURANT_SEARCH_SUCCESS,
          payload: response.data.restaurant,
        });
      }
    } catch (error) {
      dispatch({type: RESTAURANT_LOADED_FAIL});
    }
  };
};
