import {
  ORDER0_LOADED_FAIL,
  ORDER0_LOADED_SUCCESS,
  ORDER1_LOADED_FAIL,
  ORDER1_LOADED_SUCCESS,
  ORDER2_LOADED_FAIL,
  ORDER2_LOADED_SUCCESS,
  ORDER3_LOADED_FAIL,
  ORDER3_LOADED_SUCCESS,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  API_URI,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../utils/setAuthToken';
import {getAccessAuth} from '../../utils/asyncStore';
import {Alert} from 'react-native';
import {navigate} from '../../navigation/rootNavigation';

import axios from 'axios';

export const getOrderSTT0 = () => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      const response = await axios.get(`${API_URI}/order/stt0`);
      if (response.data.success)
        dispatch({type: ORDER0_LOADED_SUCCESS, payload: response.data.order});
    } catch (error) {
      console.log('lỗi', error);
      dispatch({type: ORDER0_LOADED_FAIL});
    }
  };
};

export const getOrderSTT1 = () => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      const response = await axios.get(`${API_URI}/order/stt1`);
      if (response.data.success)
        dispatch({type: ORDER1_LOADED_SUCCESS, payload: response.data.order});
    } catch (error) {
      console.log('lỗi', error);
      dispatch({type: ORDER1_LOADED_FAIL});
    }
  };
};

export const getOrderSTT2 = () => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      const response = await axios.get(`${API_URI}/order/stt2`);
      if (response.data.success)
        dispatch({type: ORDER2_LOADED_SUCCESS, payload: response.data.order});
    } catch (error) {
      console.log('lỗi', error);
      dispatch({type: ORDER2_LOADED_FAIL});
    }
  };
};

export const getOrderSTT3 = () => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      const response = await axios.get(`${API_URI}/order/stt3`);
      if (response.data.success)
        dispatch({type: ORDER3_LOADED_SUCCESS, payload: response.data.order});
    } catch (error) {
      console.log('lỗi', error);
      dispatch({type: ORDER3_LOADED_FAIL});
    }
  };
};

export const cancelOrder = idOrder => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      const response = await axios.put(
        `${API_URI}/order/cancel/user/${idOrder}`,
      );
      if (response.data.success) {
        Alert.alert('Thông báo', 'Hủy đơn hàng thành công!!!');
        navigate('Tabs');
      }
    } catch (error) {
      console.log('lỗi', error);
    }
  };
};
