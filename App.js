import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Tabs from './src/navigation/Tabs';
import TabsTop from './src/navigation/TabsTop';
import {
  Home,
  Restaurant,
  OderDelivery,
  Login,
  Profile,
  Register,
  OrderSuccess,
  Order0,
  Order1,
  Order2,
  Order3,
  OrderDetals,
} from './src/screens';
import {navigationRef} from './src/navigation/rootNavigation';

// redux
import {Provider, useSelector} from 'react-redux';
import {Store} from './src/redux/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tabs'}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="TabsTop" component={TabsTop} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="OderDelivery" component={OderDelivery} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
          <Stack.Screen name="Order0" component={Order0} />
          <Stack.Screen name="Order1" component={Order1} />
          <Stack.Screen name="Order2" component={Order2} />
          <Stack.Screen name="Order3" component={Order3} />
          <Stack.Screen name="OrderDetails" component={OrderDetals} />
          {/* <Stack.Screen name="OderDetail" component={OderDetail} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
