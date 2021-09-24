import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getRestaurant} from '../redux/actions/actions';

export default function Search() {
  const {restaurant} = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurant());
  });
  return (
    <View>
      <Text>Search</Text>
      <FlatList
        data={restaurant.restaurant}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
