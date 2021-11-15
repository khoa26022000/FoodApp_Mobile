import React, {memo, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import ChooseList from './ChooseList';
import {useDispatch} from 'react-redux';
import {addFoodToCart, removeFoodToCart} from '../../redux/actions/cartActions';

const PopupFood = memo(function PopupFood({
  item,
  setOpen,
  handleAddToCart,
  handleRemoveToCart,
  getTotalItem,
  getChooseItem,
}) {
  const [oderItemsPopUp, setOderItemsPopUp] = useState([]);
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();

  const choosePrice = useMemo(() => {
    return checked?.reduce((total, cur) => total + cur.price, 0) || 0;
  }, [checked]);

  function getSumItemPopUp(id) {
    let item = getTotalItem(id._id) * (id.lastPrice + getChooseItem(id._id));
    console.log('gia tong', item);
    return item;
  }

  const handleSubmit = () => {
    const formatListChoose = [...new Set(checked)];
    const formatFood = {...item, listChoose: formatListChoose};
    dispatch(addFoodToCart(formatFood));
  };
  const handleSubmitPopup = () => {
    const formatListChoose = [...new Set(checked)];
    const formatFood = {...item, listChoose: formatListChoose};
    dispatch(addFoodToCart(formatFood));
    setOpen(!setOpen);
  };
  return (
    <View style={popup.centeredView}>
      <View style={popup.bottomView}>
        <View style={popup.modalView}>
          <View style={popup.header}>
            <Text> </Text>
            <Text>Thêm món mới</Text>
            <Pressable style={{width: 30}} onPress={() => setOpen(!setOpen)}>
              <Text style={{...FONTS.h2, marginRight: SIZES.padding}}>X</Text>
            </Pressable>
          </View>
          <ScrollView>
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
                          .toFixed(0)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        đ
                      </Text>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={body.price1}>
                        {item.price
                          .toFixed(0)
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

                  <View style={body.slWrap}>
                    {/* <TouchableOpacity
                      style={body.tru}
                      onPress={handleRemoveToCart}>
                      <Image
                        resizeMode="cover"
                        style={body.icon}
                        source={{
                          uri: 'https://as2.ftcdn.net/v2/jpg/03/30/24/99/500_F_330249927_k8oy0p4zZqSAdxd1jxlhB0ZPT3fGLpjw.jpg',
                        }}
                      />
                    </TouchableOpacity>
                    <Text style={body.slText}>{getTotalItem(item._id)}</Text>
                    <TouchableOpacity style={body.tru} onPress={handleSubmit}>
                      <Image
                        resizeMode="cover"
                        style={body.icon}
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828925.png',
                        }}
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>

            <ChooseList
              // handleAddChoose={handleAddChoose}
              // chooseList={item.choose}
              chooseList={item.choose}
              checked={checked}
              setChecked={setChecked}
            />
          </ScrollView>
          <View>
            <View style={order.viewWrap}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: SIZES.padding,
                }}
                onPress={handleSubmitPopup}>
                <Text style={{color: COLORS.white}}>
                  Thêm vào giỏ hàng{' '}
                  {(item.lastPrice + choosePrice)
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  đ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

PopupFood.propTypes = {
  item: PropTypes.object,
  handleAddToCart: PropTypes.func,
  handleRemoveToCart: PropTypes.func,
  getTotalItem: PropTypes.func,
  getChooseItem: PropTypes.func,
};

const popup = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  bottomView: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    margin: 30,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  },
});

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

const order = StyleSheet.create({
  viewWrap: {
    justifyContent: 'center',
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 1,
    height: 60,
  },
});
export default PopupFood;
