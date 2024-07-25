import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import CommonReadonlyBox from '../../../Components/CommonReadonlyBox'
import CommonTexts from '../../../Components/CommonTexts'
import AuthContext from '../../../contexts/Auth'
import { IMG_URL } from '../../../config/constants'
import { COLORS } from '../../../config/COLORS'

const Profile = ({ navigation }) => {

    const { width } = useWindowDimensions()
    const { userData } = useContext(AuthContext)
    return (
        <>
            <HeaderWithTitle title={'Profile'} backAction />
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView style={{ backgroundColor: '#fff', marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 15, }}>
                        <View style={{ alignSelf: 'center', marginTop: 10, alignItems: 'center', marginBottom: 10 }}>
                            <Image
                                style={{ width: 150, height: 100, borderRadius: 12 }}
                                source={{ uri: `${userData?.image}${userData?.logo}` }} alt='img'
                                resizeMode='contain'
                            />
                            <CommonTexts color={COLORS.primary} label={userData?.storename} fontSize={20} mt={10} />
                            {/* <Text style={{ fontSize: 10, color: '#909091', }}>Email : {userData?.email}</Text>
                            <Text style={{ fontSize: 10, color: '#909091', }}>Phone Number : {userData?.phone}</Text> */}
                        </View>
                        <CommonReadonlyBox
                            topLabel={'Location'}
                            label={userData?.address}
                        />
                        <CommonReadonlyBox
                            topLabel={'Email Address'}
                            label={userData?.storeemail}
                        />
                        <CommonReadonlyBox
                            topLabel={'Phone Number'}
                            label={userData?.mobile}
                        />
                    </View>
                    {/* <View style={styles.border} />
                    <View style={{ paddingHorizontal: 15, }}>
                        <CommonTexts label={'KYC'} fontSize={12} mb={8} />
                        <CommonReadonlyBox
                            topLabel={'Aadhaar Number'}
                            label={userData?.kyc_details?.aadhar_card_number}
                        />
                        <CommonReadonlyBox
                            topLabel={'PAN Card Number'}
                            label={userData?.kyc_details?.pan_card_number}
                        />
                        <CommonReadonlyBox
                            topLabel={'FSSAI'}
                            label={userData?.kyc_details?.ffsai_number}
                        />
                        <CommonReadonlyBox
                            topLabel={'License Number'}
                            label={userData?.kyc_details?.license_number}
                        />
                    </View>
                    <View style={styles.border} />
                    <View style={{ paddingHorizontal: 15, }}>
                        <CommonTexts label={'Bank Details '} fontSize={12} mb={8} />
                        <CommonReadonlyBox
                            topLabel={'Bank and Branch Name'}
                            label={userData?.kyc_details?.branch}
                        />
                        <CommonReadonlyBox
                            topLabel={'IFSC Code'}
                            label={userData?.kyc_details?.ifsc}
                        />
                        <CommonReadonlyBox
                            topLabel={'Account Number'}
                            label={userData?.kyc_details?.account_number}
                        />
                        <CommonReadonlyBox
                            topLabel={'Account Name'}
                            label={userData?.kyc_details?.recipient_name}
                        />
                    </View> */}
                </ScrollView>
            </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    border: {
        height: 4,
        backgroundColor: '#0D4E810D',
        marginVertical: 10
    }
})