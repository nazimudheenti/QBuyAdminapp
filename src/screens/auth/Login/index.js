import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, Alert, Keyboard, StatusBar, KeyboardAvoidingView, } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Toast from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons'

import CommonAuthBg from '../CommonAuthBg';
import CommonInput from '../../../Components/CommonInput';
import CommonAuthHeading from '../CommonAuthHeading';
import CustomButton from '../../../Components/CustomButton';
import CommonTexts from '../../../Components/CommonTexts';
import AuthContext from '../../../contexts/Auth';
import LoaderContext from '../../../contexts/Loader';
import customAxios from '../../../CustomeAxios';
// import reactotron from '../../../ReactotronConfig';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../config/COLORS';
import DeviceInfo from 'react-native-device-info';
import {PermissionsAndroid} from 'react-native';
import firebase from '@react-native-firebase/app';
import { env } from '../../../config/constants';
import notifee, {
	AndroidImportance,
	AndroidVisibility,
	EventType,
  } from '@notifee/react-native';


const Login = ({ navigation }) => {

	const loginUser = useContext(AuthContext)
	const loadingg = useContext(LoaderContext)
	const userOtp = useContext(AuthContext)


	// reactotron.log(fcmToken, "FCM")

	const [isPasswordSecure, setIsPasswordSecure] = useState(true);



	const schema = yup.object({
		email: yup.string().email('The given email is invalid').required('Email Address is required'),
		password: yup.string().required('Password is required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});

	async function notificationPermission() {
		if (Platform.OS === 'ios') {
		  const authStatus = await messaging().requestPermission();
		  const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL
		} else {
	
		  PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
		  ).then(async (si) => { 
	
			if (env === 'qbuy_live') {
			  await notifee.createChannel({
				id: 'orders',
				name: 'Order Channel',
				sound: Platform.OS === 'ios' ? 'order.wav' : 'order',
				importance: AndroidImportance.HIGH,
				visibility: AndroidVisibility.PUBLIC,
			  });
			} else if (env === 'demo') {
			  await notifee.createChannel({
				id: 'orders_demo',
				name: 'Demo Channel',
				sound: Platform.OS === 'ios' ? 'order.wav' : 'order',
				importance: AndroidImportance.HIGH,
				visibility: AndroidVisibility.PUBLIC,
			  });
			} else if (env === 'qbuy') {
			  await notifee.createChannel({
				id: 'orders_dev',
				name: 'Dev Channel',
				sound: Platform.OS === 'ios' ? 'order.wav' : 'order',
				importance: AndroidImportance.HIGH,
				visibility: AndroidVisibility.PUBLIC,
			  });
			}
		   });
		}
	  }
	


	// const onSubmit = async (data) => {

	// 	Keyboard.dismiss()
	// 	loadingg.setLoading(true)
	// 	//7952124568

	// 	// let bundleId = DeviceInfo.getBundleId();
	// 	// const type = bundleId.replace("com.qbuystoreapp.", "")

	// 	try {
	// 		const response = await customAxios.post("login", { data })
	// 		reactotron.log(response, "TEST")
	// 		if (response) {
	// 			loginUser.setLogin(data)
	// 			navigation.replace('Otp', { type: "login" })
	// 		}
	// 		loadingg.setLoading(false)
	// 	} catch (error) {
	// 		// console.log("error=>", error);
	// 		loadingg.setLoading(false)
	// 		//if (has(error, "user_exist") && !error?.user_exist) {
	// 		if (error?.message === "Vendor Not Found") {
	// 			Alert.alert("Vendor not found",
	// 				`Vendor for QBUY ${type} not found, Do you want to create new one?`,
	// 				[
	// 					{
	// 						text: 'Cancel',
	// 						onPress: () => console.log('Cancel Pressed'),
	// 						style: 'cancel',
	// 					},
	// 					{
	// 						text: 'Register', onPress: () => {
	// 							loginUser.setLogin(data)
	// 							navigation.navigate('Register')
	// 						}
	// 					},
	// 				]
	// 			)
	// 		} else if (error?.message === "Admin Not Approved User Account.You Can Login After Admin Approval") {
	// 			Toast.show({
	// 				type: 'error',
	// 				text1: "Admin approval needed for logging in!",
	// 				visibilityTime: 2000,
	// 			});
	// 		} else {
	// 			Alert.alert("Message",
	// 				error?.message,
	// 				[
	// 					{
	// 						text: 'OK',
	// 						onPress: () => console.log('Cancel Pressed'),
	// 						style: 'cancel',
	// 					}
	// 				]
	// 			)
	// 		}
	// 	}
	// }

	const onSubmit = async (data) => {

		data = {
			email: data.email?.toLowerCase(),
			password: data.password,
		}

		Keyboard.dismiss()
		loadingg.setLoading(true)
		try {
			const response = await customAxios.post("auth/login", data)
			if (response?.data?.status === 200 || 201) {
				const firebaseToken = await messaging().getToken()


				let token = response?.data?.access_token
				await AsyncStorage.setItem("token", token);

				await customAxios.post('auth/update-devicetoken', {
					token: firebaseToken
				})

				await notificationPermission();
				// userOtp.getProfileDetails()
				navigation.replace('TabNavigator');

				// navigation.navigate('HomePage');

			}

			else {
				throw "Internal server error"
			}
			loadingg.setLoading(false)
		} catch (error) {
			loadingg.setLoading(false)

			Toast.show({
				type: 'error',
				text1: error?.message || error
			})

		}
	};

	

	return (
		<KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 40, justifyContent: 'center', backgroundColor: '#f5faf6' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

			<Image
				style={styles.logo}
				source={require('../../../Images/pandaLogo.png')}
				resizeMode='contain'
			/>


			<Text
				style={{
					fontFamily: 'Quicksand-SemiBold',
					color: '#23233C',
					fontSize: 28,
				}}
			>Login</Text>

			<Text
				style={{
					fontFamily: 'Quicksand-SemiBold',
					color: '#23233C',
					fontSize: 12,
				}}
			>Provide your designated email and password.</Text>

			<CommonInput
				leftElement
				control={control}
				error={errors.email}
				fieldName="email"
				placeholder='Email Address'
				inputMode={'email'}
				mt={20}
				icon={<Ionicons name={'mail'} size={28} color={'#4a1df0'} />}
			/>

			<CommonInput
				leftElement
				control={control}
				error={errors.password}
				fieldName="password"
				placeholder='Password'
				//inputMode={'numeric'}
				mt={20}
				icon={<Ionicons name={'lock-closed'} size={28} color={'#4a1df0'} />}
				entry={isPasswordSecure}
				rightIcon={<Ionicons name={isPasswordSecure ? "eye-off" : "eye"} size={22} color={"#B7B7B7"} marginRight={5} />}
				pressed={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
			/>

			{/* <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 10 }} onPress={forgotPass}>
					<Text style={{ color: "#000", fontFamily: "Poppins-Medium", fontSize: 12 }}>Forgot Password?</Text>
				</TouchableOpacity> */}

			<CustomButton
				onPress={handleSubmit(onSubmit)}
				//onPress={() => navigation.navigate('TabNavigator')}
				bg={'#4a1df0'}
				label={'Login'}
				mt={20}
				loading={loadingg?.loading}
			/>
			<View style={{ padding: 20 }} />

			{/* <Text style={styles.textLight}>{"New to the family?"}</Text>

				<TouchableOpacity onPress={register}>
					<Text style={styles.textRegister}>{"Register Here"}</Text>
				</TouchableOpacity> */}

		</KeyboardAvoidingView>
	)
}

export default Login

const styles = StyleSheet.create({
	logo: {
		width: 150,
		height: 150,
		alignSelf: 'center',
	},
	textLight: {
		fontFamily: 'Poppins-Light',
		color: '#8D8D8D',
		fontSize: 11,
		textAlign: 'center',
		marginTop: 20
	},
	textRegister: {
		fontFamily: 'Poppins-Bold',
		color: '#FF4646',
		fontSize: 15,
		textAlign: 'center',
	},


})