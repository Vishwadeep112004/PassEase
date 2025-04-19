
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

import * as DocumentPicker from 'expo-document-picker';
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import axios from 'axios';

type Document = {
  name: string;
  uri: string;
  type: string;
};

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_the_register_page: React.FC<Props> = ({ navigation }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [route, setRoute] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState<any>(null);
  const [email, setEmail] = useState('');

  const verification = () => {
    if (!fullName) {
      Alert.alert("Error", "Please enter your full name.");
      return;
    }
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }
    if (!email.includes('@')) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

  
    if (!password) {
      Alert.alert("Error", "Please enter a password.");
      return;
    }
  
    if (!confirmPassword) {
      Alert.alert("Error", "Please confirm your password.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
  
    if (!route) {
      Alert.alert("Error", "Please select a route.");
      return;
    }
  
    if (!photo) {
      Alert.alert("Error", "Please upload a photo.");
      return;
    }
  
    if (!selectedDocument) {
      Alert.alert("Error", "Please upload a document.");
      return;
    }

    navigation.navigate("Dashboard");
  };

  const handleDocumentPickdoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"], // Adjust as needed
        copyToCacheDirectory: true
      });
  
      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
  
        setSelectedDocument({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "application/pdf" // default MIME type
        });
  
        if (Platform.OS === "android") {
          ToastAndroid.show("Document uploaded successfully!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Success", "Document uploaded successfully!");
        }
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };
  
  const handleDocumentPickPhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*"], // or use ["*/*"] for all types
        copyToCacheDirectory: true
      });
  
      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
  
        setPhoto({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "image/jpeg" 
        });
  
        if (Platform.OS === "android") {
          ToastAndroid.show("Photo uploaded successfully!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Success", "Photo uploaded successfully!");
        }
      }
    } catch (error) {
      console.log("Error picking photo:", error);
    }
  };
  


 

  const registerUser = async () => {
    try {
      const formData = new FormData();
      
      // Append user data
      formData.append("fullname", fullName);  // Updated from fullName to fullname to match the backend field
      formData.append("email", email);  // Add email to the formData (you need to define the 'email' field in your component)
      formData.append("password", password);
      formData.append("route", route || '');
  
      // Append profile picture if available
      if (photo) {
        formData.append("profilepic", {
          uri: photo.uri,
          type: photo.type, // e.g. 'image/jpeg'
          name: photo.name  // e.g. 'photo.jpg'
        } as any);  // 'as any' needed for React Native FormData
      }
  
      // Append document (PDF)
      if (selectedDocument) {
        formData.append("profilepdf", {
          uri: selectedDocument.uri,
          type: selectedDocument.type || 'application/pdf',  // Default MIME type if none provided
          name: selectedDocument.name || 'document.pdf'  // Default name if not provided
        } as any);
      }
  
      // Send POST request to register the user
      const res = await axios.post("http://192.168.190.28:5000/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      // Handle response (successful registration)
      Alert.alert("Success", "User Registered!");
      navigation.navigate("Dashboard");  // Navigate to the next screen after registration
  
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  

  
  return (
    <LinearGradient colors={['#2980B9', '#89253e']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 4 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>REGISTER</Text>
          <View style={styles.formContainer}>
          <Text style={styles.text}>Full Name:</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your full name'
              placeholderTextColor='black'
              autoCorrect={false}
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={styles.text}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your email'
              placeholderTextColor='black'
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.text}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your Password'
              placeholderTextColor='black'
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Text style={styles.text}>Confirm Password:</Text>
            <TextInput
              style={styles.input}
              placeholder='Confirm your password'
              placeholderTextColor='black'
              autoCorrect={false}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
            <RNPickerSelect
              onValueChange={(value) => setRoute(value)}
              items={[
                { label: "Sangli to Miraj", value: "sangli-miraj" },
                { label: "Karad to Satara", value: "karad-satara" },
                { label: "Pune to Mumbai", value: "pune-mumbai" },
                { label: "Kolhapur to Sangli", value: "kolhapur-sangli" }
              ]}
              style={{
                inputAndroid: {
                  ...styles.input,
                  color: 'black',
                  height: 50,
                  justifyContent: 'center',
                  marginLeft: '10%',
                  fontSize: 16,
                  marginTop: 15,
                },
                placeholder: {
                  color: 'black',
                  fontSize: 16
                }
              }}
              placeholder={{ label: "Choose a route...", value: null }}
            />

            <Text style={styles.text}>Upload Photo:</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPickPhoto}>
              <Text style={styles.buttonText2}>Choose File</Text>
            </TouchableOpacity>
            
            <Text style={styles.text}>Upload Document:</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPickdoc}>
              <Text style={styles.buttonText2}>Choose File</Text>
            </TouchableOpacity>
            {selectedDocument && <Text style={styles.selectedFileText}>{selectedDocument.name}</Text>}
          </View>
          
          <TouchableOpacity style={styles.button} onPress={verification}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
  },
  heading: {
    color: 'white',
    fontSize: 35,
    marginTop: '5%',
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
    marginTop: '5%',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    marginVertical: 3,
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
    marginTop: 10, 
    marginBottom: 0,
  },
  button: {
    backgroundColor: 'rgb(255, 59, 59)',
    padding: 15,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    margin: '5%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  selectedFileText: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
  },
});



export default Content_on_the_register_page;