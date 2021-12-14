import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import removeAccecssAuth from '../utils/asyncStore';
import {logoutUser} from '../redux/actions/userActions';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  function handleLogout() {
    Alert.alert('Thông báo', 'Bạn có chắc đăng xuất', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(logoutUser())},
    ]);
  }
  const {user} = useSelector(state => state.user);
  function RenderHeader() {
    return (
      <View style={header.container}>
        <View style={header.content}>
          <View style={header.user}>
            {user.isAuthenticated === true ? (
              <>
                <Image
                  source={{
                    uri: 'data:image/jpeg;base64,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',
                  }}
                  resizeMode="cover"
                  style={header.avt}
                />
                <Text style={header.name}>{user.user?.profile.fullName}</Text>
              </>
            ) : (
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPDw8QDxARDw4NDw8NEA0PDw8NDRAPFREWFxURFxUYHSggGBomGxcVITEhJSkrLi4uFx8zODMsNzQtLisBCgoKDg0OGhAQGi0dHSUtLS4rLS0tLS0rLS0tLS0tLSstLS0rKy0tLS0tLS4tLS0tLS0tLS4rLS0tLS0tKy0rK//AABEIAOEA4QMBEQACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQGBQID/8QAPRAAAgECAwUFBgQDCAMAAAAAAAECAxESITEEBVFxkQYTQbHwIjJSYYGhQnLB0aKy4RQVJDNiY4KSI0NT/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwQFBv/EAC8RAQACAgICAAQEBAcAAAAAAAABEQISAyEEMRMiQVEFM2HwFDJxkSNCgaGx0fH/2gAMAwEAAhEDEQA/ANxtO1Rp5zlhTk0tdc34cmTLOMfb6DDC46h81tsPjWqjk283HEvtmT4mH3X4c/ZC2+GX/kWeBrN/j93rYnxcPv8AuV+HP2eau8ox8XJJNtp+6lPDfN5+1lkTLmxj9SOK/oPedNYr1LOnHHNPF7Csn7XB5rI6ceHPKImI9+nNlzcWMzEzHXt4lvWCqVIOaSpw7xyxt6ZyVvkrP6mz+Hz1jKvbD+J4t5xmuo/9WZbSla80rpNXlbJ+Jy5ZRjNTLqxw2i4h6hWUvdle3B3LGUT6lZwr3D1ifF9WVjrBifF9WDWDE+L6sGsGJ8X1YNYMT4vqwawYnxfVg1gxPi+rBrBifF9WDWDE+L6sGsGJ8X1YNYMT4vqwawYnxfVg1gxPi+rBrBifF9WDWDE+L6sGsGJ8X1YNYMT4vqwawYnxfVg1gxPi+rBrBifF9QawtYnxfUrmpy94bL3rhnZQqOUrNxlbDJWTXM0cvHvTt489YVP7rtUxRaUVODUcUrKEaeG1tLmufH+a4/fTZ8Xqv37fGluuUo4ZtWi6VP8AErwp3vLNau5hj48zFT+kf2WeWp6ev7rnhinOLbi4Tln/APbvMS+Zf4fKquP1/vZ8WL9fuqfLaN0VX30I1IqnV/tErOU1eVWzWKNrOzvnwPbx8njrGZjuK/2/7eJn4XL82OOXyzt9/eX3j9EbRuWcu8ipQwP+0zg/axY60MNpZaLP7GWPl4R3XfV/0iUy8HkyiYuK7r+sx/w6r2OLSxXbwxi83bJW/V9WeXyceOeUzL1uPLLDGIfShQjTTUVa+bzbGHHjh/KueeWft9TNiAAAACLgLgLgSAAAAAAAAAAAAEAWyuVUnq+bMXTHqEBQAAAAAAAAAAJBJyiPa/Q3RVnnZQX+p2fQrlz8zDHqO1uHZ9+NTpH+oaJ86fs9Ps//ALn8P9QkedP2fCpuKa92UZdYhsx83H6wo19iqU/eg0viWceqDpw8jjy+r4IltwAAAAAAAAAAALZXKqz1fNmLpj1CAoAAAAAAABMIOTtFNt6JK7DHLOMYuXQo7kqy1ww5u7+xXJn5mP0dvYd3QpJWV5eM3q/2Dg5ObLOe1ywakgAIsAaA5m3bohUu4LBPivdfNCXTw+TlhPfcM7XpShJxkrSRHq8fJGcXDwGYAAAAAAAAAt3K5VOer5sjpx9QgKAAAAAAAAnqGp3LsSp003780nJ8F4IsPG8jlnPL9HSDnAAAAAAAAKG9dgVWDt78VeL/AEDdwcs8eX6Mo1ZtPJrJoj2sZjKLhAUAAAAAAAAtlcyrPV82R0Y+oRcMi4C4C4C4C4C4H02anjqQj8Uor7hq5prCZbWJXhPQAAAAAAAACGBl9/bPgq4lpUWL/ktf0D1fC5Nsdfs5tyOwuFLgLgLgLgLgLgWyuRSnq+bMbdOPqEC1BYCwFgLAWAsW90K9el+a/RMQ5/Jn/DlsomTxUhQAAAAAAAABx+01O9JS8YTWfyd1+wdnhZVyV+jMGNvVtIssFlgssFlgssFloFi6W3MqTeb5sjbEdQ83C0XBRcFFwUXBRcFFwL+43/iKfOX8rEObyvy5bAyeSBQAAAAAAAABzO0El3E0/HDb5vEg3+NfxIZK5i9ei4KguCoLgqC4KguCoLgqC4KXg5lOer5sOiPUPIXoB0A6AdAOgHQBe3I/8RT5y/lYj25/K/LlsUZPISFAAAAAAAAIYGO33NuvUTbai0km7pKy0JL1fFiIwiVEjp6AdAOgHQDoB0A6AdLwcylPV82G+PUICgAAAAAALe6XavS/OvJiPbT5H5ctojJ46QoAAAAAAABDAxW9ZXr1fzv9jGXr+P1xwq3I3WXBZcFlwWXBZcFlwWi4F+5XOoz1fN+ZG2PTyFsBYCwFgLAWAtZ3an31JpOyqRu0m7ZmUNXNlGkxbcIryEhQAAAAAAACGBhtvv3tRtNXnNq6tliZjL1eHKNYhXI3WCy5BZcgsuQWXILLkFlyAteK0qc9XzfmRnE9IC2AsBYCwFgLAky2W5qSjQp2/FFSfzbzMoeVy5TOS+VgAAAAAAAAAAHJ7R0k6DlleDi0+bs19yS3cEzGcMoYvTsBYCwFgLAWAsCWvFa7UZyzfN+PzIR6Rf1cKX9XAX9XAX9XAX9XAX9XAjEC2w7PVcWzw4xbh0eX2sZQ87mis3TK1gAAAAAAAAABxe1NXDSjH45ros/OxJbuCPmZfF6uYu+y/q4C/q4C/q4C/q4C/q4C/q4EX9XCL+INahU1fNlIy6QF2AbANgGwDYBsgGzQ9lK+dSm/lNeT/QsObni5tpCucAAAAAAAAAAMn2n2jFVUF/64585Z+ViS6OGOrccjpsBsA2AbANgGwDZANnQDValU1fNgt5BYCwFgLAWAsBb77FtTozjOOsfB6NPVBjlETDY7r23v6eO2HNxavezRYc0xS4VAAAAAAAAChvfb+4gpJYm5KKTdlo8wyxxtja9VzlKcvek3JkdOPUU8EWwFgLAWAsBYCwFr4YKNTV835imFoGpYNSwalg1LBqWDUsGpYKLaHsnX/wAynyqLyf6Fhhl20ZWAAAAAAAABmu1lb2qUOCc39XZeTDPBwDGmdg1LBqWDUsGpYNSwalg1LC0WviktSqavm/MrVbyCwFgLAWAsBYCwFrO7tp7qrCfgnaX5Xr6+QLbmEk0mndPNNaNAegAAAAAAQ2Bht6bT3tac/C9o/lWS/f6gtVBYCwFgLAWAsBYCwFr4LVKkc3zfmKaNnnCKNjCKNjCKNjCKNjCKNjCKNjCKNjCKNjCWjZqOzNaUqcot3UJWj8k1exG3GbdoMgAAAAAOb2hqyjQlhdsTUG/HC9QxymmPwlpq2MJKNjCKNjCKNjCKNjCKNjCKNjCKNjCKNjCKNl+xaXaVOer5vzK07IBsA2AbANgGwDYBsA2AbNN2XjalJ8aj+yRJb+LuHaI2gAAAAAc3tBG+zz+WF/xIsMM/TIlc2wDYBsA2AbANgGwDYBsA2XrhstSqavm/MtOeckFTYBsA2AbANgGwDZANgiW1+4KeHZ4f6sUury+1jGXbw/yukRtAAAAAArbypY6NSPi4StztkI9sc46YdGbz4lJV2AbANgGwDYBsA2AbIJRsvhs3Up6vm/My1lxzLyNZTYGsmwNZNgaybA1k2BrJsDWTYGsmz1Tg5NRWsmkubZJhnh3Ld0KeCMYrSMVHojW9XGKh9AyAAAAAAhoJLDbdQdOpOD8JO3LVfY2RFvL5flymHwLrLVsDWTYGsmwNZNgaybA1k2BrJsDWTYGsmy+Sm/pTnq+b8zZDjmYtATaAG0ANoAbQA2gBtAJLhMIOTtFOTfgldkuFiJynpoty7pcH3lT3/wAMdcPzfzNcy9Lx/H1+bJ2zB2pAAAAAAAA5W+N198sUcqkVbPSS4MyiacvkcHxIuPbMVqUoPDOLi+DNsTbzJwyx6yeCsbgKXARNoAbQA2gBtADaAG0LpHTtCpPV835mTzpnuXktpYLLBZZcWWXFlpim3ZJtvRK7bJMrjGWXqHW2LcM5WdR4I/Cs5P8AY15ZPR4fBme8nf2TYoUlaEUr6vWT5s129PDixw9QskbAAAAAAAAAAA+G07LGorTipL5ry4FiWGeEZRUuHt24Gruk7r4Ja/R/uZ45vO5vC+uDi1Kcou0k4vg7pm2Jt5ucZY+3m5WFlxZYLLBZYLLCFrxHWpTWb5vzLTzss+0WLSblhRuWFG4lfJK7eiWbJTLG8pqHW2Hcc551PYjrb8T/AGMJzp6XB4GWXebvbHsMKS9iNn4y1k/qapyetx8GGHpbsRuAAAAAAAAAAAAAAAK+07JCorTipL7r6mUTTVnw4Z+3C27cElnSeJfC8n9H4mcZ/d5fP+Hz7wcacHFtSTTWqeTNkdvLyxyw6y6QWmOxYUm5YUbliUbrxHZupz1fNmyHnZT3KAlgLX9g3VOrZ+7D4nq+SNeWcR6eh43g58vc9Q0WxbuhSXsr2vjecmaZymXu8Pi4cUdR2uJGLoSFAAAAAAAAAAAAAAAAACGgK217FCqrTV+D0kuTMoymGnl8fDlisoZ7b9zTp3lD24L/ALJcjbjn93heT+H54d4dw5htt5oEsBa6YO1Tnq+bNrz8svmlFiSkTtNR7d/dW5rWnVV3qoPRcznzzfQeD+HRj83JDvJGp7MRXUJCgAAAAAAAAAAAAAAAAAAAAAENAcjeu51NOUElPW2il/U2Y599vL838Px5MZywipZqcHFtNWayaOmHzWd4Trl7QVjuumFO+1aer5s2PLzy+aXX3BsWJ97JXUXaF+PizRy5/R7v4R4cZf4uX+jRJHO+jSAAAAAAAAAAAAAAAAAAAAAAAAAIYHE7QbDdd7FZxti+ceP0N3Fn3TxPxXw9sPiY+4Z86XzE5LtzB6VqjV5WXi7fcz+jzoiMuSvvLZ7HRVOEYr8KSOLKbl93wcccfHGMPuYtwAAAAAAAAAAAAAAAAAAAAAAAAAAHirBSTTzTVhHTHPGMomJYnaKeCco/C2vod2M3Fvg/K4/h8s4rFzGnXb6Uvfj+deZf8rLj/Nj+rVxOJ9j9ISAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMvvH/ADZ8/wBDrw/lh8n5v5+SCK//2Q==',
                }}
                resizeMode="cover"
                style={header.avt}
              />
            )}
            {/* <Text>Tên đăng nhập</Text> */}
          </View>
          {user.isAuthenticated === true ? null : (
            <TouchableOpacity
              style={header.btnLogin}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={header.textLogin}>Đăng nhập/Đăng ký</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
  function RenderBody() {
    return (
      <View>
        <View style={body.container}>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/879/879767.png',
              }}
            />
            <Text>Ví cửa hàng:</Text>
            <Text style={{paddingLeft: 5}}>{user.user?.myCoin} Điểm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/927/927667.png',
              }}
            />
            <Text>Địa chỉ:</Text>
            <Text style={{paddingLeft: 5}}>{user.user?.profile.address}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2099/2099058.png',
              }}
            />
            <Text>Cài đặt</Text>
          </TouchableOpacity>
        </View>
        <View style={body.container}>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/879/879767.png',
              }}
            />
            <Text>Ví cửa hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/927/927667.png',
              }}
            />
            <Text>Địa chỉ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2099/2099058.png',
              }}
            />
            <Text>Cài đặt</Text>
          </TouchableOpacity>
        </View>
        <View style={body.container}>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/879/879767.png',
              }}
            />
            <Text>Ví cửa hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/927/927667.png',
              }}
            />
            <Text>Địa chỉ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.btn}>
            <Image
              resizeMode="cover"
              style={body.icon}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2099/2099058.png',
              }}
            />
            <Text>Cài đặt</Text>
          </TouchableOpacity>
        </View>
        {user.isAuthenticated === true ? (
          <TouchableOpacity
            style={body.btnLogout}
            onPress={() => handleLogout()}>
            <Text style={body.textLogout}>Đăng xuất</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {RenderHeader()}
      {RenderBody()}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

const header = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: 150,
    position: 'relative',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 15,
    position: 'absolute',
    paddingHorizontal: SIZES.padding * 2,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avt: {
    borderRadius: 50,
    width: 60,
    height: 60,
    marginRight: SIZES.padding,
  },
  btnLogin: {
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 5,
  },
  textLogin: {
    color: COLORS.primary,
  },
  name: {
    color: COLORS.white,
    ...FONTS.body2,
  },
});

const body = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: SIZES.padding,
  },
  btn: {
    backgroundColor: COLORS.white,
    height: 50,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: SIZES.padding,
    tintColor: COLORS.primary,
  },
  btnLogout: {
    padding: 12,
    backgroundColor: COLORS.primary,
    margin: SIZES.padding,
    borderRadius: 5,
  },
  textLogout: {
    color: COLORS.white,
    textAlign: 'center',
  },
});
