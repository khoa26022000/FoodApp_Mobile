import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAccecssAuth = async token => {
  await AsyncStorage.setItem('auth', token);
};

export const removeAccecssAuth = async () => {
  await AsyncStorage.removeItem('auth');
};

export const getAccessAuth = async () => {
  const value = await AsyncStorage.getItem('auth');
  // if (value !== null) {
  //   console.log('value', value);
  // }
  return value;
};

export const getAccessCart = async () => {
  let cart = await AsyncStorage.getItem('cart');
  return JSON.parse(cart);
};

export const setAccessCart = async cart => {
  await AsyncStorage.setItem('cart', JSON.stringify(cart));
};

export const deleteAccessCart = async () => {
  await AsyncStorage.removeItem('cart');
};
