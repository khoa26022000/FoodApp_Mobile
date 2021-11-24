import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {cancelOrder} from '../redux/actions/orderHistoryActions';

export default function OrderDetals({route, navigation}) {
  const data = route.params.item;
  const item = data.restaurant;
  const dispatch = useDispatch();
  function getSumItem() {
    let item = data.cartFood.reduce(
      (total, cur) => total + cur.quantityFood,
      0,
    );
    let item1 = data.cartCombo.reduce(
      (total, cur) => total + cur.quantityCombo,
      0,
    );
    return item + item1;
  }
  function getTotalItem() {
    let item = data.cartFood.reduce((total, cur) => total + cur.amount, 0);
    let item1 = data.cartCombo.reduce((total, cur) => total + cur.amount, 0);
    return item + item1;
  }
  function getSTT() {
    if (data.status === 0) {
      return 'Đang xác nhận';
    } else if (data.status === 1) {
      return 'Đang giao...';
    } else if (data.status === 2) {
      return 'Thời gian giao: ';
    } else {
      return 'Thời gian hủy:';
    }
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
        <Text style={stylesHeader.text}>Chi tiết đơn hàng</Text>
      </View>
    );
  }
  function RenderInfo() {
    return (
      <View style={{margin: SIZES.padding}}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text>{data.restaurant.name}</Text>
            <Text style={{marginHorizontal: 5}}>-</Text>
            <Text>{data.restaurant.location}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginVertical: 5,
            }}>
            <Text style={styles.textGray}>
              {data.total?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              đ
            </Text>
            <Text
              style={{
                marginHorizontal: 5,
                color: COLORS.darkgray,
                fontSize: 13,
              }}>
              -
            </Text>
            <Text style={styles.textGray}>{getSumItem()} phần</Text>
            <Text
              style={{
                marginHorizontal: 5,
                color: COLORS.darkgray,
                fontSize: 13,
              }}>
              -
            </Text>
            <Text style={styles.textGray}>{data.pay.name}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles.textGray}>{data.user.profile.fullName}</Text>
            <Text
              style={{
                marginHorizontal: 5,
                color: COLORS.darkgray,
                fontSize: 13,
              }}>
              -
            </Text>
            <Text style={styles.textGray}>{data.user.phoneNumber}</Text>
          </View>
        </View>
        <Text style={{fontWeight: 'bold', marginVertical: 13}}>Giao đến</Text>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles.textGray}>{data.address}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            {data.status === 2 && 3 ? (
              <Text style={styles.textGray}>
                {getSTT()}
                {moment(data.createdAt).format('DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={styles.textGray}>Đơn hàng đang giao</Text>
            )}
          </View>
        </View>
      </View>
    );
  }
  function RenderListFood() {
    return (
      <View style={{flexDirection: 'column'}}>
        {data.cartFood.map(food => (
          <View style={styles.wrap} key={food._id}>
            <View style={styles.right}>
              <Image
                source={{uri: food.idFood?.photo}}
                resizeMode="cover"
                style={styles.icons}
              />
              <Text style={{fontWeight: 'bold'}}>{food.quantityFood}</Text>
              <Text style={{marginHorizontal: 10, fontWeight: 'bold'}}>x</Text>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {food.idFood.name}
                </Text>
                <Text style={{fontSize: 13}}>
                  {food.listChoose?.map(choose => choose._id.name).join(', ')}
                </Text>
              </View>
            </View>
            <Text style={{fontWeight: 'bold'}}>
              {food.amount
                ?.toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              đ
            </Text>
          </View>
        ))}

        {data.cartCombo.map(food => (
          <View style={styles.wrap} key={food._id}>
            <View style={styles.right}>
              <Image
                source={{uri: food.idFood?.photo}}
                resizeMode="cover"
                style={styles.icons}
              />
              <Text style={{fontWeight: 'bold'}}>{food.quantityFood}</Text>
              <Text style={{marginHorizontal: 10, fontWeight: 'bold'}}>x</Text>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {food.idFood?.name}
                </Text>
              </View>
            </View>
            <Text style={{fontWeight: 'bold'}}>
              {food.amount
                ?.toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              đ
            </Text>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            Tổng ({getSumItem()} phần)
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            {getTotalItem()
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            đ
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={styles.textGray}>Phí giao hàng</Text>
          <Text style={styles.textGray}>
            {data.ship.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ
          </Text>
        </View>
        <View style={border.borderGray}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={styles.textGray}></Text>
          <Text style={styles.textTotal}>
            {data.total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ
          </Text>
        </View>
      </View>
    );
  }
  function RenderDetail() {
    return (
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Chi tiết đơn hàng
          </Text>
          <Text style={styles.textGray}></Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={styles.textGray}>Ghi chú</Text>
          <Text style={styles.textGray}>Chưa có</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={styles.textGray}>Mã đơn hàng</Text>
          <Text style={styles.textGray}>{data._id}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={styles.textGray}>Thời gian đặt</Text>
          <Text style={styles.textGray}>
            {moment(data.createdAt).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: SIZES.padding,
          }}>
          <Text style={styles.textGray}>Phương thức thanh toán</Text>
          <Text style={styles.textGray}>{data.pay.name}</Text>
        </View>
      </View>
    );
  }

  function RenderButton() {
    function handleCancelOrder() {
      try {
        Alert.alert('Thông báo', 'Bạn có chắc muốn hủy đơn hàng ?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => dispatch(cancelOrder(data._id))},
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={{
            width: 170,
            height: 50,
            backgroundColor: COLORS.white,
            borderColor: COLORS.primary,
            borderWidth: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.primary, fontSize: SIZES.body3}}>
            Hỗ trợ
          </Text>
        </TouchableOpacity>
        {data.status === 0 ? (
          <TouchableOpacity
            onPress={handleCancelOrder}
            style={{
              width: 170,
              height: 50,
              backgroundColor: COLORS.primary,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.white, fontSize: SIZES.body3}}>
              Hủy đơn
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('Restaurant', {item})}
            style={{
              width: 170,
              height: 50,
              backgroundColor: COLORS.primary,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.white, fontSize: SIZES.body3}}>
              Đặt lại
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {RenderHeader()}
        {RenderInfo()}
        <View style={border.borderGray}></View>
        <Text style={{fontWeight: 'bold', margin: SIZES.padding}}>
          {data.restaurant.name}
        </Text>
        {RenderListFood()}
        <View style={border.borderGray}></View>
        {RenderDetail()}
      </ScrollView>
      {RenderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textGray: {
    color: COLORS.darkgray,
    fontSize: 13,
  },
  textTotal: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 17,
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
});

const stylesHeader = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: SIZES.padding,
    height: 50,
  },
  icons: {
    width: 25,
    height: 30,
    tintColor: COLORS.primary,
  },
  text: {
    ...FONTS.body2,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

const border = StyleSheet.create({
  borderGray: {
    width: '95%',
    height: 1,
    margin: SIZES.padding,
    borderBottomWidth: 0.7,
    borderColor: COLORS.darkgray,
  },
});
