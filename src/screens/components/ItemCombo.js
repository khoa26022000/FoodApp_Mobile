import React, {memo, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {addFoodToCart, removeFoodToCart} from '../../redux/actions/cartActions';

const ItemCombo = memo(function ItemCombo({item, foodCart, idParams}) {
  const dispatch = useDispatch();

  function getTotalItem(idFood) {
    let item = foodCart.foods
      ?.filter(food => food.food._id === idFood)
      ?.reduce((total, cur) => total + cur.number, 0);
    return item;
  }

  const handleAddToCart = () => {
    if (item.quantity === 0) return;
    dispatch(addFoodToCart(item));
  };
  const handleRemoveToCart = () => {
    dispatch(removeFoodToCart(item));
  };
  return (
    <View style={body.itemWrap}>
      <View style={body.imageWrap}>
        <Image
          source={{uri: item?.photo}}
          resizeMode="cover"
          style={body.image}
        />
      </View>
      <View style={body.content}>
        <Text style={body.foodName}>{item.name}</Text>
        <Text style={body.description}>{item.description}</Text>
        <View style={body.priceWrap}>
          <Text style={body.price}>
            {item.lastPrice
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            đ
          </Text>
          {getTotalItem(item._id) > 0 ? (
            <View style={body.slWrap}>
              <TouchableOpacity style={body.tru} onPress={handleRemoveToCart}>
                <Image
                  resizeMode="cover"
                  style={body.icon}
                  source={{
                    uri: 'https://as2.ftcdn.net/v2/jpg/03/30/24/99/500_F_330249927_k8oy0p4zZqSAdxd1jxlhB0ZPT3fGLpjw.jpg',
                  }}
                />
              </TouchableOpacity>
              <Text style={body.slText}>{getTotalItem(item._id)}</Text>
              <TouchableOpacity style={body.tru} onPress={handleAddToCart}>
                <Image
                  resizeMode="cover"
                  style={body.icon}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828925.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={body.cong} onPress={handleAddToCart}>
              <Image
                resizeMode="cover"
                style={body.icon}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828925.png',
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
});
ItemCombo.propTypes = {
  item: PropTypes.object,
  foodCart: PropTypes.array,
  idParams: PropTypes.object,
};

const body = StyleSheet.create({
  itemWrap: {
    width: '100%',
    marginBottom: SIZES.padding,
    flexDirection: 'row',
    borderBottomColor: COLORS.lightGray2,
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
  },
  imageWrap: {
    margin: SIZES.padding,
    alignItems: 'center',
  },
  image: {
    height: 90,
    width: 90,
  },
  content: {
    marginLeft: SIZES.padding,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '70%',
  },
  foodName: {
    ...FONTS.body3,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    width: '90%',
  },
  priceWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  price1: {
    ...FONTS.body3,
    color: COLORS.black,
    paddingRight: 10,
    textDecorationLine: 'line-through',
  },
  slWrap: {
    flexDirection: 'row',
    marginRight: 10,
  },
  tru: {
    borderColor: COLORS.darkgray,
    borderWidth: 1,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cong: {
    borderColor: COLORS.darkgray,
    borderWidth: 1,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.padding * 1.5,
  },
  icon: {
    height: 10,
    width: 10,
  },
  slText: {
    borderColor: COLORS.darkgray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: 20,
    height: 20,
    textAlign: 'center',
  },
});

export default ItemCombo;
