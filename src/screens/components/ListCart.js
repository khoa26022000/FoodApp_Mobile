import React, {memo, useMemo, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

const ListCart = memo(function ListCart({restaurant}) {
  const {foodCart} = useSelector(state => state.foodCart);

  const cartItem = useMemo(() => {
    return foodCart?.foods?.filter(
      food => food.food.restaurant === restaurant._id,
    );
  }, [foodCart]);
  return (
    <View style={{flexDirection: 'column'}}>
      {cartItem.map(food => (
        <View style={styles.wrap} key={food.food._id}>
          <View style={styles.right}>
            <Image
              source={{uri: food.food.photo}}
              resizeMode="cover"
              style={styles.icons}
            />
            <Text style={{fontWeight: 'bold'}}>{food.number}</Text>
            <Text style={{marginHorizontal: 10, fontWeight: 'bold'}}>x</Text>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {food.food.name}
              </Text>
              <Text style={{fontSize: 13}}>
                {food.food.listChoose?.map(choose => choose.name).join(', ')}
              </Text>
            </View>
          </View>
          <Text style={{fontWeight: 'bold'}}>
            {((food.food.lastPrice + food.priceChoose) * food.number)
              ?.toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            đ
          </Text>
        </View>
      ))}
    </View>
  );
});
ListCart.propTypes = {
  restaurant: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  wrap: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  icons: {
    width: 40,
    height: 40,
    marginRight: 10,
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

export default ListCart;
