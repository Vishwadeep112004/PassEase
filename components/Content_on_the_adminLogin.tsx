import React, { useState } from 'react';
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
} from 'react-native';

import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_the_adminLogin = ({ navigation }: Props) => {
  const correctuserName = "Admin";
  const correctPassword = "Admin@123";
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (userName === correctuserName && password === correctPassword) {
      navigation.navigate("adminDashboard");
    } else if (userName === "" || password === "") {
      Alert.alert("Login Failed", "Please fill in all fields");
    } else if (userName !== correctuserName) {
      Alert.alert("Login Failed", "Incorrect username");
      setUserName("");
      setPassword("");
    } else if (password !== correctPassword) {
      Alert.alert("Login Failed", "Incorrect password");
      setUserName("");
      setPassword("");
    }
  };

  return (
    <LinearGradient 
      colors={['#2980B9', '#89253e']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
          <Text style={styles.heading}>AUTHOR LOGIN</Text>
          
          <View style={styles.formContainer}>
            <Text style={styles.text}>Authority mail:</Text>
            <TextInput 
              style={styles.input}
              placeholder='Enter the mail'
              placeholderTextColor='black'
              autoCorrect={false}
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            
            <Text style={styles.text}>Password:</Text>
            <TextInput 
              style={styles.input}
              placeholder='Enter the Password'
              placeholderTextColor='black'
              secureTextEntry
              autoCorrect={false}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Content_on_the_adminLogin;

// const styles = StyleSheet.create({
//   container: {
//     height: '90%'
//   },
//   heading: {
//     color: 'white',
//     fontSize: 60,
//     marginTop: '30%',
//     alignSelf: 'center',
//     fontWeight: 'bold'
//   },
//   formContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgb(255, 59, 59)',
//     width: '85%',
//     borderRadius: 15,
//     alignSelf: 'center',
//     paddingVertical: 20,
//     marginTop: '20%',
//   },
//   input: {
//     backgroundColor: 'white',
//     width: '80%',
//     marginVertical: 10,
//     padding: 15,
//     borderRadius: 15,
//     color: 'black'
//   },
//   text: {
//     alignSelf: 'flex-start',
//     marginLeft: '10%',
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   button: {
//     backgroundColor: 'rgb(255, 59, 59)',
//     padding: 15,
//     borderRadius: 5,
//     width: 200,
//     alignItems: 'center',
//     alignSelf: 'center',
//     margin: '20%'
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
// });


const styles = StyleSheet.create({
  container: {
    height: '90%'
  },
  heading: {
    color: 'white',
    fontSize: 50,
    marginTop: '30%',
    alignSelf: 'center',
    fontWeight: 'bold'
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
    borderWidth:1,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
    color: 'black'
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
    borderRadius: 15,
    borderWidth:2,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    margin: '20%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});