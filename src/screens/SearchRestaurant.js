import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getRestaurantSearch} from '../redux/actions/restaurantActions';
import {COLORS, icons, SIZES, FONTS} from '../constants';
import ItemRestaurant from './components/ItemRestaurant';

export default function SearchRestaurant({route, navigation}) {
  const [key, setKey] = useState(route.params.name);
  const {restaurant2} = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurantSearch(key));
  }, [key]);

  function RenderHeader() {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 30, height: 30, tintColor: COLORS.primary}}
          />
        </TouchableOpacity>
        <View style={stylesForm.textInput}>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/622/622669.png',
              }}
              style={stylesForm.imageStyle}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Tìm kiếm địa chỉ món ăn thức uốn,.."
            onChangeText={setKey}
            value={key}
          />
        </View>
      </View>
    );
  }

  function RenderRestaurantList() {
    return (
      <View>
        {restaurant2.map(item => (
          <ItemRestaurant key={item._id} item={item} navigation={navigation} />
        ))}
      </View>
    );
  }

  return (
    <View style={style.container}>
      {RenderHeader()}
      {RenderRestaurantList()}
      {/* {RenderHistory()}
      {RenderHot()} */}
    </View>
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
    width: '90%',
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
