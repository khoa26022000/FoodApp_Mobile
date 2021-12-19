import {
  USER_LOADED_SUCCESS,
  USER_LOADING,
  API_URI,
  USER_LOADED_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_ADDRESS,
} from './types';
import {Alert} from 'react-native';

import axios from 'axios';

import {navigate, navigateRoute} from '../../navigation/rootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../utils/setAuthToken';
import {
  setAccecssAuth,
  getAccessAuth,
  getAccessCart,
  removeAccecssAuth,
} from '../../utils/asyncStore';
import RNRestart from 'react-native-restart';

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
  // try {
  //   const response = await axios.post(`${API_URI}/auth/login`, {
  //     phoneNumber,
  //     password,
  //   });
  //   if (response.data.success === true) {
  //     setAccecssAuth(response.data.accessToken);
  //     // await dispatch(loadUser());
  //     if (response.data.success === true) {
  //       navigate('Tabs');
  //     }
  //   }
  //   return response.data;
  // } catch (error) {
  //   console.log('đăng nhập thất bại');
  //   console.log('lỗi', error.response.data);
  //   return error.response.data;
  // }
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
        Alert.alert('Thông báo', response.data.message);
        await dispatch(loadUser());
        if (response.data.success === true) {
          navigate('Tabs');
        }
      }
      return response.data;
    } catch (error) {
      console.log('đăng nhập thất bại');
      console.log('lỗi', error.response.data);
      Alert.alert('Thông báo', error.response.data.message);
      dispatch({
        type: USER_LOADED_FAIL,
        payload: {loginFail: error.response.data},
      });
      return error.response.data;
      // if (error.response.data) {
      //   dispatch({
      //     type: USER_LOADING,
      //     payload: {loginSuccess: error.response.data},
      //   });
      //   return error.response.data;
      // } else return {success: false, message: error.message};
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
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: address,
            key: 'e50cdcc8921f46e8ade4bea172f062f7',
          },
        },
      );
      const {lat, lng} = res.data.results[0].geometry;
      const response = await axios.post(`${API_URI}/auth/register`, {
        phoneNumber,
        password,
        conformPassword,
        fullName,
        address,
        lat,
        lng,
      });
      if (response.data.success) {
        console.log('dk thanh cong', response.data);
        Alert.alert('Thông báo', response.data.message);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data.token,
        });
        if (response.data.success === true) {
          const token = response.data.token;
          navigateRoute('VerifyCode', token);
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
        Alert.alert('Thông báo', error.response.data.message);
        return error.response.data;
      } else return {success: false, message: error.message};
    }
  };
};

export const verifyCode = (token, code) => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `${API_URI}/auth/verify?token=${token}&code=${code}`,
      );
      console.log('$$$', response);
      if (response.data.success) {
        Alert.alert('Thông báo', response.data.message);
        if (response.data.success === true) {
          navigate('Login');
        }
      }
    } catch (error) {
      if (error.response.data) {
        console.log('that bai', error.response.data);
        dispatch({
          type: REGISTER_FAIL,
          payload: {loginSuccess: error.response.data},
        });
        Alert.alert('Thông báo', error.response.data.message);
        return error.response.data;
      } else return {success: false, message: error.message};
    }
  };
};

export const forgotPassword = (phoneNumber, newPassword) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URI}/auth/forgot-password`, {
        phoneNumber,
        newPassword,
      });
      if (response.data.success) {
        Alert.alert('Thông báo', response.data.message);
        if (response.data.success === true) {
          const token = response.data.token;
          navigateRoute('VerifyCodePass', token);
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
        Alert.alert('Thông báo', error.response.data.message);
        return error.response.data;
      } else return {success: false, message: error.message};
    }
  };
};

export const verifyCodeNewPass = (token, code) => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `${API_URI}/auth/verify-newPassword?token=${token}&code=${code}`,
      );
      console.log('$$$', response);
      if (response.data.success) {
        Alert.alert('Thông báo', response.data.message);
        if (response.data.success === true) {
          navigate('Login');
        }
      }
    } catch (error) {
      if (error.response.data) {
        console.log('that bai', error.response.data);
        dispatch({
          type: REGISTER_FAIL,
          payload: {loginSuccess: error.response.data},
        });
        Alert.alert('Thông báo', error.response.data.message);
        return error.response.data;
      } else return {success: false, message: error.message};
    }
  };
};

export const changeAddress = address => {
  return async dispatch => {
    const value = await AsyncStorage.getItem('auth');
    try {
      if (getAccessAuth()) {
        setAuthToken(value);
      }
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: address,
            key: 'e50cdcc8921f46e8ade4bea172f062f7',
          },
        },
      );
      const {lat, lng} = res.data.results[0].geometry;
      const reponse = await axios.put(`${API_URI}/auth/changeAddress`, {
        address,
        lat,
        lng,
      });
      if (reponse.data.success) {
        dispatch({
          type: CHANGE_ADDRESS,
          payload: reponse.data.user,
        });
        Alert.alert('Thông báo', reponse.data.message);
        // RNRestart.Restart();
        await dispatch(loadUser());
      }
    } catch (error) {
      setAuthToken(null);
      console.log(error);
      Alert.alert('Thông báo', 'Không tìm thấy địa chỉ hoặc user');
    }
  };
};
