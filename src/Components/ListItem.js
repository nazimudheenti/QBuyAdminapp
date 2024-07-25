import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'


const ListItem = ({ label, fontSize, onPress, onValueChange, icon }) => {

    return (

        <TouchableOpacity 
            onPress={onPress} 
            style={styles.container} 
        >
            <View style={{ flexDirection:'row', alignItems:'center' }}>
                <View style={{ flex:1 }}>
                    <Text style={styles.nameText}>{label}</Text>
                </View>
                <AntDesign name={"caretright"} color="#58D36E" size={15}/>
            </View>

        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container : { 
        marginHorizontal:20, 
        borderBottomWidth:1, 
        borderBottomColor:'#0D4E810D', 
        paddingVertical:20
    },
    nameText : { 
        color:'#000', 
        fontSize:13, 
        fontFamily:'Poppins-Medium', 
        marginLeft:5 
    }

})