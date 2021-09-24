import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Login from './Login';
import OderDetail from './OderDetail';
import {COLORS} from '../constants';
import {useSelector, useDispatch} from 'react-redux';

export default function OderDelivery({route}) {
  const data = route.params;
  console.log(data);
  const {user} = useSelector(state => state.categoryReducer);

  return (
    <SafeAreaView style={styles.container}>
      {user.isAuthenticated === true ? (
        <OderDetail restaurant={data} />
      ) : (
        <Login />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
