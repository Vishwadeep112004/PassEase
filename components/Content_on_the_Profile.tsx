import { StyleSheet, Text, View ,Image, TouchableOpacity, TextInput} from 'react-native';
import React, { useState } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    navigation: NavigationProp<any>;
  };

const Content_on_the_Profile = ({ navigation }: Props)=>  {
    const [name,setName]=useState<string>("shahid Mulani");
    const [state,setState]=useState<string>("Active");
    const [days,setDays]=useState<string>("30");
    const [route,setRoute]=useState<string>("Kolhapur to Sangli");

  return (
    <LinearGradient 
            colors={['#8A2BE2', '#FF1493', '#000080']}  // Gradient colors
            style={styles.mainContainer}
        >
     
         <View style={styles.Container}>
             <Image source={require("../app/images/person.jpg")} style={styles.Image}/>
             <View style={styles.infoContainer}><Text style={styles.Text}>{name}</Text> <TouchableOpacity> <Image source={require('../app/images/edit.png')} style={styles.icon}/> </TouchableOpacity> </View>
             <View style={styles.infoContainer}><Text style={styles.Text}>{days}</Text> <TouchableOpacity> <Image source={require('../app/images/edit.png')} style={styles.icon}/> </TouchableOpacity> </View>
             <View style={styles.infoContainer}><Text style={styles.Text}>{route}</Text> <TouchableOpacity> <Image source={require('../app/images/edit.png')} style={styles.icon}/> </TouchableOpacity> </View>
         </View>


            <TextInput placeholder='Change your email'></TextInput>
            <TextInput placeholder='Change password'></TextInput>
            <TextInput placeholder='Confirm password'></TextInput>
         

        <View style={styles.NavBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Image source={require('../app/images/home1.png')} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../app/images/profile2.png')} style={styles.icon}/>    
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../app/images/logout1.png')} style={styles.icon}/>
            </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

export default Content_on_the_Profile;

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
        marginTop:"5%",
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
        width: 30,   // Icon width
        height: 30,  // Icon height
        tintColor: 'white',  // Change icon color to white
    },

    

})