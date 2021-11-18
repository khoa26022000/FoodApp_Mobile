import {PAY_LOADED_SUCCESS, PAY_LOADED_FAIL, API_URI} from './types';

import axios from 'axios';

export const getPay = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URI}/pay`);
      if (response.data.success)
        dispatch({type: PAY_LOADED_SUCCESS, payload: response.data?.pay});
    } catch (error) {
      dispatch({type: PAY_LOADED_FAIL});
    }
  };
};
