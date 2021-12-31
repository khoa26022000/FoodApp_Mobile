import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import {COLORS, icons, SIZES, FONTS} from '../constants';
import moment from 'moment';
import RNRestart from 'react-native-restart';
//redux
import {useSelector, useDispatch} from 'react-redux';
// import {getCategory, getRestaurant} from '../redux/actions/actions';
import {getCategory} from '../redux/actions/categoryActions';
import {getRestaurant} from '../redux/actions/restaurantActions';
import {loadUser} from '../redux/actions/userActions';
import {getRestaurantCategory} from '../redux/actions/restaurantActions';
import {getRestaurantHaversine} from '../redux/actions/restaurantActions';
import {getRestaurantDiscount} from '../redux/actions/restaurantActions';
import {changeAddress} from '../redux/actions/userActions';

import ItemRestaurant from './components/ItemRestaurant';

const imageSlider = [
  'https://image.thanhnien.vn/w1024/Uploaded/2021/bfznsfyr-bn/2021_10_02/1-1223.png',
  'https://image.thanhnien.vn/w1024/Uploaded/2021/bfznsfyr-bn/2021_10_02/3-5929.jpeg',
  'https://photo-cms-ngaynay.zadn.vn/w890/Uploaded/2021/uncdwpjwq/2021_09_12/kv-9530.jpg',
  'http://vouchers.vn/wp-content/uploads/2019/11/huong-dan-cach-mua-nowfood-0%C4%91.png',
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Home({navigation}) {
  //redux
  // const {category} = useSelector(state => state.categoryReducer);
  const {category} = useSelector(state => state.category);
  const {restaurant} = useSelector(state => state.restaurant);
  const {restaurant1} = useSelector(state => state.restaurant);
  const {restaurantDiscount} = useSelector(state => state.restaurant);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  //
  const [imageActive, setImageActive] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputAddress, setInputAddress] = useState(true);
  const [address, setAddress] = useState();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getRestaurant());
    // dispatch(loadUser());
    dispatch(getRestaurantDiscount());
    if (user.user?.profile.lat != null) {
      dispatch(
        getRestaurantHaversine(user.user?.profile.lat, user.user?.profile.lng),
      );
    }
  }, [dispatch, user.user?.profile.lat]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  function onSelectCategory(item) {
    dispatch(getRestaurantCategory(item._id));
    setSelectedCategory(item);
  }
  function getAllRestaurant() {
    dispatch(getRestaurant());
    setSelectedCategory(null);
  }
  function HandleChangeAddress(address) {
    dispatch(changeAddress(address));
    setAddress('');
    setInputAddress(!inputAddress);
    // RNRestart.Restart();
  }

  function RenderHeader() {
    return (
      <View
        style={{
          flexDirection: 'column',
          padding: 10,
          backgroundColor: COLORS.white,
        }}>
        <View>
          <Text>Giao hàng đến: </Text>
        </View>
        {inputAddress ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingVertical: 5,
            }}>
            <Image
              resizeMode="cover"
              style={{
                height: 20,
                marginRight: 5,
                width: 20,
                tintColor: COLORS.primary,
              }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/927/927667.png',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setInputAddress(!inputAddress);
              }}>
              <Text>
                {user.isAuthenticated === true
                  ? user.user?.profile.address
                  : 'Địa chỉ giao hàng'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={(stylesForm.textInput, {paddingBottom: 10})}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                backgroundColor: COLORS.lightGray,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setInputAddress(!inputAddress);
                  setAddress('');
                }}>
                <Image
                  source={{
                    uri: 'https://cdn-icons.flaticon.com/png/512/3031/premium/3031157.png?token=exp=1639816963~hmac=e9a4fa11624b4fc6cb36c63ac3861e65',
                  }}
                  style={{
                    marginLeft: 10,
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch',
                    alignItems: 'center',
                    tintColor: COLORS.black,
                  }}
                />
              </TouchableOpacity>
              <TextInput
                style={{color: COLORS.black, width: '78%'}}
                placeholder="Nhập địa chỉ"
                value={address}
                onChangeText={setAddress}
              />

              <TouchableOpacity onPress={() => HandleChangeAddress(address)}>
                <Image
                  source={{
                    uri: 'https://cdn-icons.flaticon.com/png/128/1055/premium/1055183.png?token=exp=1639820775~hmac=b430db991089605ea2fb4f859060fff5',
                  }}
                  style={stylesForm.imageStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={stylesForm.textInput}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/622/622669.png',
              }}
              style={stylesForm.imageStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={{color: COLORS.darkgray}}>
              Tìm kiếm địa chỉ món ăn thức uốn,..
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function RenderSlider() {
    const onchange = nativeEvent => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== imageActive) {
          setImageActive(slide);
        }
      }
    };

    return (
      <View>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          pagingEnabled
          horizontal
          style={{width: WIDTH, height: HEIGHT * 0.2}}>
          {imageSlider.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={{width: WIDTH, height: HEIGHT * 0.2}}
              source={{
                uri: e,
              }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
  function RenderMainCategories() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            // paddingBottom: SIZES.padding,
            backgroundColor:
              selectedCategory?._id == item._id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...style.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?._id == item._id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={{
                uri: item.icon,
              }}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <Text
            style={{
              // marginTop: SIZES.padding,
              color:
                selectedCategory?._id == item._id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          marginVertical: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity onPress={() => getAllRestaurant()}>
          <Text
            style={{
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding / 2,
              color: COLORS.primary,
              fontSize: SIZES.body3,
            }}>
            Xem tất cả
          </Text>
        </TouchableOpacity>

        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicato={false}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.padding,
          }}
        />
      </View>
    );
  }
  function RenderRestaurantList() {
    return (
      <View>
        {restaurant.map(item => (
          <ItemRestaurant key={item._id} item={item} navigation={navigation} />
        ))}
      </View>
    );
  }
  function RenderRestaurantHaversine() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            marginRight: SIZES.padding,
            ...style.shadow,
          }}
          onPress={() => navigation.navigate('Restaurant', {item})}>
          <Image
            source={{uri: item.photo}}
            resizeMode="cover"
            style={{
              height: 120,
              width: 100,
            }}
          />
          <View>
            <Text
              style={{
                width: 100,
                textAlign: 'center',
                ...FONTS.body4,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        {restaurant1.length === 0 ? null : (
          <View
            style={{
              // marginVertical: SIZES.padding,
              marginTop: SIZES.padding,
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => getAllRestaurant()}>
                <Text
                  style={{
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    color: COLORS.primary,
                    fontSize: SIZES.body3,
                  }}>
                  Cửa hàng gần bạn
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    color: COLORS.darkgray,
                    fontSize: SIZES.body4,
                  }}>
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={restaurant1}
              horizontal
              showsHorizontalScrollIndicato={false}
              keyExtractor={item => `${item._id}`}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.padding,
              }}
            />
          </View>
        )}
      </View>
    );
  }

  function RenderRestaurantDiscount() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            marginRight: SIZES.padding,
            ...style.shadow,
          }}
          onPress={() =>
            navigation.navigate('Restaurant', {item: item.restaurant})
          }>
          <Image
            source={{uri: item?.photo}}
            resizeMode="cover"
            style={{
              height: 120,
              width: 100,
            }}
          />
          <View>
            <Text
              style={{
                width: 100,
                textAlign: 'center',
                ...FONTS.body4,
                fontWeight: 'bold',
              }}>
              {item?.nameDiscount}
            </Text>
          </View>
          <View>
            <Text
              style={{
                width: 100,
                textAlign: 'center',
                ...FONTS.body4,
                color: COLORS.primary,
              }}>
              {`Từ ${moment(item?.date1).format('DD/MM')}\n Đến ${moment(
                item?.date2,
              ).format('DD/MM')}`}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        {restaurantDiscount.length === 0 ? null : (
          <View
            style={{
              // marginVertical: SIZES.padding,
              marginTop: SIZES.padding,
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    color: COLORS.primary,
                    fontSize: SIZES.body3,
                  }}>
                  Bộ sưu tập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding / 2,
                    color: COLORS.darkgray,
                    fontSize: SIZES.body4,
                  }}>
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={restaurantDiscount.filter(x => x)}
              horizontal
              showsHorizontalScrollIndicato={false}
              keyExtractor={item => `${item?._id}`}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingHorizontal: SIZES.padding,
                paddingBottom: SIZES.padding,
              }}
            />
          </View>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView style={style.container}>
      {RenderHeader()}
      <ScrollView>
        {RenderSlider()}
        {RenderRestaurantDiscount()}
        {RenderRestaurantHaversine()}
        {RenderMainCategories()}
        {RenderRestaurantList()}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

const stylesForm = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    backgroundColor: COLORS.lightGray,
  },
  imageStyle: {
    margin: 10,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
    tintColor: COLORS.black,
  },
});
