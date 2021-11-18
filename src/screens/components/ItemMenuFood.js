import React, {memo, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';
import ItemFood from './ItemFood';
import ItemCombo from './ItemCombo';

const ItemMenuFood = memo(function ItemMenuFood({item, idParams, foodCart}) {
  const {food} = useSelector(state => state.food);
  const {combo} = useSelector(state => state.combo);
  return (
    <View
      style={{
        width: '100%',
        marginBottom: 15,
        borderBottomColor: COLORS.lightGray2,
        borderBottomWidth: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
      }}>
      <Text
        style={{
          ...FONTS.body2,
          marginBottom: 10,
          color: COLORS.darkgray,
        }}>
        {item.name}
      </Text>
      <FlatList
        data={combo.filter(comboItem => comboItem?.menu == item._id)}
        keyExtractor={item => item._id.toString()}
        listKey={item => item._id.toString()}
        renderItem={({item}) => (
          <ItemCombo item={item} idParams={idParams} foodCart={foodCart} />
        )}
      />
      <FlatList
        data={food.filter(foodItem => foodItem.menu == item._id)}
        keyExtractor={item => item._id.toString()}
        listKey={item => item._id.toString()}
        renderItem={({item}) => (
          <ItemFood item={item} idParams={idParams} foodCart={foodCart} />
        )}
      />
    </View>
  );
});
ItemMenuFood.propTypes = {
  item: PropTypes.object,
  idParams: PropTypes.object,
  foodCart: PropTypes.array,
};

export default ItemMenuFood;
