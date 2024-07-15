import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect} from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, Image,CheckBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from './UserProvider'; 
export default function App({ navigation, route }) {
  const { user } = useUser();
  const { userNhanTien } = route.params || {}
  // const { userChuyenTien } = route.params || {}
  const [textMoney, setTextMoney] = useState('')
  const [textInformation, setInformation] = useState(user.name + ' chuyen tien')
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userChuyenTienNew, setUserChuyenTienNew] = useState(user)

  const formattedBalance = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(user.balance).replace(/₫/g, 'VND');

  const handleButtonNext = () => {
    if (textMoney === '') {
      alert("Bạn chưa nhập số tiền")
    }
    else if(parseFloat(textMoney)<10000){
      alert("Số tiền chuyển không được nhỏ hơn 10.000 VND")
    }
    else if(parseFloat(textMoney) > user.balance){
      alert("Số dư không đủ")
    }
    else {
      navigation.navigate(
        "Screen05",
        {
          isChecked: isChecked,
          userNhanTien: userNhanTien,
          soTien: textMoney,
          info:textInformation,
        },
      )
    }
  }
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };
  const ViewCheckBox = () => {
    if (isVisible) {
      return (
        <View style={styles.viewSave}>
          <CheckBox value={isChecked} onValueChange={toggleCheckBox} />
          <Text style={[styles.textLabel, { width: '90%' }]}>Lưu người thụ hưởng</Text>
        </View>
      );
    }
    else {
      return (
        <View></View>
      );
    }
  }
  const setVisibility = () => {
    if (userNhanTien.save) {
      setIsVisible(false)
    }
    else {
      setIsVisible(true)
    }
  }
  useEffect(() => {
    setVisibility();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#39B6AB', '#0382AE', '#076CAD']}
        style={styles.buttonlinear}>
        <Pressable style={styles.pressUser}>
          <Image source={{ uri: "https://res.cloudinary.com/dg1u2asad/image/upload/v1700235769/Nhom/user_lmj0jz.png" }} style={styles.imgUser1} resizeMode='contain'></Image>
          <View style={styles.rowInfo1}>
            <Text style={styles.textSTK}>{user.id}</Text>
            <Text style={styles.textMoney1}>{formattedBalance}</Text>
          </View>
        </Pressable>
      </LinearGradient>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#39B6AB', '#0382AE', '#076CAD']}
        style={styles.buttonlinear}>
        <Pressable style={styles.pressUser}>
          <View style={styles.rowInfo2}>
            <Text style={styles.textSTK}>{userNhanTien.stk || userNhanTien.id}</Text>
            <Text style={styles.textName}>{userNhanTien.name}</Text>
          </View>
          <Image source={{ uri: "https://res.cloudinary.com/dg1u2asad/image/upload/v1700235769/Nhom/flower_kbyowa.png" }} style={styles.imgUser2} resizeMode='contain'></Image>
        </Pressable>
      </LinearGradient>

      <SafeAreaView style={styles.viewInput}>
        <View style={styles.colum1}>
          <Text style={styles.textLabel}>Số tiền</Text>
          <TextInput
            style={styles.textInputMoney}
            value={textMoney}
            onChangeText={setTextMoney}
          ></TextInput>
        </View>
        <Text style={styles.textVND}>VND</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.viewInput}>
        <View style={styles.colum2}>
          <View style={styles.row}>
            <Text style={styles.textLabel}>Nội dung giao dịch</Text>
            <Text style={styles.textCount}>28/120</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.textInputMoney}
              value={textInformation}
              onChangeText={setInformation}
            ></TextInput>
            <Image source={{ uri: "https://res.cloudinary.com/dg1u2asad/image/upload/v1700235770/Nhom/remove_nd8dcq.png" }} style={styles.imgIcon} resizeMode='contain'></Image>
          </View>
        </View>
      </SafeAreaView>
      <ViewCheckBox />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#39B6AB', '#0382AE', '#076CAD']}
        style={styles.pressNext}>
        <Pressable
          onPress={handleButtonNext}
        >

          <Text style={styles.textNext}>Tiếp tục</Text>
        </Pressable>
      </LinearGradient>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonlinear: {
    width: '90%',
    height: '18%',
    borderRadius: 20,
    alignItems: 'center'
  },
  pressUser: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    height: '100%',
  },
  imgUser1: {
    width: '30%',
    height: '60%',
  },
  rowInfo1: {
    width: '60%',
  },
  textSTK: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white'
  },
  textMoney1: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white'
  },
  rowInfo2: {
    alignItems: 'flex-end',
    width: '70%',
  },
  textName: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white'
  },
  imgUser2: {
    width: '30%',
    height: '60%',
    marginLeft: 20
  },
  viewInput: {
    flexDirection: 'row',
    width: '90%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)'
  },
  textInputMoney: {
    width: '100%',
    fontSize: 18,
    fontWeight: '600'
  },
  colum1: {
    flexDirection: 'column',
    width: '80%',
  },
  textLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
  },
  textVND: {
    color: '#016AAE',
    fontSize: 18,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imgIcon: {
    width: 18,
    height: 18,
  },
  colum2: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textCount: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)'
  },
  pressNext: {
    width: '90%',
    height: '7%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textNext: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  },
  viewSave: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  textLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
  },
});
