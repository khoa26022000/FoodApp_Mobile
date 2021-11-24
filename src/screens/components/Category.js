import React, {memo, useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';

const Category = memo(function Category({
  category,
  selectedCategory,
  onSelectCategory,
  getAllRestaurant,
}) {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          padding: SIZES.padding,
          // paddingBottom: SIZES.padding,
          backgroundColor:
            selectedCategory?._id == item._id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: SIZES.padding,
          //   ...style.shadow,
        }}
        onPress={() => onSelectCategory(item)}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              selectedCategory?._id == item._id
                ? COLORS.white
                : COLORS.lightGray,
          }}>
          <Image
            source={{
              uri: item.icon,
            }}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>
        <Text
          style={{
            // marginTop: SIZES.padding,
            color:
              selectedCategory?._id == item._id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        // paddingVertical: SIZES.padding,
        marginVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}>
      <TouchableOpacity onPress={() => getAllRestaurant()}>
        <Text
          style={{
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding / 2,
            color: COLORS.primary,
            fontSize: SIZES.body3,
          }}>
          Xem tất cả
        </Text>
      </TouchableOpacity>

      <FlatList
        data={category}
        horizontal
        showsHorizontalScrollIndicato={false}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding,
        }}
      />
    </View>
  );
});

Category.propTypes = {
  category: PropTypes.object,
};

export default Category;
