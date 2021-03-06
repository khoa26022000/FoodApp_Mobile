import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {
  Home,
  Login,
  OderDelivery,
  Profile,
  Search,
  OrderSuccess,
  OrderHistory,
  Order0,
} from '../screens';
import {COLORS, icons} from '../constants';
import TabsTop from './TabsTop';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          borderTopWidth: 0.7,
          backgroundColor: COLORS.white,
          // backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      // tabBarOptions={{
      //   style: {
      //     borderTopWidth: 1,
      //     backgroundColor: 'transparent',
      //     elevation: 0,
      //   },
      //   activeTintColor: COLORS.primary,
      //   inactiveTintColor: COLORS.secondary,
      // }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.cutlery}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={TabsTop}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.order}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
