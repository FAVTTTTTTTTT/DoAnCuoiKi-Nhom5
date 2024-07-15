import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from './UserProvider';


export default function App({ navigation, route }) {
  const [userData, setUserData] = useState([])
  const { userNhanTien } = route.params || {}
  const { isChecked } = route.params || {}
  const useridbeneficiary = userNhanTien.idbeneficiary;
  const { user } = useUser();
  const { soTien } = route.params || {}
  const { info } = route.params || {}
  const [currentDateTime, setCurrentDateTime] = useState('');



  useEffect(() => {
    // Lấy ngày và giờ hiện tại
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    setCurrentDateTime(formattedDateTime);
  }, [new Date()]);
  //chỉnh tiền theo định dạng
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
  }, [])

  const updateBalanceById = (userIdToUpdate, newBalance, userList) => {
    const userAddTransaction = userList.find((user) => user.id === userIdToUpdate);
    const transaction = {
      idFlu: parseInt(userAddTransaction.fluctuation.length) + 1, // ID của giao dịch mới, có thể tăng dần
      time: currentDateTime, // Lấy ngày và giờ hiện tại
      money: parseFloat(soTien), // Số tiền của giao dịch
      info: info, // Thông tin về giao dịch
      balanceCurent: newBalance, // Số dư sau giao dịch
      receive: false
    };
    userAddTransaction.fluctuation.push(transaction);

    const idUserNhanTien = userNhanTien.stk || userNhanTien.id
    console.log(idUserNhanTien)

    // Tạo một bản sao mới của danh sách với balance đã được cập nhật
    const updatedList = userList.map(user => {
      // Kiểm tra xem user có phải là người cần cập nhật không
      if (user.id === userIdToUpdate) {
        const userBeneficiary = user.listbeneficiary.find((user) => user.stk === idUserNhanTien.toString())
        console.log(userBeneficiary)
        if (userBeneficiary === undefined) {
          const userAddBeneficiary = userList.find((user) => user.id === userIdToUpdate);
          const idBeneficiaryNew = parseInt(userAddBeneficiary.listbeneficiary.length) + 1;
          const beneficiary = {
            idbeneficiary: idBeneficiaryNew.toString(),
            name: userNhanTien.name,
            stk: userNhanTien.id.toString(),
            bank: userNhanTien.bank,
            save: isChecked
          }
          userAddBeneficiary.listbeneficiary.push(beneficiary);
          return { ...user, balance: newBalance, fluctuation: userAddTransaction.fluctuation, listbeneficiary: userAddBeneficiary.listbeneficiary };
        }
        else {
          console.log(isChecked)
          if (isChecked) {
            const updatedListBeneficiary = user.listbeneficiary.map((userTH) => {
              if (userTH.idbeneficiary === useridbeneficiary) {
                return { ...userTH, save: isChecked };
              }
              return userTH;
            });
            return { ...user, balance: newBalance, fluctuation: userAddTransaction.fluctuation, listbeneficiary: updatedListBeneficiary };
          }
          else {
            // Nếu là người cần cập nhật, thay đổi giá trị balance
            return { ...user, balance: newBalance, fluctuation: userAddTransaction.fluctuation };
          }
        }
      }
      // Nếu không phải là người cần cập nhật, giữ nguyên thông tin
      return user;
    });

    return updatedList;
  };

  const updateBalanceByIdNguoiNhan = (userIdToUpdate, newBalance, userList) => {
    const userAddTransaction = userList.find((user) => user.id === userIdToUpdate);
    const transaction = {
      idFlu: parseInt(userAddTransaction.fluctuation.length) + 1, // ID của giao dịch mới, có thể tăng dần
      time: currentDateTime, // Lấy ngày và giờ hiện tại
      money: parseFloat(soTien), // Số tiền của giao dịch
      info: info, // Thông tin về giao dịch
      balanceCurent: newBalance, // Số dư sau giao dịch
      receive: true
    };
    userAddTransaction.fluctuation.push(transaction);


    // Tạo một bản sao mới của danh sách với balance đã được cập nhật
    const updatedList = userList.map(user => {
      // Kiểm tra xem user có phải là người cần cập nhật không
      if (user.id === userIdToUpdate) {
        // Nếu là người cần cập nhật, thay đổi giá trị balance
        return { ...user, balance: newBalance, fluctuation: userAddTransaction.fluctuation };
      }
      // Nếu không phải là người cần cập nhật, giữ nguyên thông tin
      return user;
    });

    return updatedList;
  };

  const updateUserData = async () => {
    const url = 'https://api.jsonbin.io/v3/b/6561090412a5d376599e39cc';
    const apiKey = '$2a$10$p8nqUYzggVr/gs6H/e57.e5GnKtusJY.dAUTXTbSYM79koYg01cbO';
    const userIdToUpdate = user.id;     // ID của user 
    const newBalance = user.balance - soTien;       // Giá trị mới của trường balance
    let updatedData = updateBalanceById(userIdToUpdate, newBalance, userData);
    let userBIDVNhanTien = null;
    let updateBalaceNhanTien = 0;

    // Nếu người thụ hưởng thuộc ngan hàng BIDV thì sẽ tiến hành cộng tiền, nếu không phải thì không cần cộng, bàn giao cho ngân hàng khác
    if (userNhanTien.bank === 'BIDV') {
      userBIDVNhanTien = userData.find(user => user.id.toString() === userNhanTien.stk)
      updateBalaceNhanTien = parseFloat(userBIDVNhanTien.balance) + parseFloat(soTien);
      updatedData = updateBalanceByIdNguoiNhan(userBIDVNhanTien.id, updateBalaceNhanTien, updatedData);

    }
    console.log(updatedData)
    try {
      // Cập nhật dữ liệu trên JsonBin
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey,
        },
        body: JSON.stringify(
          updatedData,
        ),
      });
      if (response.ok) {

        navigation.navigate('Screen06',
          {
            userNhanTien: userNhanTien,
            soTien: soTien,
            info: info,
            date: currentDateTime
          })
      }
    } catch (error) {
      alert("Chuyển tiền thất bại")
    }

  };


  return (
    <View style={styles.container}>
      <View style={styles.viewTKNguon}>
        <View style={styles.row}>
          <Text style={styles.textGray}>Tài khoản nguồn</Text>
          <Text style={styles.textBlack}>{user.id}</Text>

        </View>
        <View style={styles.row}>
          <Text style={styles.textGray}>Tài khoản thụ hưởng</Text>
          <Text style={styles.textBlue}>{userNhanTien.stk || userNhanTien.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textGray}>Tên người thụ hưởng</Text>
          <Text style={styles.textBlue}>{userNhanTien.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textGray}>Ngân hàng thụ hưởng</Text>
          <Text style={styles.textBlue}>{userNhanTien.bank}</Text>
        </View>
      </View>
      <View style={styles.viewGray}></View>
      <View style={styles.viewMoney}>
        <View style={styles.row}>
          <Text style={styles.textGray}>Số tiền</Text>
          <Text style={styles.textBlue}>{formattedBalance}</Text>
        </View>

      </View>
      <View style={styles.viewGray}></View>
      <View style={styles.viewInfo}>
        <View style={styles.row}>
          <Text style={styles.textGray}>Ngày giao dịch</Text>
          <Text style={styles.textBlack}>{currentDateTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textGray}>Nội dung</Text>
          <Text style={[styles.textBlack, { width: '60%' }]}>{info}</Text>
        </View>
      </View>
      <View style={styles.viewGray}></View>
      <View style={styles.viewConfirm}>
        <Image source={{ uri: "https://res.cloudinary.com/dg1u2asad/image/upload/v1700235770/Nhom/next_bsylq8.png" }} style={styles.imgNext}></Image>
        <Text style={[styles.textBlack, { textAlign: 'center' }]}>Mã xác thực OTP bằng phương thức xác thực Smart OTP cho giao dịch 20098265367 được hiển thị dưới đây.</Text>
        <Text style={styles.textGray}>Mã OTP hiện tại sẽ được đổi sau 30s</Text>
        <View style={styles.row}>
          <Text style={[styles.textBlack, styles.textNumber]}>9</Text>
          <Text style={[styles.textBlack, styles.textNumber]}>5</Text>
          <Text style={[styles.textBlack, styles.textNumber]}>0</Text>
          <Text style={[styles.textBlack, styles.textNumber]}>2</Text>
          <Text style={[styles.textBlack, styles.textNumber]}>1</Text>
          <Text style={[styles.textBlack, styles.textNumber]}>3</Text>
          <Text style={[styles.textBlack, styles.textNumber]}>7</Text>
        </View>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#39B6AB', '#0382AE', '#076CAD']}
        style={styles.pressNext}>
        <Pressable
          onPress={() => updateUserData()}>
          <Text style={styles.textNext}>Xác nhận</Text>
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
  viewTKNguon: {
    width: '100%',
    alignItems: 'center',
    height: '20%',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  textGray: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: 'bold',
    fontSize: 18
  },
  textBlack: {
    fontWeight: '500',
    fontSize: 18
  },
  textBlue: {
    color: 'rgba(1, 106, 174, 0.8)',
    fontWeight: '700',
    fontSize: 18
  },
  viewMoney: {
    width: '100%',
    alignItems: 'center',
    height: '5%',
    justifyContent: 'space-between'
  },
  viewGray: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: '2%'
  },
  viewInfo: {
    width: '100%',
    alignItems: 'center',
    height: '14%',
    justifyContent: 'space-between',
  },
  imgNext: {
    width: 32,
    height: 32
  },
  viewConfirm: {
    alignItems: 'center'
  },
  textNumber: {
    borderBottomWidth: 1,
    width: 20,
    textAlign: 'center'
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
});
