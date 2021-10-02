import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import Login from './Login';
import OderDetail from './components/OderDetail';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {useSelector, useDispatch} from 'react-redux';

export default function OderDelivery({route, navigation}) {
  const data = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <OderDetail restaurant={data} navigation={navigation} />
      {/* {user.isAuthenticated === true ? (
        <OderDetail restaurant={data} navigation={navigation} />
      ) : (
        <Login />
      )} */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
