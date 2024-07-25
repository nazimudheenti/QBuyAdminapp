import React, { useState, useEffect, useContext } from "react";
import Context from "./index";
import customAxios from "../../CustomeAxios";
import Toast from 'react-native-toast-message'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import DeviceInfo from "react-native-device-info";
import LoaderContext from "../Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthProvider = (props) => {
    const [login, setLogin] = useState([]);
    const [otp, setOtp] = useState('');
    const [userData, setUserData] = useState({});
    const [fcmToken, setFcmToken] = useState(null);
    const [orderStatus, setOrderStatus] = useState([]);
    //const [vendorCategoryList, setVendorCategoryList] = useState([]);
    //const [filterCategoryList, setFilterCategoryList] = useState([]);
    const loading = useContext(LoaderContext)
    let bundleId = DeviceInfo.getBundleId();

    const type = bundleId.replace("com.qbuystoreapp.", "")




    const getProfileDetails = async () => {

        let token = await AsyncStorage.getItem("token");

        try {
            const response = await customAxios.get(`admin/settings`);

            setUserData(response?.data?.data)
        } catch (error) {

            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }

    // const setPushDetails = async (data) => {
    //     try {
    //         const response = await customAxios.post("auth/update-devicetoken", data)
    //         if (response.data?.data) {
    //             getProfileDetails()

    //             loading.setLoading(false)
    //             /* Toast.show({
    //                 text1: "Notification sound updated successfully",
    //             }); */
    //         }
    //     } catch (error) {
    //         loading.setLoading(false)

    //         Toast.show({
    //             type: 'error',
    //             text1: error
    //         });
    //     }
    // }

    // const getOrderStatus = async () => {
    //     try {
    //         const response = await customAxios.get("common/order-status-list")
    //         setOrderStatus(response?.data?.data)
    //     } catch (error) {

    //         Toast.show({
    //             type: 'error',
    //             text1: error
    //         });
    //     }
    // }

    // const venderCategories = async () => {
    //     try {
    //         const response = await customAxios.post("vendor/categories", {
    //             "type": type,
    //         })
    //         if (response && has(response, "data.data")) {
    //             setVendorCategoryList(response?.data?.data)
    //         }
    //     } catch (error) {
    //         console.log("error", error)
    //         Toast.show({
    //             type: 'error',
    //             text1: error
    //         });
    //     }
    // }

    // const filterCategories = async () => {
    //     try {
    //         let bundleId = DeviceInfo.getBundleId();
    //         const type = bundleId.replace("com.qbuystoreapp.", "")
    //         const response = await customAxios.get(`vendor/vendor-categories/${type}`)
    //         if (response && has(response, "data.data")) {
    //             setFilterCategoryList(response?.data?.data)
    //         }
    //     } catch (error) {
    //         console.log("error", error)
    //         Toast.show({
    //             type: 'error',
    //             text1: error
    //         });
    //     }
    // }

    return (
        <Context.Provider
            value={{
                ...props,
                login,
                otp,
                userData,
                orderStatus,
                //vendorCategoryList,
                //filterCategoryList,
                fcmToken,
                setOtp,
                setLogin,
                setUserData,
                getProfileDetails,
                //getOrderStatus,
                //venderCategories,
                //filterCategories,
                //setPushDetails,
                setFcmToken
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default AuthProvider;

