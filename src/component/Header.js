import React from 'react'
import {View,StyleSheet,Text} from 'react-native'
import * as constant from '../Utils/constant'

 const Header =({number,title})=>{
    return(
    <View style={styles.headerMainView} >
    <Text style={styles.headerTitle}>{title}</Text>
    </View>
)}

export default Header
const styles=StyleSheet.create({
headerMainView:{
 backgroundColor:constant.BaseColor,
 alignItems:'center',
 paddingVertical:'3%'
},
headerTitle:{
fontSize:constant.resW(5.5),

}
})