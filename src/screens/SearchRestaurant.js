import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

export default function SearchRestaurant({route}) {
  console.log('ok', route);
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  );
}
