import React, {memo} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ChooseItem from './ChooseItem';
import {icons, COLORS, SIZES, FONTS} from '../../constants';

const ChooseList = memo(function ListChoose({checked, setChecked, chooseList}) {
  return (
    <View>
      {chooseList.map(nameChoose => (
        <View key={nameChoose._id}>
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              height: 40,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.darkgray,
                marginHorizontal: SIZES.padding,
              }}>
              {nameChoose.name}
            </Text>
          </View>
          <View>
            <ChooseItem
              isChoose={nameChoose.choose}
              chooseItem={nameChoose}
              checked={checked}
              setChecked={setChecked}
            />
          </View>
        </View>
      ))}
    </View>
  );
});

ChooseList.propTypes = {
  chooseList: PropTypes.array,
};

export default ChooseList;
