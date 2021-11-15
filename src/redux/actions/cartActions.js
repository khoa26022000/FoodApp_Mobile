import {CART_LOADED_SUCCESS, CART_LOADED_FAIL, API_URI} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAccessCart,
  setAccessCart,
  deleteAccessCart,
} from '../../utils/asyncStore';

export const loadFoodToCart = () => {
  return async dispatch => {
    try {
      //   const cartLocal = getAccessCart();
      const cartLocal1 = await AsyncStorage.getItem('cart');
      const cartLocal = JSON.parse(cartLocal1);
      dispatch({type: CART_LOADED_SUCCESS, payload: cartLocal});
    } catch (error) {
      console.log('lỗi');
      dispatch({
        type: CART_LOADED_FAIL,
      });
    }
  };
};

export const addFoodToCart = state => {
  return async dispatch => {
    try {
      //   const cartLocal = getAccessCart();
      console.log('state', state.listChoose);
      const cartLocal1 = await AsyncStorage.getItem('cart');
      const cartLocal = JSON.parse(cartLocal1);
      console.log('store', cartLocal);
      const cart =
        cartLocal === null ? {foods: [], number: 0, total: 0} : cartLocal;
      const index = cart.foods.findIndex(x => x.food._id === state._id);
      const priceInListChoose =
        state?.listChoose?.reduce((total, cur) => total + cur.price, 0) || 0;
      console.log('gia choose', priceInListChoose);
      if (index === -1) {
        cart.foods.push({
          food: state,
          priceChoose: priceInListChoose,
          number: 1,
        });
        cart.number++;
        cart.total += state.lastPrice + priceInListChoose;
      } else {
        cart.foods[index].number++;
        cart.total += state.lastPrice + priceInListChoose;
      }
      console.log('cart', cart);
      setAccessCart(cart);
      dispatch({type: CART_LOADED_SUCCESS, payload: cart});
    } catch (error) {
      console.log('lỗi');
      dispatch({
        type: CART_LOADED_FAIL,
      });
    }
  };
};

export const removeFoodToCart = state => {
  return async dispatch => {
    try {
      //   const cartLocal = getAccessCart();
      const cartLocal1 = await AsyncStorage.getItem('cart');
      const cartLocal = JSON.parse(cartLocal1);
      console.log('store', cartLocal);
      const cart =
        cartLocal === null ? {foods: [], number: 0, total: 0} : cartLocal;
      const index = cart.foods.findIndex(x => x.food._id === state._id);
      if (index === -1) {
        // cart.foods.push({
        //   food: state,
        //   number: 1,
        // });
        cart.number--;
        cart.total += state.lastPrice;
      } else {
        cart.foods[index].number--;
        cart.total += state.lastPrice;
      }
      console.log('cart', cart);
      setAccessCart(cart);
      dispatch({type: CART_LOADED_SUCCESS, payload: cart});
    } catch (error) {
      console.log('lỗi');
      dispatch({
        type: CART_LOADED_FAIL,
      });
    }
  };
};
