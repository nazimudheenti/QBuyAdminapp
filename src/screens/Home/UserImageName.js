import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext } from 'react'
import AuthContext from '../../contexts/Auth'
import { IMG_URL } from '../../config/constants'
// import reactotron from 'reactotron-react-native'
import { COLORS } from '../../config/COLORS'


const UserImageName = () => {
    // const { userData } = useContext(AuthContext)
    // reactotron.log(userData, "USER")

    // const uri = `${userData?.image}${userData?.logo}`


    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 10, paddingVertical: 12 }}>
            <Image
                style={[{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain'
                }]}
                source={require('../../Images/home.png')} resizeMode='contain'
            />
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.textRegular}>{"Welcome"}</Text>
                <Text style={styles.textBold}>{'QBuy Admin'}</Text>
            </View>
        </View>
    )
}

export default UserImageName

const styles = StyleSheet.create({
    textBold: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        color: '#000',
    },
    textRegular: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
    },
})