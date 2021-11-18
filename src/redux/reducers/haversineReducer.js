import {
  HAVERSINE_LOADED_SUCCESS,
  HAVERSINE_LOADED_FAIL,
} from '../actions/types';
const intialState = {
  km: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case HAVERSINE_LOADED_SUCCESS:
      return {...state, km: action.payload};
    default:
      return state;
  }
};
