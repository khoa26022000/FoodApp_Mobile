import {FOOD_LOADED_SUCCESS, FOOD_LOADED_FAIL, API_URI} from './types';

import axios from 'axios';

export const getFood = restaurant => {
  return async dispatch => {
    try {
      //const response = await axios.get(`${API}/food/${restaurant}`);
      const response = await axios.get(
        `${API_URI}/food/restaurant/${restaurant}`,
      );
      if (response.data.success)
        dispatch({type: FOOD_LOADED_SUCCESS, payload: response.data.food});
    } catch (error) {
      dispatch({type: FOOD_LOADED_FAIL});
    }
  };
};
