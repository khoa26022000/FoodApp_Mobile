import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Search, OrderSuccess} from '.';
import {icons, COLORS} from '../constants';
import {getOrderSTT0} from '../redux/actions/orderHistoryActions';
import ItemOrder from './components/ItemOrder';

export default function Order0({navigation}) {
  const dispatch = useDispatch();
  const {order0} = useSelector(state => state.order);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      dispatch(getOrderSTT0());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={order0}
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
