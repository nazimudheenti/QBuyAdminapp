import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Products from '../screens/Products';
import AddNewProduct from '../screens/Products/AddNewProduct';


const Stack = createStackNavigator();

const ProductsNav = () => {
    return (
        <Stack.Navigator initialRouteName='Products'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Products" component={Products}/>
            <Stack.Screen name="AddNewProduct" component={AddNewProduct}/>

        </Stack.Navigator>
    )
}

export default ProductsNav

const styles = StyleSheet.create({})