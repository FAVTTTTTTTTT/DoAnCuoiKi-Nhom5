import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from './UserProvider';

export default function App({ navigation, route }) {
  const [userData, setUserData] = useState([])
  const { user, updateUser } = useUser();
  // const { user } = route.params || {}
  const { userNhanTien } = route.params || {}
  const { soTien } = route.params || {}
  const { info } = route.params || {}
  const { date } = route.params || {}
  const formattedBalance = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(soTien).replace(/₫/g, 'VND');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/6561090412a5d376599e39cc');
        const jsonData = await response.json();
        setUserData(jsonData.record);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
   

  }, [userData])


  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.userImg}>
          <Image style={{ width: 220, height: 80, borderRadius: 5 }} resizeMode='contain' source={{ uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1700509898/DeTaiBIDV/image-removebg-preview_3_wdc5vb.png" }} />
        </View>
        <View style={styles.notify}>
          <Text style={styles.text}>Quý khách đã chuyển thành công số tiền
            <Text style={styles.textColor}> {formattedBalance}</Text> đến số tài khoản
            <Text style={styles.textColor}> {userNhanTien.stk || userNhanTien.id}/  {userNhanTien.name}/ {userNhanTien.bank}</Text> vào lúc {date}. Nội dung: {info} </Text>
          <Text style={styles.text}>.....................</Text>
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={
              () => {
                updateUser(userData.find(user1 => user1.id.toString() === user.id))
                navigation.navigate(
                  "Home"
                )
              }
            }
          >
            <Text style={styles.textHome}>Trang chủ</Text>
          </Pressable>
        </View>
      </View >
      <View style={styles.viewButtonNew}>
        <Pressable onPress={
          () => {
            updateUser(userData.find(user1 => user1.id.toString() === user.id))
            navigation.navigate(
              "Screen03"
            )
          }
        }
        >
          <Text style={styles.textNew}>Tạo giao dịch mới</Text>
        </Pressable>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#0CB1AF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%'
  },
  body: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%'
  },
  userImg: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',

  },
  textColor: {
    color: '#036BAD'
  },
  notify: {
    display: 'flex',
    alignItems: 'center',
    width: '90%'
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: '#0287AE',
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHome: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  viewButtonNew: {
    backgroundColor: '#fff',
    height: 40,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNew: {
    color: '#0287AE',
    fontSize: 16,
    fontWeight: 'bold'
  }

});
