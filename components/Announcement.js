import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, Image, ScrollView } from 'react-native';
import { useUser } from './UserProvider';


export default function Announcement({ navigation, route }) {
    const { user } = useUser();
    console.log(user)
    const filterMoney = (balance) => {
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
        }).format(balance).replace(/₫/g, 'VND');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Biến động số dư</Text>
                </View>
                <View style={styles.body}>
                    {user.fluctuation.map((bienDong) => {
                        if (bienDong.receive === false) {
                            return (

                                <View style={styles.messCover}>
                                    <Text style={styles.mess}>BIDV xin thông báo tới Quý khách {'\n'}Thời gian giao dịch: <Text style={styles.bold}>{bienDong.time}</Text>
                                        {'\n'}Tài khoản thanh toán:  <Text style={styles.bold}>{user.id}</Text> {'\n'}
                                        Số tiền GD: <Text style={styles.red}>-{filterMoney(bienDong.money)}</Text> {'\n'}

                                        Số dư cuối: <Text style={styles.blue}>{filterMoney(bienDong.balanceCurent)}</Text> {'\n'}
                                        Nội dung giao dịch: {bienDong.info} (by BIDV)
                                    </Text>
                                </View>)
                        }
                        else {
                            return (

                                <View style={styles.messCover}>
                                    <Text style={styles.mess}>BIDV xin thông báo tới Quý khách {'\n'}Thời gian giao dịch: <Text style={styles.bold}>{bienDong.time}</Text>
                                        {'\n'}Tài khoản nhận:  <Text style={styles.bold}>{user.id}</Text> {'\n'}
                                        Số tiền GD: <Text style={styles.green}>+{filterMoney(bienDong.money)}</Text> {'\n'}
                                        Số dư cuối: <Text style={styles.blue}>{filterMoney(bienDong.balanceCurent)}</Text> {'\n'}
                                        Nội dung giao dịch: {bienDong.info} (by BIDV)
                                    </Text>
                                </View>)
    }
                    })
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100%',
        width: '100%'
    },
    header: {
        width: "90%",
       
    },
    body: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column-reverse',
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    messCover: {
        width: "90%",
        
        backgroundColor: '#c5edec',
        padding: 10,
        margin: 10,
        borderRadius: 15
    },
    mess: {
        fontWeight: 450,
        color: 'gray',
        fontSize: 18
    },
    bold: {
        fontWeight: 'bold',
        color: '#000'
    },
    blue: {
        fontWeight: 'bold', color: '#3faecc'
    },
    red: {
        fontWeight: 'bold', color: '#c0582d'
    },
    green:{
        fontWeight: 'bold', color: '#079dd9'
    }

})