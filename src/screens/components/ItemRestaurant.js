import React, {memo, useEffect, useState} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';

const ItemRestaurant = memo(function ItemRestaurant({item, navigation}) {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        marginBottom: SIZES.padding,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
      }}
      onPress={() => navigation.navigate('Restaurant', {item})}>
      <View
        style={{
          margin: SIZES.padding,
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.photo}}
          resizeMode="cover"
          style={{
            height: 80,
            width: 80,
          }}
        />
      </View>
      <View
        style={{
          //   marginLeft: SIZES.padding,
          //   flexDirection: 'column',
          //   justifyContent: 'flex-start',
          marginLeft: SIZES.padding,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '70%',
        }}>
        <Text
          style={{
            ...FONTS.body3,
            fontWeight: 'bold',
            paddingTop: 5,
          }}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingVertical: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={icons.star}
              style={{
                height: 17,
                width: 17,
                tintColor: COLORS.primary,
                marginRight: 5,
              }}
            />
            <Text style={{...FONTS.body4}}>{item.rating}</Text>
          </View>
          <Text style={{paddingHorizontal: 5}}>|</Text>
          <Text style={{...FONTS.body4}}>{item.duration}</Text>
        </View>
        <View>
          <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
            {item.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

ItemRestaurant.propTypes = {
  item: PropTypes.object,
};

export default ItemRestaurant;
