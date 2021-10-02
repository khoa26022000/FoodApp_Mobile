import {CATEGORY_LOADED_SUCCESS, CATEGORY_LOADED_FAIL, API_URI} from './types';

import axios from 'axios';

export const getCategory = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URI}/category`);
      if (response.data.success) {
        dispatch({
          type: CATEGORY_LOADED_SUCCESS,
          payload: response.data.category,
        });
      }
    } catch (error) {
      dispatch({type: CATEGORY_LOADED_FAIL});
    }
  };
};
