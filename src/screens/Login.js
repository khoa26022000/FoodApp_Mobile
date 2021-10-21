import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

export default function Login({navigation}) {
  const {loginSuccess, loginFail} = useSelector(state => state.user);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loginUser());
  // }, [dispatch]);
  function HandleSubmit() {
    try {
      dispatch(loginUser(phoneNumber, password));
      console.log('dung', loginSuccess.loginSuccess);
      console.log('sai', loginFail.loginFail);
      // if (loginSuccess.loginSuccess.success === true) {
      //   Alert.alert('Thông báo', loginSuccess.loginSuccess.message);
      // } else {
      //   Alert.alert('Thông báo', loginFail.loginFail.message);
      // }
    } catch (error) {
      console.log(error);
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
        <Text style={stylesHeader.text}>Đăng nhập</Text>
      </View>
    );
  }
  function RenderForm() {
    return (
      <View>
        <View style={stylesForm.header}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/857/857681.png',
            }}
            style={stylesForm.icons}
            resizeMode="contain"
          />
        </View>
        <View>
          <View>
            <View style={stylesForm.textInput}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png',
                }}
                style={stylesForm.imageStyle}
              />
              <TextInput
                placeholder="Số điện thoại"
                dataDetectorTypes="phoneNumber"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
              />
            </View>
            <View style={stylesForm.textInput}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
                }}
                style={stylesForm.imageStyle}
              />
              <TextInput
                placeholder="Mật khẩu"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={stylesForm.bottom}
              onPress={() => HandleSubmit()}>
              <Text style={stylesForm.bottomText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={stylesForm.res}>Đăng ký tài khoản ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {RenderHeader()}
      {RenderForm()}
      {/* {RenderBottom()} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

const stylesHeader = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: SIZES.padding,
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: COLORS.darkgray,
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

const stylesForm = StyleSheet.create({
  header: {
    paddingVertical: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    height: 100,
    width: 100,
    tintColor: COLORS.primary,
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: COLORS.darkgray,
    height: 50,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: COLORS.primary,
    height: 50,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  bottomText: {
    color: COLORS.white,
    ...FONTS.h2,
    textAlign: 'center',
  },
  res: {
    color: COLORS.black,
    textAlign: 'center',
    paddingTop: SIZES.padding * 2,
  },
});
