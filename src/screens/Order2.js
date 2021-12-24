import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getOrderSTT2} from '../redux/actions/orderHistoryActions';
import ItemOrder from './components/ItemOrder';

export default function Order2({navigation}) {
  const dispatch = useDispatch();
  const {order2} = useSelector(state => state.order);
  // useEffect(() => {
  //   dispatch(getOrderSTT2());
  // }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      dispatch(getOrderSTT2());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={order2}
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
