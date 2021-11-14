import React, {memo, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';
import ItemMenuFood from './ItemMenuFood';

const ListMenuFood = memo(function ListMenuFood({
  restaurant,
  menu,
  idParams,
  foodCart,
}) {
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          padding: SIZES.padding,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <Text style={styles.name}>{restaurant?.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.body3}}>Ratting: {restaurant?.rating}</Text>
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginLeft: 5,
            }}
          />
        </View>
        <Text style={{...FONTS.body3}}>{restaurant?.duration}</Text>
      </View>
      <View
        style={{
          marginTop: 15,
        }}>
        <FlatList // Hiện menu
          data={menu}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <ItemMenuFood item={item} idParams={idParams} foodCart={foodCart} />
          )}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </View>
    </View>
  );
});
ListMenuFood.propTypes = {
  restaurant: PropTypes.object,
  menu: PropTypes.array,
  idParams: PropTypes.object,
  foodCart: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  name: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  icons: {
    width: 30,
    height: 30,
  },
  renderHeader: {
    width: 50,
    height: 40,
    opacity: 0.5,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    marginHorizontal: SIZES.padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerName: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray3,
  },
  headerRight: {
    width: 50,
    height: 40,
    opacity: 0.5,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    marginHorizontal: SIZES.padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quanlity: {
    position: 'absolute',
    bottom: -20,
    width: SIZES.width,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  quanlityTouchTru: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  quanlityTouchNum: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quanlityTouchCong: {
    width: 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  productName: {
    width: SIZES.width,
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: SIZES.padding * 2,
  },
  calories: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.padding,
  },
  itemCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
  },
  iconSmall: {
    width: 20,
    height: 20,
    tintColor: COLORS.darkgray,
  },
  buttom: {
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttomItem: {
    width: SIZES.width * 0.9,
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
});

export default ListMenuFood;
