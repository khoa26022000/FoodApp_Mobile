import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../utils/setAuthToken';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_RESTAURANT = 'GET_RESTAURANT';
export const GET_FOOD = 'GET_FOOD';
export const GET_MENU = 'GET_MENU';
export const SET_AUTH = 'SET_AUTH';
export const LOCAL_STORAGE_TOKEN_NAME = 'LOCAL_STORAGE_TOKEN_NAME';

const API = 'https://server-express-foodapp.herokuapp.com/api';

export const getRestaurant = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API}/restaurant`);
      if (response.data.success) {
        dispatch({type: GET_RESTAURANT, payload: response.data.restaurant});
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getCategory = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API}/category`);
      if (response.data.success) {
        dispatch({type: GET_CATEGORY, payload: response.data.category});
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFoodById = restaurant => {
  return async dispatch => {
    try {
      //const response = await axios.get(`${API}/food/${restaurant}`);
      const response = await axios.get(`${API}/food`);
      if (response.data.success)
        dispatch({type: GET_FOOD, payload: response.data.food});
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMenuByIdRestaurant = restaurant => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API}/menu/${restaurant}`);
      if (response.data.success)
        dispatch({type: GET_MENU, payload: response.data.menu});
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadUser = () => {
  AsyncStorage.getItem('LOCAL_STORAGE_TOKEN_NAME', (err, result) => {
    if (result) return setAuthToken(result); //no ra dung luon ma no chay
  });
  return async dispatch => {
    try {
      const reponse = await axios.get(`${API}/auth/profile`);
      if (reponse.data.success) {
        // console.log('Vy log', reponse);
        dispatch({
          type: 'SET_AUTH',
          payload: {isAuthenticated: true, user: reponse.data.user},
        });
        // console.log(reponse.data.success);
      }
    } catch (error) {
      // AsyncStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      console.log('khong co user'); // may lan dau no toan vao day
      dispatch({
        type: 'SET_AUTH',
        payload: {isAuthenticated: false, user: null},
      });
    }
  };
};

export const loginUser = (phoneNumber, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        phoneNumber,
        password,
      });
      if (response.data.success)
        // console.log('Vy log', response);
        AsyncStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        );
      await dispatch(loadUser());

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return {success: false, message: error.message};
    }
  };
};
