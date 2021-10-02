import {
  RESTAURANT_LOADED_SUCCESS,
  RESTAURANT_LOADED_FAIL,
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
