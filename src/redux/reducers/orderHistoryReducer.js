import {
  ORDER0_LOADED_FAIL,
  ORDER0_LOADED_SUCCESS,
  ORDER1_LOADED_FAIL,
  ORDER1_LOADED_SUCCESS,
  ORDER2_LOADED_FAIL,
  ORDER2_LOADED_SUCCESS,
  ORDER3_LOADED_FAIL,
  ORDER3_LOADED_SUCCESS,
} from '../actions/types';
const intialState = {
  order0: [],
  order1: [],
  order2: [],
  order3: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ORDER0_LOADED_SUCCESS:
      return {...state, order0: action.payload};
    case ORDER1_LOADED_SUCCESS:
      return {...state, order1: action.payload};
    case ORDER2_LOADED_SUCCESS:
      return {...state, order2: action.payload};
    case ORDER3_LOADED_SUCCESS:
      return {...state, order3: action.payload};
    default:
      return state;
  }
};
