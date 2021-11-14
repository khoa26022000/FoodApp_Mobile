import React, {memo, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';

const Checkout = memo(function Checkout({
  foodCart,
  idParams,
  navigation,
  user,
}) {
  console.log('user', user.isAuthenticated);
  function getTotalItem() {
    let item = foodCart.foods
      ?.filter(food => food.food.restaurant === idParams._id)
      ?.reduce((total, cur) => total + cur.number, 0);
    return item;
  }
  function getTotalPrice() {
    let item = foodCart.foods
      ?.filter(food => food.food.restaurant === idParams._id)
      ?.reduce((total, cur) => total + cur.food.lastPrice * cur.number, 0);
    return item;
  }
  return (
    <View>
      {getTotalItem() > 0 ? (
        <View style={order.viewWrap}>
          <View style={{paddingHorizontal: SIZES.padding * 2}}>
            <Image
              source={icons.basket}
              resizeMode="contain"
              style={order.imageCart}
            />
            <View style={order.numberCart}>
              <Text style={order.numberCartText}>
                {foodCart.foods
                  ?.filter(food => food.food.restaurant === idParams._id)
                  ?.reduce((total, cur) => total + cur.number, 0)}
              </Text>
            </View>
          </View>
          <View style={order.totalPrice}>
            <Text style={order.priceText}>
              {getTotalPrice()
                ?.toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
              đ
            </Text>
            <TouchableOpacity
              style={{
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
              }}
              onPress={() => {
                user.isAuthenticated === true
                  ? navigation.navigate('OderDelivery', {idParams})
                  : navigation.navigate('Login');
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h2}}>Giao hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
});
Checkout.propTypes = {
  foodCart: PropTypes.array,
  user: PropTypes.object,
};

const order = StyleSheet.create({
  viewWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  imageCart: {
    tintColor: COLORS.primary,
    width: 30,
    height: 30,
  },
  numberCart: {
    position: 'absolute',
    top: -5,
    right: 7,
    backgroundColor: COLORS.primary,
    width: 15,
    height: 17,
    borderRadius: SIZES.radius,
  },
  numberCartText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 12,
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
    paddingRight: 10,
  },
});

export default Checkout;
