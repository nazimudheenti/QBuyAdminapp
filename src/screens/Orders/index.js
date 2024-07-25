import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import CommonOrderCard from './CommonOrderCard'
import SelectTab from '../../Components/SelectTab'
import FilterBox from './FilterBox'
import OrderHistoryCard from './OrderHistoryCard'
import CommonDatePicker from '../../Components/CommonDatePicker'
import moment from 'moment';
import OrderHistoryDetailsBox from './OrderHistoryDetailsBox'
import Toast from 'react-native-toast-message'
import LoaderContext from '../../contexts/Loader'
import customAxios from '../../CustomeAxios'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
// import reactotron from 'reactotron-react-native'
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage'

const filter = [
    {
        name: 'All',
        value: "all"
    },
    {
        name: 'New',
        value: "new"
    },
    {
        name: 'Preparing',
        value: "preparing"
    },
    {
        name: 'Ready',
        value: "ready"
    },
    {
        name: 'Picked Up',
        value: "pickedup"
    },
]

const Orders = ({ navigation, route }) => {

    const [currentTab, setCurrentTab] = useState(0)

    const [selected, setSelected] = useState("all")

    const [date, setDate] = useState(null)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [orders, setOrders] = useState([])
    const [orderHistory, setOrderHistory] = useState({})
    const [refreshing, setRefreshing] = useState(false)
    const [refreshingHistory, setRefreshingHistory] = useState(false)

    const { width, height } = useWindowDimensions()
    const loadingg = useContext(LoaderContext)
    const mode = route?.params?.mode

    useEffect(() => {
        if (mode === 'complete') {
            setCurrentTab(1)
        }
    }, [mode === 'complete'])

    useEffect(() => {
        setOrders([])
        getOrdersData(selected)
    }, [selected])

    const openDrawer = useCallback(() => {
        navigation.openDrawer()
    }, [])

    const selectNewOrders = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const selectOrderHistory = useCallback(() => {
        setCurrentTab(1)
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

    // const getOrdersData = async (url) => {
    //     //loadingg.setLoading(true)
    //     try {
    //         let bundleId = DeviceInfo.getBundleId();
    //         const type = bundleId.replace("com.qbuystoreapp.", "")
    //         const response = await customAxios.get(`vendor/orders/${type}/${url}`)
    //         if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
    //             setOrders(response.data.data)
    //         } else {
    //             setOrders([])
    //         }
    //         setRefreshing(false)
    //     } catch (error) {
    //         setRefreshing(false)
    //         console.log("error", error);
    //         // loadingg.setLoading(false)
    //         Toast.show({
    //             type: 'error',
    //             text1: error
    //         });
    //     }
    // }

    const getOrdersData = async () => {

        let token = await AsyncStorage.getItem("token");

        try {
            const response = await customAxios.get(`order`,{
                params: {
                    api_token: token
                }
            })
            if (response?.data?.status === 200 || 201) {
                setOrders(response.data.data)
            }else {
                setOrders([])
            }
            setRefreshing(false)
        } catch (error) {
            setRefreshing(false)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    useEffect(() => {
        setOrderHistory({})
        getOrdersHistoryData(date)
    }, [date])

    const getOrdersHistoryData = async (date) => {
        //loadingg.setLoading(true)
        try {
            let bundleId = DeviceInfo.getBundleId();
            const type = bundleId.replace("com.qbuystoreapp.", "")
            const response = date ? await customAxios.post(`vendor/orders-history-filter`, { date: moment(date).format("DD-MM-YYYY"),type }) : await customAxios.get(`vendor/orders-history/${type}`)
            if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
                // console.log(response.data);
                setOrderHistory(response.data.data)
            }
            //  loadingg.setLoading(false)
            setRefreshingHistory(false)
        } catch (error) {
            // loadingg.setLoading(false)
            setRefreshingHistory(false)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    return (
        <>
            <HeaderWithTitle title={'Orders'} drawerOpen={openDrawer} />
            <View style={{ backgroundColor: '#F3F3F3', paddingHorizontal: 15, flex: 1 }}>
                <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <SelectTab
                        label={"New Orders"}
                        onPress={selectNewOrders}
                        selected={currentTab === 0}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                    <SelectTab
                        label={"Order History"}
                        onPress={selectOrderHistory}
                        selected={currentTab === 1}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                </View>
                <View style={{ backgroundColor: '#00000014', height: 2, marginTop: -1.5, }} />

                {currentTab === 0 &&
                    <>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 5 }}>
                                {filter?.map((item, index) => (
                                    <FilterBox
                                        key={index}
                                        item={item}
                                        onPress={() => setSelected(item?.value)}
                                        selected={selected}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                        <ScrollView
                            refreshControl={<RefreshControl refreshing={refreshing}
                                onRefresh={() => {
                                    setRefreshing(true)
                                    getOrdersData(selected)
                                }}
                            />} style={{ paddingTop: 15, marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                            {orders.length > 0 ? orders?.map((item) => (
                              
                                <CommonOrderCard key={item?.id} item={item} onRefresh={() => getOrdersData(selected)} />
                            )) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height * 0.5 }}>
                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030' }}>No Data Found</Text>
                            </View>}
                        </ScrollView>
                    </>
                }
                {currentTab === 1 &&
                    <>
                        <CommonDatePicker
                            onPress={calendarOpen}
                            date={date ? date : new Date()}
                            label={date ? moment(date).format("DD-MM-YYYY") : null}
                            openCalendar={openCalendar}
                            onConfirm={selectDate}
                            onCancel={calendarClose}
                            mt={15}
                            clearAction={() => {
                                selectDate(null)
                            }}
                        />
                        <ScrollView
                            refreshControl={<RefreshControl refreshing={refreshingHistory}
                                onRefresh={() => {
                                    setRefreshingHistory(true)
                                    setOrderHistory({})
                                    getOrdersHistoryData(date)
                                }}
                            />}
                            style={{ paddingTop: 10, marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                            <OrderHistoryDetailsBox data={orderHistory} />
                            {orderHistory?.orders?.length > 0 ? orderHistory?.orders?.map((item) => <OrderHistoryCard item={item} key={item?.id} />) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height * 0.4 }}>
                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030' }}>No Data Found</Text>
                            </View>}
                        </ScrollView>
                    </>
                }
            </View>
        </>
    )
}

export default Orders

const styles = StyleSheet.create({
    filterBox: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowOffset: { height: 1, width: 1 },
        elevation: 1,
        shadowOpacity: 0.2,
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterLabel: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 10,
        paddingHorizontal: 15
    }
})