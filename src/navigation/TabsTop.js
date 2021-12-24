import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Order0, Order1, Order2, Order3} from '../screens';
import {icons, COLORS} from '../constants';
import {
  getOrderSTT0,
  getOrderSTT1,
  getOrderSTT2,
  getOrderSTT3,
} from '../redux/actions/orderHistoryActions';
import {useSelector, useDispatch} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function TabsTop({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      dispatch(getOrderSTT0());
      dispatch(getOrderSTT1());
      dispatch(getOrderSTT2());
      dispatch(getOrderSTT3());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {textTransform: 'none'},
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
      }}>
      <Tab.Screen name="Xác nhận" component={Order0} />
      <Tab.Screen name="Đang đến" component={Order1} />
      <Tab.Screen name="Hoàn thành" component={Order2} />
      <Tab.Screen name="Đã hủy" component={Order3} />
    </Tab.Navigator>
  );
}
