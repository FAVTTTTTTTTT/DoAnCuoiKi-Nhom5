import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from './UserProvider';

export default function Screen03({ navigation, route }) {
  const [userDataBIDV, setUserDataBIDV] = useState([])
  const [userDataNgoaiBIDV, setUserDataNgoaiBIDV] = useState([])
  const [textSTK, setSTK] = useState('')
  const { user } = useUser();
  const [userDisplay, setUserDisplay] = useState(user.listbeneficiary.filter(item => item.bank === 'BIDV') || [])
  const [selectedButtonUser, setSelectedButtonUser] = useState('recently');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBankPressed, setIsBankPressed] = useState('BIDV');
  const [isVisible, setIsVisible] = useState('List');
  const [userBySTK, setUserBySTK] = useState()
  const [textSTKNguoiNhan, setTextSTKNguoiNhan] = useState('')
  const [selectBank, setSelectBank] = useState('')
  const [isVisibleBank, setIsVisibleBank] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/6561090412a5d376599e39cc');
        const jsonData = await response.json();
        setUserDataBIDV(jsonData.record);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/65621aed12a5d376599ea54f');
        const jsonData = await response.json();
        setUserDataNgoaiBIDV(jsonData.record);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])

  const handleReset = (x) => {
    if (x === 'reset') {
      setIsVisible('List')
      setIsBankPressed('BIDV')
      setSelectedButtonUser('recently')
      setIsVisibleBank('')
      setSTK('')
      setUserDisplay(user.listbeneficiary.filter(item => item.bank === 'BIDV') || [])
    }
  }
  const handleButtonBank = (x, y) => {
    setIsBankPressed(x)
    setSelectedButtonUser(y)
    if (x === 'BIDV') {
      setIsVisibleBank('')
      if (y === 'recently') {
        const listUserBeneficiaryBIDV = user.listbeneficiary.filter(item => item.bank === 'BIDV')
        setUserDisplay(listUserBeneficiaryBIDV)
      }
      else if (y === 'saved') {
        const listUserBeneficiaryBIDVSave = user.listbeneficiary.filter(item => item.bank === 'BIDV' && item.save)
        setUserDisplay(listUserBeneficiaryBIDVSave)
      }
    }
    else if (x === 'NgoaiTK') {
      setIsVisibleBank('viewBank')
      if (y === 'recently') {
        const listUserBeneficiaryDFBank = user.listbeneficiary.filter(item => item.bank !== 'BIDV')
        setUserDisplay(listUserBeneficiaryDFBank)
      }
      else if (y === 'saved') {
        const listUserBeneficiaryDFBankSave = user.listbeneficiary.filter(item => item.bank !== 'BIDV' && item.save)
        setUserDisplay(listUserBeneficiaryDFBankSave)
      }
    }
    else if (x === 'NgoaiST') {
      setUserDisplay(null)
    }
  }

  const searchSTK = () => {
    if (textSTK.length >= 0) {
      if (isBankPressed === 'BIDV') {
        const userFindBySTKBIDV = userDataBIDV.find(user => user.id.toString() === textSTK)
        if (userFindBySTKBIDV) {
          setUserBySTK(userFindBySTKBIDV)
          setTextSTKNguoiNhan(userFindBySTKBIDV.id)
          setSelectedUser(userFindBySTKBIDV)
          setIsVisible('BIDV')
        }
        else {
          alert("Không tìm thấy")
          setIsVisible('List')
        }
      }
      else if (isBankPressed === 'NgoaiTK') {
        if (selectBank === '') {
          alert('Vui lòng chọn ngân hàng')
        }
        else {
          const userFindBySTKNgoaiBIDV = userDataNgoaiBIDV.find(user => user.id.toString() === textSTK && user.bank === selectBank)
          if (userFindBySTKNgoaiBIDV) {
            setUserBySTK(userFindBySTKNgoaiBIDV)
            setTextSTKNguoiNhan(userFindBySTKNgoaiBIDV.id)
            setSelectedUser(userFindBySTKNgoaiBIDV)
            setIsVisible('BIDV')
          }
          else {
            alert("Không tìm thấy")
            setIsVisible('List')
          }
        }
      }
      else {
        handleButtonBank('BIDV', 'recently')
      }
    }
    else {
      handleButtonBank(isBankPressed, selectedButtonUser)
    }
  }
  const handleButtonNext = () => {
    if (selectedUser) {
      navigation.navigate(
        "Screen04",
        {
          userNhanTien: selectedUser,
          textSTKNguoiNhan: textSTKNguoiNhan
        },
      )
    }
    else {
      alert("Bạn chưa chọn người nào")
    }
  }
  const saveUser = item => {
    setSelectedUser(item)
  }
  const isSelectedUser = item => {
    return selectedUser && selectedUser.idbeneficiary === item.idbeneficiary;
  }
  const ViewBank = () => {
    if (isVisibleBank === 'viewBank') {
      return (
        <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable onPress={() => setSelectBank('TPBank')}>
            <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700909341/Nhom/tpbank_1_zi1vyp.png' }} style={{ width: 50, height: 50, backgroundColor: selectBank === 'TPBank' ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}></Image>
          </Pressable>
          <Pressable onPress={() => setSelectBank('SHB')}>
            <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700909339/Nhom/shb_1_ljjopp.png' }} style={{ width: 50, height: 50, backgroundColor: selectBank === 'SHB' ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}></Image>
          </Pressable>
          <Pressable onPress={() => setSelectBank('MBBank')}>
            <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700909336/Nhom/mbbank_1_gipxua.png' }} style={{ width: 50, height: 50, backgroundColor: selectBank === 'MBBank' ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}></Image>
          </Pressable>
          <Pressable onPress={() => setSelectBank('ACB')}>
            <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700909335/Nhom/acb_1_xsodxy.png' }} style={{ width: 50, height: 50, backgroundColor: selectBank === 'ACB' ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}></Image>
          </Pressable>
        </View>
      )
    }
    else {
      return (
        <View></View>
      )
    }
  }
  const ViewUser = () => {
    if (isVisible === 'BIDV') {
      return (
        <View style={{ width: '80%', height: '60%' }}>
          <Text style={{ fontSize: 16, color: 'rgba(1, 106, 174, 0.8)', fontWeight: 'bold' }}>{userBySTK.name}</Text>
        </View>
      );
    }
    else if (isVisible === 'List') {
      return (
        <View style={{ width: '100%', height: '60%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={styles.viewButtonSelect2}>
            <Pressable style={
              styles.pressButton2}
              onPress={() => handleButtonBank(isBankPressed, 'recently')}>
              <Text
                style={[styles.textButton2,
                {
                  color:
                    selectedButtonUser === 'recently' ? 'rgba(1, 106, 174, 0.8)' : 'rgba(0, 0, 0, 0.5)',
                }]}
              >Gần đây</Text>
            </Pressable>
            <Pressable style={
              styles.pressButton2}
              onPress={() => handleButtonBank(isBankPressed, 'saved')}>
              <Text style={[styles.textButton2,
              {
                color:
                  selectedButtonUser === 'saved' ? 'rgba(1, 106, 174, 0.8)' : 'rgba(0, 0, 0, 0.5)',
              }]}>Mẫu đã lưu</Text>
            </Pressable>
          </View>

          <View style={styles.viewUsers}>
            <FlatList style={styles.flatList}
              data={userDisplay}
              keyExtractor={(item) => item.idbeneficiary}
              renderItem={({ item }) => (
                <Pressable onPress={() => saveUser(item)}
                  style={{
                    backgroundColor: isSelectedUser(item) ? 'rgba(0, 0, 0, 0.4)' : 'transparent'
                  }}
                >
                  <View style={styles.viewUser}>
                    <Image source={{ uri: "https://res.cloudinary.com/dg1u2asad/image/upload/v1700235769/Nhom/user_lmj0jz.png" }} style={styles.imgFlower} resizeMode='contain'></Image>
                    <View style={styles.infoUser}>
                      <Text style={styles.textname}>{item.name}</Text>
                      <Text style={styles.textstk}>{item.stk}</Text>
                      <Text style={styles.textbank}>{item.bank}</Text>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#39B6AB', '#0382AE', '#076CAD']}
        style={styles.viewButtonSelect1}>
        <Pressable style={[styles.pressButton1, { backgroundColor: isBankPressed === 'BIDV' ? 'rgba(217, 217, 217, 0.5)' : 'transparent' }]}
          onPress={() => {
            handleButtonBank('BIDV', selectedButtonUser)
          }}
        >
          <Text style={styles.textButton1}>Nội bộ BIDV</Text>
        </Pressable>
        <Pressable style={[styles.pressButton1, { backgroundColor: isBankPressed === 'NgoaiTK' ? 'rgba(217, 217, 217, 0.5)' : 'transparent' }]}
          onPress={() => {

            handleButtonBank('NgoaiTK', selectedButtonUser)

          }}>
          <Text style={styles.textButton1}>Ngoài BIDV đến tài khoản</Text>
        </Pressable>
        <Pressable style={[styles.pressButton1, { backgroundColor: isBankPressed === 'NgoaiST' ? 'rgba(217, 217, 217, 0.5)' : 'transparent' }]}
          onPress={() => {
            handleButtonBank('NgoaiST', selectedButtonUser)
          }}>
          <Text style={styles.textButton1}>Ngoài BIDV đến số thẻ</Text>
        </Pressable>
      </LinearGradient>

      <SafeAreaView style={styles.viewInputSTK}>
        <TextInput
          style={styles.textSTK}
          value={textSTK}
          onChangeText={setSTK}
          placeholder='Số tài khoản/Số thẻ/Tài khoản định danh'
        ></TextInput>
        <Pressable onPress={searchSTK}>
          <Image source={{ uri: "https://res.cloudinary.com/dg1u2asad/image/upload/v1700235770/Nhom/search_tqbhzj.png" }} style={styles.imgIcon} resizeMode='contain'></Image>
        </Pressable>
        <Pressable onPress={() => { handleReset('reset') }}>
          <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700911225/Nhom/undo_ithwp6.png' }} style={{ width: 32, height: 32 }}></Image>
        </Pressable>
      </SafeAreaView>

      <ViewBank />

      <ViewUser />

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
  viewButtonSelect1: {
    width: '90%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
  },
  pressButton1: {
    width: '30%',
    height: '100%',
    marginRight: 5,
    justifyContent: 'center',
    borderRadius: 10
  },
  textButton1: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white'
  },
  viewInputSTK: {
    width: '95%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  textSTK: {
    width: '80%',
    height: '90%',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: 'bold'
  },
  imgIcon: {
    width: 30,
    height: 30
  },
  viewButtonSelect2: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    justifyContent: 'space-evenly',
  },
  pressButton2: {
    justifyContent: 'center',
    width: '33%',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  textButton2: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  },
  viewInputSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    height: '10%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,

  },
  textSearch: {
    width: '80%',
    height: '100%',
    paddingLeft: 10,
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
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
  imgFlower: {
    width: '30%',
    height: '100%'
  },
  viewUser: {
    flexDirection: 'row',
    width: '80%',
    height: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 10,
    alignSelf: 'center'

  },
  textname: {
    fontSize: 18,
    fontWeight: '700'
  },
  textstk: {
    fontSize: 16,
    fontWeight: '600'
  },
  textbank: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  viewUsers: {
    width: '100%',
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  flatList: {
    width: '100%',
    height: '100%',

  }

});
