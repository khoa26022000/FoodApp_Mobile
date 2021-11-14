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

export default function OderDelivery({route, navigation}) {
  console.log('router', route.params.idParams.name);
  const data = route.params.idParams;
  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Text>ok delivery</Text>
      </View> */}
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
