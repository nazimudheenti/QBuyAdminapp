import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import CommonTexts from '../../Components/CommonTexts'
import AuthContext from '../../contexts/Auth'
import { IMG_URL } from '../../config/constants'
import { COLORS } from '../../config/COLORS'

const ProfileDp = ({ item }) => {
    // const { userData } = useContext(AuthContext)

    return (
        <View style={styles.container}>
        <Image
                style={{ width: 100, height: 100, borderRadius: 12 }}
                source={require('../../Images/home.png')} alt='img'
                resizeMode='contain'
            />
            <View style={{ marginLeft: 8, justifyContent: 'center', flexShrink: 1 }}>
                {/* <CommonTexts color={COLORS.primary} label={userData?.storename} fontSize={20} /> */}
                <View >
                    <Text style={styles.regularText}>Name : Admin</Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileDp

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        elevation: 1,
        marginHorizontal: 2,
        shadowOpacity: 0.1,
        shadowOffset: { height: 1, width: 1 },
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 15
    },
    regularText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#8D8D8D',
        marginBottom: 1.5,
    }
})