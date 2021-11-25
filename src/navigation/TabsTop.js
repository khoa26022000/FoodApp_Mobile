import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Order0, Order1, Order2, Order3} from '../screens';
import {icons, COLORS} from '../constants';

const Tab = createMaterialTopTabNavigator();

export default function TabsTop() {
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
      }}
      // tabBarOptions={{
      //   labelStyle: {textTransform: 'none'},
      //   style: {
      //     backgroundColor: 'white',
      //     elevation: 0,
      //   },
      //   activeTintColor: COLORS.primary,
      //   inactiveTintColor: COLORS.secondary,
      // }}
    >
      <Tab.Screen name="Xác nhận" component={Order0} />
      <Tab.Screen name="Đang đến" component={Order1} />
      <Tab.Screen name="Hoàn thành" component={Order2} />
      <Tab.Screen name="Đã hủy" component={Order3} />
    </Tab.Navigator>
  );
}
