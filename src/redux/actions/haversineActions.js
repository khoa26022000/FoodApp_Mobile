import {
  HAVERSINE_LOADED_SUCCESS,
  HAVERSINE_LOADED_FAIL,
  API_URI,
} from './types';

import axios from 'axios';

export const getKM = (latStart, lngStart, latEnd, lngEnd) => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `${API_URI}/order/haversine?latStart=${latStart}&lngStart=${lngStart}&latEnd=${latEnd}&lngEnd=${lngEnd}`,
      );
      dispatch({
        type: HAVERSINE_LOADED_SUCCESS,
        payload: response.data?.km,
      });
    } catch (error) {
      dispatch({type: HAVERSINE_LOADED_FAIL});
    }
  };
};
