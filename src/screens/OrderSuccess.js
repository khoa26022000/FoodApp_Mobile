import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SIZES, COLORS, icons} from '../constants';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function OrderSuccess({navigation, route}) {
  const mapView = useRef();
  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let {restaurant, user} = route.params;
    let street = user.profile.address;

    let fromLoc = {
      latitude: Number(user.profile.lat),
      longitude: Number(user.profile.lng),
    };
    let toLoc = {
      latitude: Number(restaurant.lat),
      longitude: Number(restaurant.lng),
    };

    let mapRegion = {
      latitude: (Number(user.profile.lat) + Number(restaurant.lat)) / 2,
      longitude: (Number(user.profile.lng) + Number(restaurant.lng)) / 2,
      latitudeDelta:
        Math.abs(Number(user.profile.lat) - Number(restaurant.lat)) * 2,
      longitudeDelta:
        Math.abs(Number(user.profile.lng) - Number(restaurant.lng)) * 2,
    };
    console.log('okok', Number(user.profile.lat));
    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  function RenderMap() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.pin}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}>
        <Image
          source={icons.car}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );

    return (
      <View style={{flex: 1}}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{width: 400, height: 550}}>
          {destinationMarker()}
          {fromLocation ? carIcon() : null}
        </MapView>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      {RenderMap()}
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <Text style={{fontSize: SIZES.body2, fontWeight: 'bold'}}>
          Đặt hàng thành công
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            width: 250,
            height: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginVertical: 20,
          }}
          onPress={() => navigation.navigate('Tabs')}>
          <Text style={{color: COLORS.white, fontSize: SIZES.body2}}>
            Tiếp tục đặt hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            width: 250,
            height: 60,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('Order')}>
          <Text style={{color: COLORS.white, fontSize: SIZES.body2}}>
            Xem đơn hàng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
