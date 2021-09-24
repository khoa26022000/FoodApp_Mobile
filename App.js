import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, icons} from './constants';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tabs from './src/navigation/Tabs';
import {Home, Restaurant, OderDelivery, Login} from './src/screens';

// redux
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="OderDelivery" component={OderDelivery} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
