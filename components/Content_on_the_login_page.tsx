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
  Platform,
  ToastAndroid
} from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_the_login_page = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        return Alert.alert('Error', 'Please enter both email and password');
      }

      const loginData = { fullname: email, password };
      const response = await axios.post('http://192.168.144.28:5000/api/users/login', loginData);

      if (response.data.message === 'Login successful') {
        ToastAndroid.show('Login successful!', ToastAndroid.SHORT);

        const userData = response.data.user;

        navigation.navigate('Dashboard', {
          user: {
            name: userData.fullname
          }
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Invalid credentials or server error');
    }
  };

  return (
    <LinearGradient colors={['#2980B9', '#89253e']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>LOGIN</Text>
          <View style={styles.formContainer}>
            <Text style={styles.text}>Full Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="black"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.text}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="black"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
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

export default Content_on_the_login_page;

// const styles = StyleSheet.create({
//   container: {
//     height: '90%',
//   },
//   heading: {
//     color: 'white',
//     fontSize: 60,
//     marginTop: '30%',
//     alignSelf: 'center',
//     fontWeight: 'bold',
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
//     color: 'black',
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
//     margin: '20%',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
// login page

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },
  heading: {
    color: 'white',
    fontSize: 60,
    marginTop: '50%',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 59, 59)',
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 20,
    marginTop: '20%',
    borderWidth:1.5
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
    color: 'black',
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
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    margin: '20%',
    marginTop:50,
    borderWidth:1.5
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});