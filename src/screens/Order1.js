import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getOrderSTT1} from '../redux/actions/orderHistoryActions';
import ItemOrder from './components/ItemOrder';

export default function Order1({navigation}) {
  const dispatch = useDispatch();
  const {order1} = useSelector(state => state.order);
  // useEffect(() => {
  //   dispatch(getOrderSTT1());
  // }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      dispatch(getOrderSTT1());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={order1}
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
