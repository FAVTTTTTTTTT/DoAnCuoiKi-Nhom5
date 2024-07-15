import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Screen08({ navigation, route }) {
    const [userData, setUserData] = useState([])
    const { user } = route.params || {}
    const [textMKC, setTextMKC] = useState('')
    const [textMKM, setTextMKM] = useState('')
    const [textMKML, setTextMKML] = useState('')
    const [showPasswordMKC, setShowPasswordMKC] = useState(false);
    const [showPasswordMKM, setShowPasswordMKM] = useState(false);
    const [showPasswordMKML, setShowPasswordMKML] = useState(false);

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

    const handleShowPassword = (x) => {
        if (x === 'mkc') {
            setShowPasswordMKC(!showPasswordMKC);
        }
        else if (x === 'mkm') {
            setShowPasswordMKM(!showPasswordMKM);
        }
        else {
            setShowPasswordMKML(!showPasswordMKML);
        }
    };


    const handlePassword = () => {
        const regax = /^(?=.*[a-zA-Z])(?=.*\d).{0,20}$/
        if (textMKC.length === 0) {
            alert("Vui lòng nhập mật khẩu cũ")
        }
        else if (user.password !== textMKC) {
            alert('Mật khẩu cũ không đúng')
        }
        else if (textMKM.trim().length === 0 || textMKML.trim().length === 0) {
            alert("Mật khẩu mới phải từ 0 đến 20 kí tự")
        }
        else if (textMKM !== textMKML) {
            alert("Mật khẩu mới không khớp với nhau")
        }
        else if (!regax.test(textMKM) || !regax.test(textMKML)) {
            alert("Mật khẩu mới không hợp lệ")
        }
        else {
            updateUserData()
        }
    };

    const updatePasswordById = (userIdToUpdate, newPassword, userList) => {
        // Tạo một bản sao mới của danh sách với password đã được cập nhật
        const updatedList = userList.map(user => {
            // Kiểm tra xem user có phải là người cần cập nhật không
            if (user.id === userIdToUpdate) {
                // Nếu là người cần cập nhật, thay đổi giá trị password
                return { ...user, password: newPassword };
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
        const newPassword = textMKM     // Giá trị mới của trường password
        let updatedData = updatePasswordById(userIdToUpdate, newPassword, userData);

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
                alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại")
                navigation.navigate('Login')
            }

        } catch (error) {
            alert("Đổi mật khẩu thất bại")
        }

    };


    return (
        <View style={styles.container}>
            <View style={styles.viewInputPassWord}>
                <View style={styles.row}>
                    <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700235770/Nhom/padlock_jjjghm.png' }} style={styles.imgIcon}></Image>
                    <TextInput
                        secureTextEntry={!showPasswordMKC}
                        value={textMKC}
                        onChangeText={setTextMKC}
                        style={styles.textGray}
                        placeholder='Mật khẩu cũ'>
                    </TextInput>
                    <Pressable onPress={() => handleShowPassword('mkc')}>
                        <Image
                            source={{
                                uri: showPasswordMKC
                                    ? "https://res.cloudinary.com/dg1u2asad/image/upload/v1700510138/Nhom/hide_cd0a9r.png"
                                    : "https://res.cloudinary.com/dg1u2asad/image/upload/v1700238352/Nhom/eye_t8ob02.png",
                            }}
                            style={{ width: 28, height: 28 }}
                            resizeMode='contain'
                        />
                    </Pressable>
                </View>
                <View style={styles.viewRegax}>
                    <Text style={styles.textBold}>Mật khẩu phải thoả mãn các điều kiện sau:</Text>
                    <Text style={styles.textGray}>Có độ dài từ 0 đến 20 kí tự.</Text>
                    <Text style={styles.textGray}>Chứa ít nhất 01 kí tự số, 01 kí tự chữ.</Text>
                    <Text style={[styles.textGray, { fontSize: 14 }]}>Ví dụ: A1, 2B, ...</Text>
                </View>
                <View style={styles.row}>
                    <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700235770/Nhom/padlock_jjjghm.png' }} style={styles.imgIcon}></Image>
                    <TextInput
                        secureTextEntry={!showPasswordMKM}
                        value={textMKM}
                        onChangeText={setTextMKM}
                        style={styles.textGray}
                        placeholder='Mật khẩu mới'>
                    </TextInput>
                    <Pressable onPress={() => handleShowPassword('mkm')}>
                        <Image
                            source={{
                                uri: showPasswordMKM
                                    ? "https://res.cloudinary.com/dg1u2asad/image/upload/v1700510138/Nhom/hide_cd0a9r.png"
                                    : "https://res.cloudinary.com/dg1u2asad/image/upload/v1700238352/Nhom/eye_t8ob02.png",
                            }}
                            style={{ width: 28, height: 28 }}
                            resizeMode='contain'
                        />
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <Image source={{ uri: 'https://res.cloudinary.com/dg1u2asad/image/upload/v1700235770/Nhom/padlock_jjjghm.png' }} style={styles.imgIcon}></Image>
                    <TextInput
                        secureTextEntry={!showPasswordMKML}
                        value={textMKML}
                        onChangeText={setTextMKML}
                        style={styles.textGray}
                        placeholder='Nhâp lại mật khẩu mới'>
                    </TextInput>
                    <Pressable onPress={() => handleShowPassword('mkml')}>
                        <Image
                            source={{
                                uri: showPasswordMKML
                                    ? "https://res.cloudinary.com/dg1u2asad/image/upload/v1700510138/Nhom/hide_cd0a9r.png"
                                    : "https://res.cloudinary.com/dg1u2asad/image/upload/v1700238352/Nhom/eye_t8ob02.png",
                            }}
                            style={{ width: 28, height: 28 }}
                            resizeMode='contain'
                        />
                    </Pressable>
                </View>
            </View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#39B6AB', '#0382AE', '#076CAD']}
                style={styles.pressNext}>
                <Pressable
                    onPress={handlePassword}
                >
                    <Text style={styles.textNext}>Đổi mật khẩu</Text>
                </Pressable>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        padding: 20
    },
    viewInputPassWord: {
        height: '60%',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%'
    },
    imgIcon: {
        width: 28,
        height: 28
    },
    textGray: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: '500',
        width: '85%',
        height: '100%'
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 16
    },
    viewRegax: {
        backgroundColor: '#D0E8F8',
        height: '45%',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10
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
})