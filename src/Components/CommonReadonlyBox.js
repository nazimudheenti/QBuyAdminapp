import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const CommonReadonlyBox = ({topLabel,label, mb, mt, width}) => {
    return (
        <View style={{ marginTop: mt, width:width }}>
            {<Text
                style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 11,
                    marginLeft: 2,
                }}
            >{topLabel}</Text>}

            <View
                style={{
                    flexDirection: 'row',
                    minHeight: 40,
                    alignItems: 'center',
                    backgroundColor: '#F2F2F2',
                    borderRadius: 7,
                    marginBottom: mb ? mb : 10,
                    marginTop: 2,
                    paddingLeft:8,
                    paddingVertical:5

                }}
            >
                <Text style={{ fontFamily: 'Poppins-Regular', color: '#23233C', fontSize: 11, flex: 0.95 }} >{label}</Text>
            </View>
        </View>
    )
}

export default memo(CommonReadonlyBox);

const styles = StyleSheet.create({})