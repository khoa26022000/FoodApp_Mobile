import {
  CART_LOADED_SUCCESS,
  CART_LOADED_FAIL,
  ORDER_LOADED_SUCCESS,
  ORDER_LOADED_FAIL,
  API_URI,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../utils/setAuthToken';
import {
  getAccessCart,
  setAccessCart,
  deleteAccessCart,
  getAccessAuth,
} from '../../utils/asyncStore';
import axios from 'axios';
import {Alert} from 'react-native';
import {navigate} from '../../navigation/rootNavigation';

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
      console.log('cart', cart.foods.food);
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

export const clearFoodToCart = state => {
  return async dispatch => {
    try {
      //   const cartLocal = getAccessCart();
      const cartLocal1 = await AsyncStorage.getItem('cart');
      const cartLocal = JSON.parse(cartLocal1);
      const cart =
        cartLocal === null ? {foods: [], number: 0, total: 0} : cartLocal;
      const index = cart.foods.findIndex(x => x.food._id === state._id);
      cart.foods.splice(index, 1);
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

export const clearCartToRestaurant = state => {
  return async dispatch => {
    try {
      //   const cartLocal = getAccessCart();
      const cartLocal1 = await AsyncStorage.getItem('cart');
      const cartLocal = JSON.parse(cartLocal1);
      const cart =
        cartLocal === null ? {foods: [], number: 0, total: 0} : cartLocal;
      const index = cart.foods.findIndex(
        x => x.food.restaurant === state.restaurant,
      );
      cart.foods.splice(index);
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

export const handleAddToCart = order => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    console.log('vv', value);
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      console.log(order);
      const response = await axios.post(`${API_URI}/order`, order);
      if (response.data.success === false) {
        Alert.alert('Thông báo', response.data.message);
      }
      if (response.data.success === true) {
        await dispatch(clearCartToRestaurant(order));
        Alert.alert('Thông báo', response.data.message);
        navigate('OrderSuccess');
      }
    } catch (error) {
      console.log('that bai', error);
    }
  };
};
