import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import {useSelector} from 'react-redux';

export default function OderDetail({restaurant, navigation}) {
  const data = restaurant.data;
  const {user} = useSelector(state => state.user);
  function getDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    return date + '/' + month;
  }
  function getTime() {
    var gio = new Date().getHours();
    var phut = new Date().getMinutes() + 20;

    return gio + ':' + phut;
  }

  function RenderHeader() {
    return (
      <View style={stylesHeader.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={stylesHeader.icons}
          />
        </TouchableOpacity>
        <Text style={stylesHeader.text}>Xác nhận đơn hàng</Text>
      </View>
    );
  }

  function RenderInfoUser() {
    return (
      <View style={styleInfoUser.container}>
        <View style={styleInfoUser.item}>
          <Text>Địa chỉ giao hàng</Text>
          <Image
            resizeMode="cover"
            style={styleInfoUser.icon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/927/927667.png',
            }}
          />
        </View>
        <View style={styleInfoUser.item}>
          <Text>{user.user?.profile.fullName}</Text>
          <Text style={{marginHorizontal: 5}}>-</Text>
          <Text>{user.user?.phoneNumber}</Text>
        </View>
        <View style={styleInfoUser.item}>
          <Text>{user.user?.profile.address}</Text>
        </View>
      </View>
    );
  }
  function RenderInfoFood() {
    return (
      <View style={styleInfoFood.container}>
        <View style={styleInfoFood.time}>
          <Image
            resizeMode="cover"
            style={styleInfoFood.icon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/992/992700.png',
            }}
          />
          <Text style={styleInfoFood.text}>
            Giao ngay - {getTime()} - Hôm nay {getDate()}
          </Text>
        </View>
        <View style={styleInfoFood.restaurant}>
          <Text style={styleInfoFood.text}>{data.name}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {RenderHeader()}
        {RenderInfoUser()}
        {RenderInfoFood()}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

const styleInfoUser = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 0.5,
    borderColor: COLORS.darkgray,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  icon: {
    height: 20,
    marginLeft: 5,
    width: 20,
    tintColor: COLORS.primary,
  },
});

const styleInfoFood = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  time: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 1.5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
  },
  restaurant: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 1.5,
  },
  icon: {
    height: 20,
    marginRight: 10,
    width: 20,
    tintColor: COLORS.primary,
  },
  text: {
    fontWeight: 'bold',
    ...FONTS.body3,
  },
});

const stylesHeader = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: SIZES.padding,
    height: 50,
  },
  icons: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
  text: {
    ...FONTS.body2,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});
