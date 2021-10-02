import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getRestaurant} from '../redux/actions/actions';

export default function Search() {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}
