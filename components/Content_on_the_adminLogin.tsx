import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView,
  Platform 
} from 'react-native'

import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  navigation: NavigationProp<any>;
};


const Content_on_the_adminLogin = ({ navigation }: Props)=>  {
  
    return (
      <LinearGradient 
                      colors={['#2980B9','#89253e']}  // Gradient colors
                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} // ✅ Ensure full coverage
                      >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 2 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>LOGIN</Text>
          
          <View style={styles.formContainer}>
            <Text style={styles.text}>Authority mail:</Text>
            <TextInput 
              style={styles.input}
              placeholder='Enter the mail'
              placeholderTextColor='black'
              autoCorrect={false}
            />
            
            <Text style={styles.text}>Password:</Text>
            <TextInput 
              style={styles.input}
              placeholder='Enter the Password'
              placeholderTextColor='black'
              secureTextEntry
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Dashboard")}>
          

            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      </LinearGradient>
    )
  }

  export default Content_on_the_adminLogin;

  const styles = StyleSheet.create({
    container: {

      height:'90%'
    },
    heading: {
      color: 'white',
      fontSize: 60,
      marginTop: '30%',
      alignSelf: 'center',
      fontWeight:'bold'
    },
    formContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(255, 59, 59)',
      width: '85%',
      borderRadius: 15,
      alignSelf: 'center',
      paddingVertical: 20,
      marginTop: '20%',
  
    },
    input: {
      backgroundColor: 'white',
      width: '80%',
      marginVertical: 10,
      padding: 15,
      borderRadius: 15,
      color:'black'
    },
    text: {
      alignSelf: 'flex-start',
      marginLeft: '10%',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    button: {
      backgroundColor: 'rgb(255, 59, 59)',
      padding: 15,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
      alignSelf: 'center',
      margin:'20%'
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    },
  })
