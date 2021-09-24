import {
  GET_CATEGORY,
  GET_RESTAURANT,
  GET_FOOD,
  GET_MENU,
  LOCAL_STORAGE_TOKEN_NAME,
  SET_AUTH,
} from '../actions/actions';

const initialState = {
  category: [],
  restaurant: [],
  food: [],
  menu: [],
  user: [],
  phoneNumber: '',
  password: '',
  accessToken: '',
  isAuthenticated: true,
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {...state, category: action.payload};
    case GET_RESTAURANT:
      return {...state, restaurant: action.payload};
    case GET_FOOD:
      return {...state, food: action.payload};
    case GET_MENU:
      return {...state, menu: action.payload};
    case SET_AUTH:
      return {...state, isAuthenticated: action.payload, user: action.payload};
    default:
      return state;
  }
}

export default categoryReducer;
