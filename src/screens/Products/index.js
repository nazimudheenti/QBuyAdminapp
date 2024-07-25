import { StyleSheet, Text, ScrollView, Switch, View, useWindowDimensions, Image, TouchableOpacity, RefreshControl, Keyboard } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import CommonDatePicker from '../../Components/CommonDatePicker'
import SelectTab from '../../Components/SelectTab';
import CustomSearch from '../../Components/CustomSearch';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FilterBox from '../Orders/FilterBox';
import CommonTexts from '../../Components/CommonTexts';
import ProductCard from './ProductCard';
import CommonSquareButton from '../../Components/CommonSquareButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import customAxios from '../../CustomeAxios';
import Toast from 'react-native-toast-message';
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import AuthContext from '../../contexts/Auth';
// import reactotron from 'reactotron-react-native';

const initialItem = {
    "_id": "all",
    "image": "/storage/uploads/1684738933.png",
    "name": "All"
}

const Products = ({ navigation }) => {
    const authContext = useContext(AuthContext)
    const { filterCategoryList = [], userData } = authContext

    const { width, height } = useWindowDimensions()
    const [currentTab, setCurrentTab] = useState(0)
    const [selected, setSelected] = useState(initialItem)

    const [filterResult, setFilterList] = useState([])
    const [productHistory, setProductHistory] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [refreshingHistory, setRefreshingHistory] = useState(false)
    const [historySearch, setHistorySearch] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const schema = yup.object({
        search: yup.string().required('Name is required'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm({
        resolver: yupResolver(schema)
    });

    const filterHistory = () => {
        return productHistory?.filter(item => item?.name?.toLowerCase().includes(historySearch.toLowerCase())) || []
    }
    const productSearch = async ({ search }) => {

        Keyboard.dismiss()
     
        try {
            const response = await customAxios.post("vendor/newproduct/search", {
                "type": userData?.type, search
            })
            setFilterList(response?.data?.data)

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }
    const getProductList = async () => {
        try {
            if (!isEmpty(selected)) {
                const response = await customAxios.post(`vendor/newproduct/${selected._id == 'all' ? 'history-' : ''}list`, {
                    "type": userData?.type,
                    "category_id": selected?._id
                })

              
                if (response && has(response, "data.data")) {
                    setFilterList(response?.data?.data)
                }
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

    const getProductHistory = async () => {
        try {
            const response = await customAxios.post("vendor/newproduct/history-list", { "type": userData?.type })
            if (response && has(response, "data.data")) {
                setProductHistory(response?.data?.data)
            }
            setRefreshingHistory(false)
        } catch (error) {
            setRefreshingHistory(false)
            console.log("error-", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    useEffect(() => {
        !isEmpty(selected) && getProductList()
    }, [selected])

    useFocusEffect(
        useCallback(() => {
            //getProductList()
            getProductHistory()
            //setSelected(initialItem)
        }, [])
    );

    const selectCurrentPdt = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const selectPdtHistory = useCallback(() => {
        setCurrentTab(1)
    }, [])

    const addNewProduct = useCallback(() => {
        navigation.navigate('AddNewProduct')
    }, [])

    return (
        <>
            <HeaderWithTitle title={'Products'} />
            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                {/*  <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                    <SelectTab
                        label={"Current Products"}
                        onPress={selectCurrentPdt}
                        selected={currentTab === 0 ? true : false}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                    <SelectTab
                        label={"Product History"}
                        onPress={selectPdtHistory}
                        selected={currentTab === 1 ? true : false}
                        wid={width / 2.3}
                        fontSize={16}
                    />
                </View> */}
                <View style={{ backgroundColor: '#00000014', height: 2, marginTop: -1.5, marginHorizontal: 15 }} />
                <CustomSearch
                    mb={2}
                    control={control}
                    error={errors.search}
                    fieldName="search"
                    placeholder='Search...'
                    onpress={handleSubmit(productSearch)}
                    clearAction={() => {
                        clearErrors()
                        setValue("search", '')
                        getProductList()
                    }}
                />
                <ScrollView
                    horizontal={true}
                    style={{ marginTop: 15, backgroundColor: '#F7F7F7', paddingLeft: 10, height: 80, }}
                    showsHorizontalScrollIndicator={false}
                >
                    {[initialItem, ...filterCategoryList]?.map((item, index) => (
                        <FilterBox
                            key={index}
                            item={{ ...item, value: item?._id }}
                            onPress={() => setSelected(item)}
                            selected={selected?._id}
                        />
                    ))}
                </ScrollView>
                <Text
                    style={{ fontFamily: 'Poppins-LightItalic', fontSize: 11, color: '#23233C', textAlign: 'right', marginRight: 20 }}
                >{`${filterResult.length} of ${filterResult.length} items`}</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 80, height: '100%' }}
                    refreshControl={<RefreshControl refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            getProductList()
                        }}
                    />}
                >
                    {filterResult.length > 0 ? filterResult?.map((item, index) => (<ProductCard
                        onRefresh={() => getProductList()}
                        item={item} key={index} />)) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height * 0.40 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030' }}>No Data Found</Text>
                    </View>}
                    <View style={{ height: height * 0.1 }}></View>
                </ScrollView>
                {["green", "fashion"].includes(userData?.type) && <CommonSquareButton onPress={addNewProduct} position={'absolute'} bottom={100} right={25} iconName={'add'} />}
                {/* currentTab === 1 &&
                    <>
                        <CustomSearch
                            mb={2}
                            control={control}
                            error={errors.name}
                            fieldName="name"
                            placeholder='Search...'
                            onChangeText={(value) => setHistorySearch(value)}
                        />
                        <Text style={{ fontFamily: 'Poppins-LightItalic', fontSize: 11, color: '#23233C', textAlign: 'right', marginRight: 20, marginTop: 10 }}>{filterHistory().length} of {filterHistory().length} items</Text>
                        <ScrollView style={{ marginBottom: 80 }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshingHistory}
                            onRefresh={() => {
                                setRefreshingHistory(true)
                                getProductHistory()
                            }}
                        />}>
                            {filterHistory().length > 0 ? filterHistory()?.map((item, index) => (<ProductCard item={item} key={index} />)) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: height * 0.40 }}>
                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030' }}>No Data Found</Text>
                            </View>}

                        </ScrollView>
                    </> */
                }
            </View>
        </>
    )
}

export default Products

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