import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import moment from 'moment';
// import reactotron from 'reactotron-react-native';

const OrderHistoryCard = memo(({ item }) => {
    //reactotron.log(item, "TESTFBSDAK")
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.semiboldText}>{`Order ID #${item?.order_id}`}</Text>
                {item?.order_status === "cancelled" ? (<View
                    style={{ width: 70, backgroundColor: "#FFC9C9", alignItems: 'center', borderRadius: 5, paddingVertical: 3 }}
                >
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#FF7B7B', textTransform: "capitalize" }}>Cancelled</Text>
                </View>) : null}
                <Text style={styles.dateText}>{moment(item?.created_at).format("DD-MM-YYYY hh:mm A")}</Text>
            </View>
            {item?.order_status === "cancelled" ? (<View style={styles.totalDetails}>
                <Text style={styles.semiboldText}>{'Total Bill'}</Text>
                <Text style={styles.boldTextCancel}>₹{item?.vendor_order_total_price}</Text>
            </View>) : (<View style={styles.totalDetails}>
                <Text style={styles.semiboldText}>{'Total Bill'}</Text>
                <Text style={styles.boldText}>+ ₹{item?.vendor_order_total_price}</Text>
            </View>)}
        </View>
    )
})

export default OrderHistoryCard

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
    dateText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 10,
        color: '#23233C'
    },
    totalDetails: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'space-between'
    },
    regularText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 9,
        color: '#23233C'
    },
    boldTextCancel: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#FF7B7B'
    },
    boldText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: '#2EA10C'
    },
    semiboldText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#23233C'
    },
    cod: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: '#EC4949',
        paddingHorizontal: 20,
        paddingVertical: 2
    }
})