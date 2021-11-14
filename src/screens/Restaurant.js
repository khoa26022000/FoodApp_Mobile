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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {RadioButton} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {getFood} from '../redux/actions/foodActions';
import {getMenuByIdRestaurant} from '../redux/actions/menuActions';
import {getCombo} from '../redux/actions/comboAction';
import {getChooseBbyRestaurant} from '../redux/actions/chooseActions';
import {getListChoose} from '../redux/actions/listChooseActions';
// import {selectDetailFoodCart} from './components/detailSlice';
import PopupFood from './components/PopupFood';
import ListMenuFood from './components/ListMenuFood';
import Checkout from './components/Checkout';
import {loadFoodToCart} from '../redux/actions/cartActions';

export default function Restaurant({route, navigation}) {
  const [restaurant, setRestaurant] = useState(null);
  const [chooseList, setChooseList] = useState([]);
  const [checked, setChecked] = useState([]);
  const {menu} = useSelector(state => state.menu);
  const {foodCart} = useSelector(state => state.foodCart);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const data = route.params.item;

  useEffect(() => {
    dispatch(getFood(data._id));
    dispatch(getCombo());
    dispatch(getMenuByIdRestaurant(data._id));
    dispatch(getChooseBbyRestaurant(data._id));
    dispatch(getListChoose());
    dispatch(loadFoodToCart());
  }, [dispatch, data._id]);
  useEffect(() => {
    let {item} = route.params;
    setRestaurant(item);
    handleAddChoose(checked);
  }, [route.params, checked]);

  const handleAddChoose = chooses => {
    setChooseList(prev => [...prev, ...chooses]);
  };
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

  return (
    <View style={styles.container}>
      <ScrollView style={{flexGrow: 1}} nestedScrollEnabled={true}>
        {RenderHeader()}
        <ListMenuFood
          restaurant={restaurant}
          menu={menu}
          idParams={data}
          foodCart={foodCart}
        />
      </ScrollView>
      <Checkout
        idParams={data}
        foodCart={foodCart}
        navigation={navigation}
        user={user}
      />
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
