import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
// import reactotron from 'reactotron-react-native'

const CommonItems = memo(({ item }) => {


    //reactotron.log(item, "ITEMINCARD")

    return (
        <>
        <View style={{ flexDirection: 'row', borderColor: '#00000029', marginHorizontal: 10 }}>
            {/* {item?.unit?.name || item?.variant?.name ? (<View style={{ flex: 0.5 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>{item?.name} ({item?.variants?.title} {item?.attributes?.name})</Text>
            </View>) : (<View style={{ flex: 0.5, }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>{item?.name} {item?.attributes?.[0] ? item?.attributes?.[0] : null}</Text>
            </View>)} */}
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C', flex: 0.5 }}>{item?.name} {(item?.variants || item?.variant_id) ? `(${item?.attributes})` : null}</Text>
            <View style={{ flex: 0.3, alignItems: "center" }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C', flex: 0.4 }}>{item?.quantity}</Text>
            </View>
            <View style={{ flex: 0.2, alignItems: "flex-end" }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#23233C' }}>₹ {Number(item?.price).toFixed(2)}</Text>
            </View>

        </View>

        <View style={{ paddingHorizontal: 10, flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ fontSize: 10, color: 'blue', fontWeight: '900' }}>Store </Text>
            <Text style={{ fontSize: 10, color: '#23233C', fontWeight: '700' }}>: {item?.productdata?.store?.name}</Text>
        </View>
        </>
    )
})

export default CommonItems

const styles = StyleSheet.create({
    mediumText: {
        fontFamily: 'Poppins-Medium',
        color: '#23233C',
        fontSize: 10
    }
})