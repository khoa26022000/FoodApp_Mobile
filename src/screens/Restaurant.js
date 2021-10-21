import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  SectionList,
  ScrollView,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';

import {useSelector, useDispatch} from 'react-redux';
import {getFood} from '../redux/actions/foodActions';
import {getMenuByIdRestaurant} from '../redux/actions/menuActions';
import {getCombo} from '../redux/actions/comboAction';
import {getChooseBbyRestaurant} from '../redux/actions/chooseActions';
import {getListChoose} from '../redux/actions/listChooseActions';

export default function Restaurant({route, navigation}) {
  const [restaurant, setRestaurant] = useState(null);
  const [oderItems, setOderItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState();
  // const [isShow, setIsShow] = useState(true);

  //redux
  // const {food, menu, user} = useSelector(state => state.categoryReducer);
  const {food} = useSelector(state => state.food);
  const {menu} = useSelector(state => state.menu);
  const {user} = useSelector(state => state.user);
  const {combo} = useSelector(state => state.combo);
  const {listChoose} = useSelector(state => state.listChoose);
  const dispatch = useDispatch();
  const data = route.params.item;

  useEffect(() => {
    dispatch(getFood());
    dispatch(getCombo());
    dispatch(getMenuByIdRestaurant(data._id));
    dispatch(getChooseBbyRestaurant(data._id));
    dispatch(getListChoose());
  }, [dispatch, data._id]);
  useEffect(() => {
    let {item} = route.params;
    setRestaurant(item);
  }, [route.params]);

  function showPopup(foodId) {
    setModalVisible(true);
    setId(foodId);
  }
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
    let item = oderItems.reduce((a, b) => a + b.qty, 0);
    return item;
  }
  function getTotal() {
    let item = oderItems.reduce((a, b) => a + b.total, 0);
    return item.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  function RenderPopUp({foodInfo}) {
    const [foodItem, setFoodItem] = useState();
    useEffect(() => {
      const data1 = food.filter(a => a._id === foodInfo);
      setFoodItem(data1);
    }, [foodInfo]);
    console.log(foodItem);
    function renderItemListChoose({item}) {
      return (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      );
    }
    function renderItem({item}) {
      return (
        <View>
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
                {getOrderQty(item._id) > 0 ? (
                  <View style={body.slWrap}>
                    <TouchableOpacity
                      style={body.tru}
                      onPress={() => editOder('-', item._id, item.price)}>
                      <Image
                        resizeMode="cover"
                        style={body.icon}
                        source={{
                          uri: 'https://as2.ftcdn.net/v2/jpg/03/30/24/99/500_F_330249927_k8oy0p4zZqSAdxd1jxlhB0ZPT3fGLpjw.jpg',
                        }}
                      />
                    </TouchableOpacity>
                    <Text style={body.slText}>{getOrderQty(item._id)}</Text>
                    <TouchableOpacity
                      style={body.tru}
                      onPress={() => editOder('+', item._id, item.price)}>
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
                  <TouchableOpacity
                    style={body.cong}
                    onPress={() => editOder('+', item._id, item.price)}>
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
          {item.choose.map(nameChoose => (
            <View key={nameChoose._id}>
              <Text>{nameChoose.name}</Text>
              <FlatList
                data={listChoose.filter(
                  listchooseItem => listchooseItem.choose == nameChoose._id,
                )}
                keyExtractor={item => item._id.toString()}
                renderItem={renderItemListChoose}
              />
            </View>
          ))}
        </View>
      );
    }
    return (
      <View style={popup.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={popup.bottomView}>
            <View style={popup.modalView}>
              <View style={popup.header}>
                <Text> </Text>
                <Text>Thêm món mới</Text>
                <Text>X</Text>
              </View>

              <FlatList
                data={foodItem}
                keyExtractor={item => item._id.toString()}
                renderItem={renderItem}
              />
              {/* <FlatList
                // data={choose.filter(a => a._id.includes(foodItem.choose))}
                data={foodItem.choose.map((item) => item
                keyExtractor={item => item._id.toString()}
                renderItem={renderItem}
              /> */}
              {/* <ScrollView>
                <Text style={popup.modalText}>{foodItem.name}</Text>
              </ScrollView> */}
              <Pressable
                style={[popup.button, popup.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={popup.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  function RenderHeader() {
    return (
      <ImageBackground
        source={{uri: restaurant?.photo}}
        resizeMode="cover"
        style={header.imageBG}>
        <View style={header.viewHeader}>
          <TouchableOpacity
            style={styles.renderHeader}
            onPress={() => navigation.goBack()}>
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
            {getOrderQty(item._id) > 0 ? (
              <View style={body.slWrap}>
                <TouchableOpacity
                  style={body.tru}
                  onPress={() => editOder('-', item._id, item.price)}>
                  <Image
                    resizeMode="cover"
                    style={body.icon}
                    source={{
                      uri: 'https://as2.ftcdn.net/v2/jpg/03/30/24/99/500_F_330249927_k8oy0p4zZqSAdxd1jxlhB0ZPT3fGLpjw.jpg',
                    }}
                  />
                </TouchableOpacity>
                <Text style={body.slText}>{getOrderQty(item._id)}</Text>
                <TouchableOpacity
                  style={body.tru}
                  onPress={() => editOder('+', item._id, item.price)}>
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
              <TouchableOpacity
                style={body.cong}
                onPress={() => {
                  item.choose.length > 0
                    ? showPopup(item._id)
                    : editOder('+', item._id, item.price);
                }}>
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

    const renderItemCombo = ({item}) => (
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
          <Text style={body.description}>{item.descriptionCombo}</Text>
          <View style={body.priceWrap}>
            <Text style={body.price}>
              {item.lastPrice
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              đ
            </Text>
            {getOrderQty(item._id) > 0 ? (
              <View style={body.slWrap}>
                <TouchableOpacity
                  style={body.tru}
                  onPress={() => editOder('-', item._id, item.lastPrice)}>
                  <Image
                    resizeMode="cover"
                    style={body.icon}
                    source={{
                      uri: 'https://as2.ftcdn.net/v2/jpg/03/30/24/99/500_F_330249927_k8oy0p4zZqSAdxd1jxlhB0ZPT3fGLpjw.jpg',
                    }}
                  />
                </TouchableOpacity>
                <Text style={body.slText}>{getOrderQty(item._id)}</Text>
                <TouchableOpacity
                  style={body.tru}
                  onPress={() => editOder('+', item._id, item.lastPrice)}>
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
              <TouchableOpacity
                style={body.cong}
                onPress={() => editOder('+', item._id, item.lastPrice)}>
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
            marginBottom: 10,
            color: COLORS.darkgray,
          }}>
          {item.name}
        </Text>
        <FlatList
          data={food.filter(foodItem => foodItem.menu == item._id)}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItemFood}
        />
        <FlatList
          data={combo.filter(comboItem => comboItem.menu == item._id)}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItemCombo}
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
          <RenderPopUp foodInfo={id} />
        </View>
      </View>
    );
  }
  function RenderOder() {
    return (
      <View>
        {getSumItem() > 0 ? (
          <View style={order.viewWrap}>
            <View style={{paddingHorizontal: SIZES.padding * 2}}>
              <Image
                source={icons.basket}
                resizeMode="contain"
                style={order.imageCart}
              />
              <View style={order.numberCart}>
                <Text style={order.numberCartText}>{getSumItem()}</Text>
              </View>
            </View>
            <View style={order.totalPrice}>
              <Text style={order.priceText}>{getTotal()}đ</Text>
              <TouchableOpacity
                style={{
                  padding: SIZES.padding,
                  backgroundColor:
                    getSumItem() > 0 ? COLORS.primary : COLORS.darkgray,
                  alignItems: 'center',
                }}
                onPress={() => {
                  user.isAuthenticated === true
                    ? navigation.navigate('OderDelivery', {data})
                    : navigation.navigate('Login');
                }}>
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
      <ScrollView style={{flexGrow: 1}} nestedScrollEnabled={true}>
        {RenderHeader()}
        {RenderFoodInfo()}
      </ScrollView>
      {RenderOder()}
      {/* {RenderPopUp()} */}
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

const header = StyleSheet.create({
  imageBG: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 230,
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SIZES.padding,
  },
});

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

const popup = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  bottomView: {
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
