import {combineReducers} from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import errorReducer from './errorReducer';
import foodReducer from './foodReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import comboReducer from './comboReducer';
import listChooseReducer from './listChooseReducer';
import cartReducer from './cartReducer';
import payReducer from './payReducer';
import haversineReducer from './haversineReducer';
import orderHistoryReducer from './orderHistoryReducer';

export default combineReducers({
  restaurant: restaurantReducer,
  food: foodReducer,
  category: categoryReducer,
  menu: menuReducer,
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
  combo: comboReducer,
  listChoose: listChooseReducer,
  foodCart: cartReducer,
  pay: payReducer,
  km: haversineReducer,
  order: orderHistoryReducer,
});
