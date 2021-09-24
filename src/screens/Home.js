import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, icons, SIZES, FONTS, images} from '../constants';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {getCategory, getRestaurant} from '../redux/actions/actions';

const initialCurrentLocation = {
  streetName: 'Khoa Nguyễn',
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

export default function Home({navigation}) {
  //redux
  const {category, restaurant} = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();

  //
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );
  // useEffect(() => {
  //   dispatch(getCategory());
  //   dispatch(getRestaurant());
  // }, [dispatch]);

  function onSelectCategory(item) {
    setSelectedCategory(item);
  }
  function RenderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50, paddingTop: 10}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>{currentLocation.streetName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function RenderMainCategories() {
    const renderItem = ({item}) => {
      const image = `require('../assets/icons/${item.icon}')`;
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding,
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
              marginTop: SIZES.padding,
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
          paddingVertical: SIZES.padding * 2,
        }}>
        <Text style={{...FONTS.h1, paddingHorizontal: SIZES.padding * 2}}>
          Menu
        </Text>
        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicato={false}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: SIZES.padding * 2,
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    );
  }
  function RenderRestaurantList() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          width: '100%',
          marginBottom: SIZES.padding,
          flexDirection: 'row',
          borderBottomColor: COLORS.lightGray2,
          borderBottomWidth: 1,
          backgroundColor: COLORS.white,
        }}
        onPress={() => navigation.navigate('Restaurant', {item})}>
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
          }}>
          <Text style={{...FONTS.body2, fontWeight: 'bold'}}>{item.name}</Text>
          <Text style={{...FONTS.body3}}>{item.duration}</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={restaurant}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }
  return (
    <SafeAreaView style={style.container}>
      {RenderHeader()}
      {RenderMainCategories()}
      {RenderRestaurantList()}
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
