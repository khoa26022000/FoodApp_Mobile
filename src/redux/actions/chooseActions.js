import {CHOOSE_LOADED_SUCCESS, CHOOSE_LOADED_FAIL, API_URI} from './types';

import axios from 'axios';

export const getChooseBbyRestaurant = restaurant => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URI}/choose/${restaurant}`);
      if (response.data.success)
        dispatch({type: CHOOSE_LOADED_SUCCESS, payload: response.data.choose});
    } catch (error) {
      dispatch({type: CHOOSE_LOADED_FAIL});
    }
  };
};
