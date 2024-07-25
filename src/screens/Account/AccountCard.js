import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import CommonStatusCard from '../../Components/CommonStatusCard'


const AccountCard = memo(({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.regularText}>{item?.transaction_date}</Text>
                {/* <Text style={styles.boldText}>{item?.date}</Text> */}
            </View>
            <View style={styles.totalDetails}>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Amount Settled'}</Text>
                    <Text style={styles.totalCount}>₹ {item?.amount}</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Payment Mode'}</Text>
                    <Text style={styles.totalCount}>{item?.payment_mode}</Text>
                </View>
                <View style={{ flex: 0.35 }}>
                    <Text style={styles.regularText}>{'Transaction ID'}</Text>
                    <Text style={styles.totalCount}>{item?.transaction_id}</Text>
                </View>
            </View>
            {/* <View style={styles.bottom}>
                <CommonStatusCard
                    bg={item?.status === 'Completed' ? '#BCFFC8' : '#FFF297'}
                    label={item?.status}
                    labelColor={item?.status === 'Completed' ?  '#07AF25' :'#B7A000'}
                />
            </View> */}
        </View>
    )
})

export default AccountCard

const styles = StyleSheet.create({
    container: { 
        borderRadius: 15, 
        backgroundColor: '#fff', 
        shadowOpacity: 0.2, 
        shadowOffset: { height: 1, width: 1 }, 
        marginBottom: 10, 
        elevation: 1, 
        marginHorizontal: 2, 
        paddingBottom: 5 
    },
    header: { 
        flexDirection: 'row', 
        borderTopRightRadius: 15, 
        borderTopLeftRadius: 15, 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    boldText: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 10, 
        color: '#23233C' 
    },
    totalDetails: { 
        flexDirection: 'row', 
        paddingHorizontal: 10, 
        alignItems: 'center', 
        marginTop: 8 
    },
    regularText: { 
        fontFamily: 'Poppins-Regular', 
        fontSize: 9, 
        color: '#23233C' 
    },
    totalCount: { 
        fontFamily: 'Poppins-Bold', 
        fontSize: 14, 
        color: '#23233C' 
    },

    bottom: {
        alignItems:'center', 
        justifyContent:'center', 
        borderTopWidth:1, 
        borderColor:'#F3F3F3', 
        paddingTop:8, 
        marginTop:10, 
        paddingBottom:5
    }
    
})