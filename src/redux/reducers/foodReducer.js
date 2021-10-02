import {FOOD_LOADED_SUCCESS, FOOD_LOADED_FAIL} from '../actions/types';
const intialState = {
  food: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FOOD_LOADED_SUCCESS:
      return {...state, food: action.payload};
    default:
      return state;
  }
};
