import {COMBO_LOADED_SUCCESS, COMBO_LOADED_FAIL, API_URI} from './types';

import axios from 'axios';

export const getCombo = restaurant => {
  return async dispatch => {
    try {
      //const response = await axios.get(`${API}/food/${restaurant}`);
      const response = await axios.get(`${API_URI}/combo/all`);
      if (response.data.success)
        dispatch({type: COMBO_LOADED_SUCCESS, payload: response.data.combo});
    } catch (error) {
      dispatch({type: COMBO_LOADED_FAIL});
    }
  };
};
