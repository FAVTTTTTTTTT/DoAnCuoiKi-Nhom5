import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, Image, Pressable, Modal, TouchableWithoutFeedback, SafeAreaView, FlatList, Button } from 'react-native';
const Footer = ({ state }) => {
    const navigation = useNavigation();
    const [imageSelectHome, setImageSelectHome] = useState('')
    const [imageSelectNotice, setImageSelecNotice] = useState('')
    const [imageSelectSetting, setImageSelecSetting] = useState('')
    const [showFooter, setShowFooter] = useState(true);

    const openFooter = () => {
        const currentRoute = state.routes[state.index].name;
        console.log(currentRoute)
        if (currentRoute === 'Home') {
            setShowFooter(true);
            setImageSelectHome('https://res.cloudinary.com/doqbelkif/image/upload/v1700207282/DeTaiBIDV/home_seynra.png');
            setImageSelecNotice('https://res.cloudinary.com/doqbelkif/image/upload/v1700932668/DeTaiBIDV/ringing-bell_gsrt6i.png');
            setImageSelecSetting('https://res.cloudinary.com/doqbelkif/image/upload/v1700932674/DeTaiBIDV/settings_tvuili.png');
        }
        else if (currentRoute === 'Screen07') {
            setShowFooter(true);
            setImageSelectHome('https://res.cloudinary.com/doqbelkif/image/upload/v1700927195/DeTaiBIDV/home_1_qibla4.png');
            setImageSelecNotice('https://res.cloudinary.com/doqbelkif/image/upload/v1700932668/DeTaiBIDV/ringing-bell_gsrt6i.png');
            setImageSelecSetting('https://res.cloudinary.com/doqbelkif/image/upload/v1700932672/DeTaiBIDV/settings_1_kmdpkc.png');
           
           
        }
        else if (currentRoute === 'Announcement') {
            setShowFooter(true);
            setImageSelectHome('https://res.cloudinary.com/doqbelkif/image/upload/v1700927195/DeTaiBIDV/home_1_qibla4.png');
            setImageSelecNotice('https://res.cloudinary.com/doqbelkif/image/upload/v1700932670/DeTaiBIDV/ringing-bell_1_ts4hfx.png');
            setImageSelecSetting('https://res.cloudinary.com/doqbelkif/image/upload/v1700932674/DeTaiBIDV/settings_tvuili.png');
           
        }
        else {
            setShowFooter(false)
        }
    };
    useEffect(() => {
        openFooter();
    }, [state.routes[state.index].name]);


    if (!showFooter) {
        return (
            <View></View>
        )
    }
    else {
        return (
            <View style={styles.footer}>
                <View style={styles.twoButton}>
                    <View style={styles.oneButtonLeft}>
                    <Pressable onPress={() => {
                            navigation.navigate(
                                'Home'
                            );

                        }}>
                        <Image style={{ width: 35, height: 35, borderRadius: 5, margin: 'auto' }} resizeMode='contain' source={{ uri: imageSelectHome }} />
                        <Text style={{ color: 'gray', fontWeight: 400, fontSize: 14 }}>Trang chủ</Text>
                        </Pressable>
                    </View>
                    <View style={styles.oneButton}>
                        <Image style={{ width: 35, height: 35, borderRadius: 5, margin: 'auto' }} resizeMode='contain' source={{ uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1700207096/DeTaiBIDV/plumeria_qhgedi.png" }} />
                        <Text style={{ color: 'gray', fontWeight: 400, fontSize: 14 }}>Đổi quà</Text>
                    </View>
                </View>
                <View style={[styles.oneButton, { marginBottom: '12%' }]}>
                    <Image style={{ width: 55, height: 55, borderRadius: 5, margin: 'auto' }} resizeMode='contain' source={{ uri: "https://res.cloudinary.com/doqbelkif/image/upload/v1700207279/DeTaiBIDV/qr-scan_oz9xtq.png" }} />
                    <Text style={{ color: 'gray', fontWeight: 400, fontSize: 14 }}>Quét QR</Text>
                </View>
                <View style={styles.twoButton}>

                    <View style={[styles.oneButtonLeft]}>
                        <Pressable onPress={() => {
                            navigation.navigate(
                                'Announcement'
                            );

                        }}>
                            <Image style={{ width: 35, height: 35, borderRadius: 5, margin: 'auto' }} resizeMode='contain' source={{ uri: imageSelectNotice }}  />
                            <Text style={{ color: 'gray', fontWeight: 400, fontSize: 14 }}>Thông báo</Text>
                        </Pressable>
                    </View>

                    <View style={styles.oneButton}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate(
                                    'Screen07'
                                );

                            }}
                        >
                            <Image style={{ width: 35, height: 35, borderRadius: 5, margin: 'auto' }} resizeMode='contain' source={{ uri: imageSelectSetting }}  />
                            <Text style={{ color: 'gray', fontWeight: 400, fontSize: 14 }}>Cài đặt</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        );
    };
}

const styles = {
    footer: {
        height: '10%',
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    twoButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    oneButtonLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        paddingRight: 15
    },
    oneButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
}

export default Footer;