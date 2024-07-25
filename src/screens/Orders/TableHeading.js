import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TableHeading = () => {
  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomWidth: 0.5, borderColor: '#00000029', paddingBottom: 3, marginVertical: 5 }}>
      <View style={{ flex: 0.5 }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#23233C' }}>Product</Text>
      </View>
      <View style={{ flex: 0.3, alignItems: "center" }}><Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#23233C' }}>Qty</Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "flex-end" }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 13, color: '#23233C' }}>Price</Text></View>
    </View>
  )
}

export default TableHeading

const styles = StyleSheet.create({})