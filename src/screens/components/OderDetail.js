import React, {useState, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import ListCart from './ListCart';
import {getPay} from '../../redux/actions/payActions';
import {getKM} from '../../redux/actions/haversineActions';
import {handleAddToCart} from '../../redux/actions/cartActions';
import {navigate} from '../../navigation/rootNavigation';

export default function OderDetail({restaurant, navigation}) {
  const [selectedPay, setSelectedPay] = useState('61614a21855f83b83e611b80');
  const {user} = useSelector(state => state.user);
  const {foodCart} = useSelector(state => state.foodCart);
  const {pay} = useSelector(state => state.pay);
  const {km} = useSelector(state => state.km);
  const {isSuccess} = useSelector(state => state.isSuccess);
  const dispatch = useDispatch();
  console.log('$$$$', isSuccess);
  const cartItem = useMemo(() => {
    return foodCart?.foods?.filter(
      food => food.food.restaurant === restaurant._id,
    );
  }, [foodCart]);
  useEffect(() => {
    dispatch(getPay());
    dispatch(
      getKM(
        restaurant.lat,
        restaurant.lng,
        user.user?.profile.lat,
        user.user?.profile.lng,
      ),
    );
  }, [dispatch]);

  function getDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    return date + '/' + month;
  }
  function getTime() {
    var gio = new Date().getHours();
    var phut = new Date().getMinutes() + 20;

    return gio + ':' + phut;
  }

  function getTotalItem() {
    let item = foodCart?.foods
      ?.filter(food => food.food.restaurant === restaurant._id)
      ?.reduce((total, cur) => total + cur.number, 0);
    return item;
  }

  function getTotalPrice() {
    let item = foodCart?.foods
      ?.filter(food => food.food.restaurant === restaurant._id)
      ?.reduce(
        (total, cur) =>
          (total + cur.food.lastPrice + cur.priceChoose) * cur.number,
        0,
      );
    return item;
  }

  function getTotalCost() {
    let item = foodCart?.foods
      ?.filter(food => food.food.restaurant === restaurant._id)
      ?.reduce(
        (total, cur) => (total + cur.food.price + cur.priceChoose) * cur.number,
        0,
      );
    return item;
  }

  function getShip() {
    let item = 0;
    if (km < 4) {
      item = 20000;
    } else {
      item = km * 5000;
    }
    return Math.round(item);
  }

  function handleCheckout() {
    try {
      const checkoutCart = {
        arrayFood: cartItem
          .filter(food => !food.food.comboDetails)
          .map(cart => ({
            idFood: cart.food._id,
            quantityFood: cart.number,
            price: (cart.food.price + cart.priceChoose) * cart.number,
            amount: (cart.food.lastPrice + cart.priceChoose) * cart.number,
            listChoose: cart.food.listChoose,
          })),
        arrayCombo: cartItem
          .filter(food => food.comboDetails)
          .map(cart => ({
            idCombo: cart.food._id,
            quantityCombo: cart.number,
            price: cart.food.price * cart.number,
            amount: cart.food.lastPrice * cart.number,
          })),
        restaurant: restaurant._id,
        pay: selectedPay,
        ship: getShip(),
        totalCost: getTotalCost() + getShip(),
        total: getTotalPrice() + getShip(),
      };
      if (selectedPay !== '61614a35855f83b83e611b82') {
        const is = dispatch(handleAddToCart(checkoutCart));
        if (is) {
          // navigate('OrderSuccess');
          navigation.navigate('OrderSuccess', {
            restaurant: restaurant,
            user: user.user,
          });
        }
      } else {
        Alert.alert(
          'Thông báo',
          'Ứng dụng chưa hỗ trợ hình thức thanh toán này !',
        );
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: index.jsx ~ line 31 ~ handleCheckout ~ error',
        error,
      );
    }
  }

  function onSelectPay(item) {
    console.log(item);
    setSelectedPay(item);
  }

  function RenderHeader() {
    return (
      <View style={stylesHeader.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={stylesHeader.icons}
          />
        </TouchableOpacity>
        <Text style={stylesHeader.text}>Xác nhận đơn hàng</Text>
      </View>
    );
  }

  function RenderInfoUser() {
    return (
      <View style={styleInfoUser.container}>
        <View style={styleInfoUser.item}>
          <Text>Địa chỉ giao hàng</Text>
          <Image
            resizeMode="cover"
            style={styleInfoUser.icon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/927/927667.png',
            }}
          />
        </View>
        <View style={styleInfoUser.item}>
          <Text>{user.user?.profile.fullName}</Text>
          <Text style={{marginHorizontal: 5}}>-</Text>
          <Text>{user.user?.phoneNumber}</Text>
          <Text style={{marginHorizontal: 5}}>-</Text>
          <Text>{user.user?.myCoin} Điểm</Text>
        </View>
        <View style={styleInfoUser.item}>
          <Text>{user.user?.profile.address}</Text>
        </View>
      </View>
    );
  }
  function RenderInfoFood() {
    return (
      <View style={styleInfoFood.container}>
        <View style={styleInfoFood.time}>
          <Image
            resizeMode="cover"
            style={styleInfoFood.icon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/992/992700.png',
            }}
          />
          <Text style={styleInfoFood.text}>
            Giao ngay - {getTime()} - Hôm nay {getDate()}
          </Text>
        </View>
        <View style={styleInfoFood.restaurant}>
          <Text style={styleInfoFood.text}>{restaurant.name}</Text>
        </View>
        <ListCart restaurant={restaurant} />
      </View>
    );
  }

  function RenderOrderTotal() {
    return (
      <View style={stylesOrderTotal.container}>
        <View style={stylesOrderTotal.wrapItem}>
          <Text style={stylesOrderTotal.text}>
            Tổng ({getTotalItem()} phần)
          </Text>
          <Text style={stylesOrderTotal.text}>
            {getTotalPrice()
              ?.toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            đ
          </Text>
        </View>
        <View style={stylesOrderTotal.wrapItem}>
          <Text style={stylesOrderTotal.text}>
            Phí giao hàng ({Math.round(km)} km)
          </Text>
          <Text style={stylesOrderTotal.text}>
            {getShip()
              ?.toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            đ
          </Text>
        </View>
        <View style={stylesOrderTotal.wrapItem}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tổng cộng</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text
              style={{fontSize: 18, color: COLORS.primary, fontWeight: 'bold'}}>
              {(getTotalPrice() + getShip())
                ?.toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              đ
            </Text>
            <Text style={{color: COLORS.darkgray, marginTop: 10}}>
              Đã bao gồm thuế
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function RenderOrder() {
    return (
      <View style={stylesOrder.container}>
        <TouchableOpacity style={stylesOrder.wrapItem} onPress={handleCheckout}>
          <Text style={{fontSize: SIZES.body3, color: COLORS.white}}>
            Đặt đơn -{' '}
            {(getTotalPrice() + getShip())
              ?.toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            đ
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function RenderPay() {
    return (
      <View style={stylesPay.container}>
        {pay.map(payItem => (
          <TouchableOpacity
            style={{
              marginVertical: SIZES.padding / 2,
              marginHorizontal: SIZES.padding,
              height: 40,
              width: 104,
              borderColor:
                selectedPay == payItem._id ? COLORS.primary : COLORS.darkgray,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => onSelectPay(payItem._id)}
            key={payItem._id}>
            <Text
              style={{
                color:
                  selectedPay == payItem._id ? COLORS.primary : COLORS.darkgray,
              }}>
              {payItem.shortName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {RenderHeader()}
        {RenderInfoUser()}
        {RenderInfoFood()}
        <View
          style={{
            alignItems: 'center',
            height: 40,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: COLORS.darkgray}}>TỔNG</Text>
        </View>
        {RenderOrderTotal()}
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.white,
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text style={{color: 'blue', fontSize: SIZES.body3}}>
          Phương thức thanh toán
        </Text>
      </View>
      {RenderPay()}
      {RenderOrder()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

const styleInfoUser = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 0.5,
    borderColor: COLORS.darkgray,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  icon: {
    height: 20,
    marginLeft: 5,
    width: 20,
    tintColor: COLORS.primary,
  },
});

const styleInfoFood = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    // borderBottomWidth: 0.5,
    // borderColor: COLORS.darkgray,
  },
  time: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 1.5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
  },
  restaurant: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 1.5,
  },
  icon: {
    height: 20,
    marginRight: 10,
    width: 20,
    tintColor: COLORS.primary,
  },
  text: {
    fontWeight: 'bold',
    ...FONTS.body3,
  },
});

const stylesHeader = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: SIZES.padding,
    height: 50,
  },
  icons: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
  text: {
    ...FONTS.body2,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

const stylesOrderTotal = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  wrapItem: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
  },
  text: {
    color: COLORS.darkgray,
  },
});

const stylesOrder = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    // height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapItem: {
    margin: SIZES.padding * 2,
    height: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.darkgray,
  },
});

const stylesPay = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapItem: {
    marginVertical: SIZES.padding / 2,
    marginHorizontal: SIZES.padding,
    height: 40,
    width: 104,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.darkgray,
  },
});
