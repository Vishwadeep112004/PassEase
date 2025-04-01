import { StyleSheet, Text, View ,Image, Button, Touchable, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    navigation: NavigationProp<any>;
  };

const Content_on_theDashboard = ({ navigation }: Props)=>  {
    const [name,setName]=useState<string>("shahid Mulani");
    const [state,setState]=useState<string>("Active");
    const [days,setDays]=useState<string>("30");
    const [route,setRoute]=useState<string>("Kolhapur to Sangli");

  return (
    <LinearGradient 
            colors={['#2980B9','#ffffff',]}  // Gradient colors
            style={styles.mainContainer}
        >
     
         <View style={styles.Container}>
             <Image source={require("../app/images/person.jpg")} style={styles.Image}/>
             <View style={styles.infoContainer}>
                 <Text style={styles.Text}>State: {state}</Text>
             </View>
             <View style={styles.infoContainer}><Text style={styles.Text}>Name: {name}</Text></View>
             <View style={styles.infoContainer}><Text style={styles.Text}>days left: {days}</Text></View>
             <View style={styles.infoContainer}><Text style={styles.Text}>valid route: {route}</Text></View>
         </View>
        <TouchableOpacity style={styles.button} onPress={alert}>
                  <Text style={styles.buttonText}>Scan QR</Text>
                </TouchableOpacity>
        <View style={styles.NavBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Image source={require('../app/images/home2.png')} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../app/images/profile1.png')} style={styles.icon}/>    
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../app/images/logout1.png')} style={styles.icon}/>
            </TouchableOpacity>
        </View>

    </LinearGradient>
  )
}

export default Content_on_theDashboard

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        // backgroundColor:"violet",
        alignItems:"center",
    },
    Container:{
        backgroundColor:"red",
        height:"70%",
        width:"90%",
        marginTop:"15%",
        borderRadius:30

    },
    Image:{
        height:"35%",
        width:"46%",
        // resizeMode:"contain",
        marginLeft:"27%",
        borderRadius:15,
        marginTop:"5%",
        marginBottom:"5%"
    },
    infoContainer:{
        height:"10%",
        backgroundColor:"white",
        width:"90%",
        marginLeft:"5%",
        margin:"2.5%",
        borderRadius:10,
    },
    Text:{
        fontSize:18,
        padding:"4%"
    },
    button: {
        backgroundColor: "#FF3B3B",
        padding: 10,
        borderRadius: 10,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
        height: 55,
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    NavBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#8A2BE2', // Violet shade
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        elevation: 5, // Shadow for Android
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 5,
    },
    icon: {
        width: 24,
        height: 24,
    }
    
    
})