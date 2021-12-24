import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getOrderSTT3} from '../redux/actions/orderHistoryActions';
import ItemOrder from './components/ItemOrder';

export default function Order3({navigation}) {
  const dispatch = useDispatch();
  const {order3} = useSelector(state => state.order);
  // useEffect(() => {
  //   dispatch(getOrderSTT3());
  // }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      dispatch(getOrderSTT3());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={order3}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <ItemOrder item={item} navigation={navigation} />
        )}
        contentContainerStyle={{
          paddingTop: 10,
        }}
      />
    </View>
  );
}
