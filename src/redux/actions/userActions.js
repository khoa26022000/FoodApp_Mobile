import {
  USER_LOADED_SUCCESS,
  USER_LOADING,
  API_URI,
  USER_LOADED_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

import axios from 'axios';

import {navigate} from '../../navigation/rootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../utils/setAuthToken';
import {
  setAccecssAuth,
  getAccessAuth,
  getAccessCart,
  removeAccecssAuth,
} from '../../utils/asyncStore';

export const loadUser = () => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      const reponse = await axios.get(`${API_URI}/auth/profile`);
      if (reponse.data.success) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: {isAuthenticated: true, user: reponse.data.user},
        });
        console.log(reponse.data.success);
      }
    } catch (error) {
      setAuthToken(null);
      console.log('khong co user');
      console.log(error);
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: {isAuthenticated: false, user: null},
      });
    }
  };
};

export const loginUser = (phoneNumber, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URI}/auth/login`, {
        phoneNumber,
        password,
      });
      if (response.data.success === true) {
        dispatch({
          type: USER_LOADING,
          payload: {loginSuccess: response.data},
        });
        setAccecssAuth(response.data.accessToken);
        await dispatch(loadUser());
        if (response.data.success === true) {
          navigate('Tabs');
        }
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        dispatch({
          type: USER_LOADED_FAIL,
          payload: {loginSuccess: error.response.data},
        });
        return error.response.data;
      } else return {success: false, message: error.message};
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    try {
      // const response = await axios.post(`${API_URI}/auth/login`, {
      //   phoneNumber,
      //   password,
      // });
      removeAccecssAuth();
      await dispatch(loadUser());
      navigate('Login');
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return {success: false, message: error.message};
    }
  };
};

export const registerUser = (
  phoneNumber,
  password,
  conformPassword,
  fullName,
  address,
) => {
  return async dispatch => {
    try {
      console.log('phone', phoneNumber);
      console.log('pass', password);
      console.log('conform', conformPassword);
      console.log('name', fullName);
      const response = await axios.post(`${API_URI}/auth/register`, {
        phoneNumber,
        password,
        conformPassword,
        fullName,
        address: {
          city: address.city,
          district: address.district,
          ward: address.ward,
          street: address.street,
        },
      });
      if (response.data.success) {
        console.log('dk thanh cong', response.data);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {loginSuccess: response.data},
        });
        if (response.data.success === true) {
          navigate('Login');
        }
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        console.log('that bai', error.response.data);
        dispatch({
          type: REGISTER_FAIL,
          payload: {loginSuccess: error.response.data},
        });
        return error.response.data;
      } else return {success: false, message: error.message};
    }
  };
};
