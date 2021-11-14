import React, {memo, useEffect, useState} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../../constants';
import PropTypes from 'prop-types';
import listChooseApi from '../../redux/actions/apis/listChooseApi';
import {CheckBox} from 'react-native-elements';

const ChooseItem = memo(function ChooseItem({
  checked,
  setChecked,
  chooseItem,
  isChoose,
}) {
  const [choose, setChoose] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await listChooseApi.getListChooseById(chooseItem._id);
      setChoose(res.data.listChoose);
    })();
  }, []);

  const handleCheck = item => {
    if (!isChoose) {
      // checkbox
      setChecked(prev => {
        const isChecked = checked.includes(item);
        if (isChecked) {
          return checked.filter(checkItem => checkItem._id !== item._id);
        }
        return [...prev, item];
      });
    } else {
      // radio
      setChecked(prev => {
        const isChecked = checked.includes(item);
        if (isChecked) {
          return checked.filter(checkItem => checkItem._id !== item._id);
        }

        return [
          ...checked.filter(checkItem => checkItem.choose !== item.choose),
          item,
        ];
      });
    }
  };
  return (
    <View>
      {choose.length !== 0 ? (
        choose.map(item => (
          <View
            key={item._id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 60,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray,
              marginHorizontal: SIZES.padding,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
              <Text>
                {item.price
                  .toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                đ
              </Text>
            </View>
            <CheckBox
              center
              checkedIcon={
                <Image
                  resizeMode="cover"
                  style={{width: 20, height: 20, tintColor: COLORS.primary}}
                  source={{
                    uri: 'https://cdn-icons.flaticon.com/png/512/3031/premium/3031130.png?token=exp=1636897931~hmac=412ad30fc26cb0dc871b579de908e0c3',
                  }}
                />
              }
              uncheckedIcon={
                <Image
                  resizeMode="cover"
                  style={{width: 20, height: 20, tintColor: COLORS.primary}}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/481/481078.png',
                  }}
                />
              }
              checked={checked.includes(item)}
              onPress={() => handleCheck(item)}
            />
          </View>
        ))
      ) : (
        <View>
          <Text>kh có data</Text>
        </View>
      )}
    </View>
  );
});

ChooseItem.propTypes = {
  chooseItem: PropTypes.object,
};

export default ChooseItem;
