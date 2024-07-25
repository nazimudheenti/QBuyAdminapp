import { StyleSheet, Text, ScrollView, View, useWindowDimensions, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import CommonDatePicker from '../../Components/CommonDatePicker'

import DetailsBox from '../../Components/DetailsBox';
import AccountCard from './AccountCard';
import customAxios from '../../CustomeAxios';
import Toast from 'react-native-toast-message';
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty';
import DeviceInfo from 'react-native-device-info';
// import reactotron from 'reactotron-react-native';
import AuthContext from '../../contexts/Auth';

const Account = ({ navigation }) => {

    const [date, setDate] = useState(null)
    const [openCalendar, setOpenCalendar] = useState(false)
    const { width, height } = useWindowDimensions()
    const [accountData, setAccountData] = useState({})
    const [refreshing, setRefreshing] = useState(false)

    const { userData } = useContext(AuthContext)

    // reactotron.log(userData, "userData")

    useEffect(() => {
        getAccountData()
    }, [])

    const calendarOpen = useCallback(() => {
        setOpenCalendar(true)
    }, [])

    const calendarClose = useCallback(() => {
        setOpenCalendar(false)
    }, [])

    const selectDate = useCallback((date) => {
        setOpenCalendar(false)
        setDate(date)
    }, [])

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    useEffect(() => {
        setAccountData({})
        getAccountData(date)
    }, [date])
    const getAccountData = async (date) => {
        //loadingg.setLoading(true)
        try {
            let bundleId = DeviceInfo.getBundleId();
            const type = bundleId.replace("com.qbuystoreapp.", "")
            const response = date ? await customAxios.post(`vendor/accounts-filter`, { date: moment(date).format("DD-MM-YYYY"),type}) : await customAxios.get(`vendor/accounts/${type}`)
            if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
                setAccountData(response.data.data)
            }
            setRefreshing(false)
            //  loadingg.setLoading(false)
        } catch (error) {
            setRefreshing(false)
            console.log("error", error);
            // loadingg.setLoading(false)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    return (
        <>
            <HeaderWithTitle title={'Account'} drawerOpen={openDrawer} />
            <View style={{ flex: 1, backgroundColor: '#F3F3F3', paddingHorizontal: 15, }}>
                <DetailsBox
                    count={accountData?.total_earnings || 0}
                    label='Total Earned'
                    alignSelf={'center'}
                />
                {userData?.account_type === "Ready Cash" ? null : (<DetailsBox
                    bg={'#fae1e1'}
                    bgBox={'#FF6565'}
                    count={accountData?.total_outstanding || 0}
                    label='Total Outstanding'
                    alignSelf={'center'}
                />)}
                <CommonDatePicker
                    onPress={calendarOpen}
                    date={date ? date : new Date()}
                    label={date ? moment(date).format("DD-MM-YYYY") : null}
                    openCalendar={openCalendar}
                    onConfirm={selectDate}
                    onCancel={calendarClose}
                    clearAction={() => {
                        selectDate(null)
                    }}
                />
                <ScrollView style={{ backgroundColor: '#F3F3F3', marginBottom: 80, marginTop: 20 }} showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            getAccountData(date)
                        }}
                    />}
                >
                    {accountData?.settlement_list?.length > 0 ? accountData?.settlement_list?.map((item) => (
                        <AccountCard item={item} key={item?.id} />
                    )) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height * 0.40 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030' }}>No Data Found</Text>
                    </View>}
                </ScrollView>
            </View>
        </>
    )
}

export default Account

const styles = StyleSheet.create({
    tabContainer: {
        marginTop: 15,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    border: {
        backgroundColor: '#00000014',
        height: 2,
        marginTop: -1.5,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10
    }
})