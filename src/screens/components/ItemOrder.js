import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS, icons, SIZES, FONTS} from '../../constants';
import moment from 'moment';
import {navigate} from '../../navigation/rootNavigation';

const ItemOrder = memo(function ItemOrder({item, navigation}) {
  function getSTT() {
    if (item.status === 0) {
      return 'Chờ xác nhận';
    } else if (item.status === 1) {
      return 'Đang giao...';
    } else if (item.status === 2) {
      return 'Thành công';
    } else {
      return 'Đã hủy';
    }
  }
  function getSumItem() {
    let a = item?.cartFood.reduce((total, cur) => total + cur.quantityFood, 0);
    let b = item?.cartCombo.reduce(
      (total, cur) => total + cur.quantityCombo,
      0,
    );
    return a + b;
  }
  return (
    <View style={{backgroundColor: COLORS.white, marginBottom: SIZES.padding}}>
      <View
        style={{
          marginHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 12, color: COLORS.darkgray}}>{getSTT()}</Text>
        <Text style={{fontSize: 12, color: COLORS.darkgray}}>
          {moment(item.createdAt).format('DD/MM/YYYY')}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            margin: SIZES.padding,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item?.restaurant.photo}}
            resizeMode="cover"
            style={{
              height: 90,
              width: 90,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.padding,
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <View>
            <Text
              style={{...FONTS.body2, fontWeight: 'bold', paddingVertical: 5}}>
              {item?.restaurant.name}
            </Text>
          </View>
          <Text style={{fontSize: 12, color: COLORS.darkgray}}>
            {item.restaurant.location}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={{fontWeight: 'bold', paddingVertical: 5}}>
              {item.total?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              đ
            </Text>
            <Text style={{paddingVertical: 5, marginLeft: 5}}>
              ({getSumItem()} phần)
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetails', {item})}>
            <Text style={{color: COLORS.primary}}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

ItemOrder.propTypes = {
  item: PropTypes.object,
};
export default ItemOrder;
