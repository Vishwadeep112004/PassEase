import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { lazy, useState } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    navigation: NavigationProp<any>;
};

const Content_on_the_Profile = ({ navigation }: Props) => {
    const [name, setName] = useState<string>("shahid Mulani");
    const [state, setState] = useState<string>("Active");
    const [days, setDays] = useState<string>("30");
    const [route, setRoute] = useState<string>("Kolhapur to Sangli");

    return (
        <LinearGradient
            colors={['#8A2BE2', '#FF1493', '#000080']}
            style={styles.mainContainer}
        >

            <View style={styles.Container}>

                <View style={styles.editnav}>
                    <Text style={styles.navedittext}>Edit Profile</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Image source={require("../app/images/edit.png")} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>

                <Image source={require("../app/images/person.jpg")} style={styles.Image} />

               <View style={styles.label}>
                    <Text style={styles.Text}>Full Name:</Text>
                </View> 
               <View style={styles.infoContainer}>
                    <Text style={styles.Text}>{name}</Text>
                </View>
                

               <View style={styles.label}>
                    <Text style={styles.Text}>Full Name:</Text>
                </View> 
                <View style={styles.infoContainer}>
                    <Text style={styles.Text}>{days}</Text>  
                </View>


               <View style={styles.label}>
                    <Text style={styles.Text}>Full Name:</Text>
                </View> 
                <View style={styles.infoContainer}>
                    <Text style={styles.Text}>{route}</Text> 
                </View>

                
            </View>




            <View style={styles.NavBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.editBtn}>
                    <Image source={require('../app/images/home1.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../app/images/profile2.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Image source={require('../app/images/logout1.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Content_on_the_Profile;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor:"violet",
        paddingTop: "10%",
        alignItems: "center",
        width: "auto",
        height: "auto",
    },
    
    Container: {
        backgroundColor: "red",
        height: "70%",
        width: "90%",
        marginTop: "5%",
        borderRadius: 30

    },
    Image: {
        height: "35%",
        width: "46%",
        // resizeMode:"contain",
        marginLeft: "27%",
        borderRadius: 15,
        marginTop: "5%",
        marginBottom: "5%"
    },
    infoContainer: {
        margin: 50,
        flexDirection: 'row',  // Align items in a row
        alignItems: 'center',  // Center items vertically
        justifyContent: 'space-between',  // Space between text and button
        padding: 15,
        borderWidth: 1,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,

    },
    Text: {
        fontSize: 20,
        fontFamily: 'Poppins',
        color: '#333',
        fontWeight: '700',
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
    },

    editnav:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        borderRadius:30,
        width: '100%',
        shadowRadius: 30,
        shadowColor: '#125212',
        shadowOpacity: 1,
        shadowOffset:{width: 3, height: 4},
        marginBottom: 30,
    },
    navedittext:{
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    },

    editIcon: {
        padding: 10,
        width: 30,
        height: 30,
        margin: 'auto',
        marginRight: 10,
    },

    editBtn: {
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },


})