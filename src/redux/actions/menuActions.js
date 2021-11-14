import {MENU_LOADED_SUCCESS, MENU_LOADED_FAIL, API_URI} from './types';

import axios from 'axios';

export const getMenuByIdRestaurant = restaurant => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URI}/menu/${restaurant}`);
      if (response.data.success)
        dispatch({type: MENU_LOADED_SUCCESS, payload: response.data?.menu});
    } catch (error) {
      dispatch({type: MENU_LOADED_FAIL});
    }
  };
};
