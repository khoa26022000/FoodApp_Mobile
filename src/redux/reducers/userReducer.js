import {
  USER_LOADED_SUCCESS,
  USER_LOADING,
  USER_LOADED_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';
const intialState = {
  user: [],
  token: '',
  isAuthenticated: false,
  loginSuccess: [],
  loginFail: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case USER_LOADED_SUCCESS:
      return {...state, isAuthenticated: action.payload, user: action.payload};
    case USER_LOADING:
      return {...state, loginSuccess: action.payload};
    case USER_LOADED_FAIL:
      return {...state, loginFail: action.payload};
    case REGISTER_SUCCESS:
      return {...state, token: action.payload};
    default:
      return state;
  }
};
