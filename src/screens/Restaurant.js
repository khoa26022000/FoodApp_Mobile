import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';

import {useSelector, useDispatch} from 'react-redux';
import {getFoodById, getMenuByIdRestaurant} from '../redux/actions/actions';

export default function Restaurant({route, navigation}) {
  const [restaurant, setRestaurant] = useState(null);
  const [oderItems, setOderItems] = useState([]);
  // const [isShow, setIsShow] = useState(true);

  //redux
  const {food, menu} = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();
  const data = route.params.item;

  useEffect(() => {
    // dispatch(getFoodById());
    dispatch(getMenuByIdRestaurant(data._id));
  }, [dispatch, data._id]);
  useEffect(() => {
    let {item} = route.params;
    setRestaurant(item);
  }, [route.params]);

  function editOder(action, foodId, price) {
    let orderList = oderItems.slice();
    let item = oderItems.filter(a => a.foodId == foodId);

    if (action == '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          foodId: foodId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = item[0].qty * price;
        }
      }
      setOderItems(orderList);
    }
  }
  function getOrderQty(foodId) {
    let orderItem = oderItems.filter(a => a.foodId == foodId);

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }

    return 0;
  }

  function getSumItem() {
    let item = oderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return item;
  }
  function getTotal() {
    let item = oderItems.reduce((a, b) => a + (b.total || 0), 0);
    return item.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  function RenderHeader() {
    return (
      <ImageBackground
        source={{uri: restaurant?.photo}}
        resizeMode="cover"
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 230,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: SIZES.padding,
          }}>
          <TouchableOpacity
            style={styles.renderHeader}
            onPress={() => navigation.navigate('Home')}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.renderHeader}>
            <Image
              source={icons.list}
              resizeMode="contain"
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
  function RenderFoodInfo() {
    const renderItemFood = ({item}) => (
      <TouchableOpacity
        style={{
          width: '100%',
          marginBottom: SIZES.padding,
          flexDirection: 'row',
          borderBottomColor: COLORS.lightGray2,
          borderBottomWidth: 1,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            margin: SIZES.padding,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.photo}}
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.padding,
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: 250,
          }}>
          <Text style={{...FONTS.body3, fontWeight: 'bold'}}>{item.name}</Text>
          <Text style={{fontSize: 13, width: '80%'}}>{item.description}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.primary,
                fontWeight: 'bold',
              }}>
              {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ
            </Text>
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <TouchableOpacity
                style={{
                  borderColor: COLORS.darkgray,
                  borderWidth: 1,
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => editOder('-', item._id, item.price)}>
                <Image
                  resizeMode="cover"
                  style={{
                    height: 10,
                    width: 10,
                  }}
                  source={{
                    uri: 'https://as2.ftcdn.net/v2/jpg/03/30/24/99/500_F_330249927_k8oy0p4zZqSAdxd1jxlhB0ZPT3fGLpjw.jpg',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  borderColor: COLORS.darkgray,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  width: 20,
                  height: 20,
                  textAlign: 'center',
                }}>
                {getOrderQty(item._id)}
              </Text>
              <TouchableOpacity
                style={{
                  borderColor: COLORS.darkgray,
                  borderWidth: 1,
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => editOder('+', item._id, item.price)}>
                <Image
                  resizeMode="cover"
                  style={{
                    height: 10,
                    width: 10,
                  }}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828925.png',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    const renderItemMenu = ({item}) => (
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
            textTransform: 'uppercase',
            marginBottom: 15,
            color: COLORS.darkgray,
          }}>
          {item.name}
        </Text>
        <FlatList
          data={food.filter(foodItem => foodItem.menu == item._id)}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItemFood}
        />
      </View>
    );
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
            keyExtractor={item => `${item._id}`}
            renderItem={renderItemMenu}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
          />
        </View>
      </View>
    );
  }
  function RenderOder() {
    return (
      <View>
        {getSumItem() > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
            }}>
            <View style={{paddingHorizontal: SIZES.padding * 2}}>
              <Image
                source={icons.basket}
                resizeMode="contain"
                style={{
                  tintColor: COLORS.primary,
                  width: 30,
                  height: 30,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: -5,
                  right: 7,
                  backgroundColor: COLORS.primary,
                  width: 15,
                  height: 17,
                  borderRadius: SIZES.radius,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    textAlign: 'center',
                    fontSize: 12,
                  }}>
                  {getSumItem()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  paddingRight: 10,
                }}>
                {getTotal()}đ
              </Text>
              <TouchableOpacity
                style={{
                  padding: SIZES.padding,
                  backgroundColor:
                    getSumItem() > 0 ? COLORS.primary : COLORS.darkgray,
                  alignItems: 'center',
                }}
                onPress={props =>
                  getSumItem() > 0
                    ? navigation.navigate('OderDelivery', {data})
                    : (props.disabled = true)
                }>
                <Text style={{color: COLORS.white, ...FONTS.h2}}>
                  Giao hàng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {RenderHeader()}
        {RenderFoodInfo()}
      </ScrollView>
      {RenderOder()}
    </View>
  );
}

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
