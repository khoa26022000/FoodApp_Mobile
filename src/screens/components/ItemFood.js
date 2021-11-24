import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';
import PopupFood from './PopupFood';
import {useDispatch} from 'react-redux';
import {
  addFoodToCart,
  removeFoodToCart,
  clearFoodToCart,
} from '../../redux/actions/cartActions';

const ItemFood = memo(function ItemFood({item, foodCart, idParams}) {
  const dispatch = useDispatch();
  const [oderItems, setOderItems] = useState([]);
  const [open, setOpen] = useState(false);

  function getTotalItem(idFood) {
    let item = foodCart?.foods
      ?.filter(food => food.food._id === idFood)
      ?.reduce((total, cur) => total + cur.number, 0);
    return item;
  }

  function getChooseItem(idFood) {
    let item = foodCart?.foods
      ?.filter(food => food.food._id === idFood)
      ?.reduce((total, cur) => total + cur.priceChoose, 0);
    console.log('gia choose', item);
    return item;
  }

  const handleAddToCart = () => {
    if (item.quantity === 0) return;
    if (item.choose.length > 0) {
      setOpen(true);
      return;
    }
    dispatch(addFoodToCart(item));
  };
  const handleAddToCartPopup = () => {
    if (item.quantity === 0) return;
    dispatch(addFoodToCart(item));
  };
  const handleRemoveToCart = () => {
    dispatch(removeFoodToCart(item));
    // if (getTotalItem(id) === 0) {
    //   dispatch(clearFoodToCart(item));
    // }
  };
  const handleClearToCart = () => {
    dispatch(clearFoodToCart(item));
  };
  return (
    <View style={body.itemWrap}>
      <View style={body.imageWrap}>
        <Image
          source={{uri: item.photo}}
          resizeMode="cover"
          style={body.image}
        />
      </View>
      <View style={body.content}>
        <Text style={body.foodName}>{item.name}</Text>
        <Text style={body.description}>{item.description}</Text>
        <View style={body.priceWrap}>
          {item.price === item.lastPrice ? (
            <View>
              <Text style={body.price}>
                {item.price
                  ?.toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                đ
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Text style={body.price1}>
                {item.price
                  ?.toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                đ
              </Text>
              <Text style={body.price}>
                {item.lastPrice
                  .toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                đ
              </Text>
            </View>
          )}
          {getTotalItem(item._id) > 0 ? (
            <View style={body.slWrap}>
              <TouchableOpacity
                style={body.tru}
                onPress={
                  getTotalItem(item._id) === 1
                    ? handleClearToCart
                    : handleRemoveToCart
                }>
                <Image
                  resizeMode="cover"
                  style={body.icon}
                  source={{
                    uri: 'https://as2.ftcdn.net/v2/jpg/03/30/24/99/500_F_330249927_k8oy0p4zZqSAdxd1jxlhB0ZPT3fGLpjw.jpg',
                  }}
                />
              </TouchableOpacity>
              <Text style={body.slText}>{getTotalItem(item._id)}</Text>
              <TouchableOpacity style={body.tru} onPress={handleAddToCartPopup}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setOpen(!open);
        }}>
        <PopupFood
          item={item}
          setOpen={setOpen}
          handleAddToCart={handleAddToCartPopup}
          handleRemoveToCart={handleRemoveToCart}
          getTotalItem={getTotalItem}
          getChooseItem={getChooseItem}
        />
      </Modal>
    </View>
  );
});
ItemFood.propTypes = {
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
    height: 80,
    width: 80,
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

export default ItemFood;
