import {
  LISTCHOOSE_LOADED_SUCCESS,
  LISTCHOOSE_LOADED_FAIL,
  API_URI,
} from './types';

import axios from 'axios';

export const getListChoose = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URI}/listChoose`);
      if (response.data.success)
        dispatch({
          type: LISTCHOOSE_LOADED_SUCCESS,
          payload: response.data.listChoose,
        });
    } catch (error) {
      dispatch({type: LISTCHOOSE_LOADED_FAIL});
    }
  };
};
