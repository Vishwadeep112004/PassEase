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
import axios from 'axios';

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_the_login_page = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Validate input fields
      if (!email || !password) {
        return Alert.alert('Error', 'Please enter both email and password');
      }

      // Prepare the data for login
      const loginData = { fullname: email, password };

      // Send login request to the backend
      const response = await axios.post('http://192.168.190.28:5000/api/users/login', loginData);

      if (response.data.message === 'Login successful') {
        // Navigate to Dashboard on successful login
        Alert.alert('Success', 'Login successful!');
        navigation.navigate("Dashboard"); // Redirect to Dashboard after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Invalid credentials or server error');
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
        <ScrollView contentContainerStyle={{ flexGrow: 2 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>LOGIN</Text>
          
          <View style={styles.formContainer}>
            <Text style={styles.text}>Enter user mail:</Text>
            <TextInput 
              style={styles.input}
              placeholder='Enter the mail'
              placeholderTextColor='black'
              autoCorrect={false}
              value={email}
              onChangeText={setEmail} // Bind email field
            />
            
            <Text style={styles.text}>Password:</Text>
            <TextInput 
              style={styles.input}
              placeholder='Enter the Password'
              placeholderTextColor='black'
              secureTextEntry
              autoCorrect={false}
              value={password}
              onChangeText={setPassword} // Bind password field
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

const styles = StyleSheet.create({
  container: {
    height: '90%',
  },
  heading: {
    color: 'white',
    fontSize: 60,
    marginTop: '30%',
    alignSelf: 'center',
    fontWeight: 'bold',
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
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    margin: '20%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
