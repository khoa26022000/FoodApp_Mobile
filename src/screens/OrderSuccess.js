import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SIZES, COLORS, icons} from '../constants';

export default function OrderSuccess({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Image
        resizeMode="cover"
        style={{
          width: '100%',
        }}
        source={icons.shipper}
      />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <Text style={{fontSize: SIZES.body2, fontWeight: 'bold'}}>
          Đặt hàng thành công
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            width: 250,
            height: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginVertical: 20,
          }}
          onPress={() => navigation.navigate('Tabs')}>
          <Text style={{color: COLORS.white, fontSize: SIZES.body2}}>
            Tiếp tục đặt hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            width: 250,
            height: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('Search')}>
          <Text style={{color: COLORS.white, fontSize: SIZES.body2}}>
            Xem đơn hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
