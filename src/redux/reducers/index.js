import {combineReducers} from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import errorReducer from './errorReducer';
import foodReducer from './foodReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';

export default combineReducers({
  restaurant: restaurantReducer,
  food: foodReducer,
  category: categoryReducer,
  menu: menuReducer,
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
});
