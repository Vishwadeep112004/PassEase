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
  ToastAndroid,
  ActivityIndicator
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
  const [loading, setLoading] = useState(false);

  const handleDocumentPickdoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        const supportedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!supportedTypes.includes(file.mimeType || "")) {
          Alert.alert("Unsupported file", "Please upload a valid PDF or Word document.");
          return;
        }

        setSelectedDocument({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "application/pdf"
        });

        Platform.OS === "android"
          ? ToastAndroid.show("Document uploaded successfully!", ToastAndroid.SHORT)
          : Alert.alert("Success", "Document uploaded successfully!");
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const handleDocumentPickPhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        setPhoto({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "image/jpeg"
        });

        Platform.OS === "android"
          ? ToastAndroid.show("Photo uploaded successfully!", ToastAndroid.SHORT)
          : Alert.alert("Success", "Photo uploaded successfully!");
      }
    } catch (error) {
      console.log("Error picking photo:", error);
    }
  };

  const registerUser = async () => {
    if (!fullName) return Alert.alert("Error", "Please enter your full name.");
    if (!email) return Alert.alert("Error", "Please enter your email.");
    if (!email.includes('@')) return Alert.alert("Error", "Enter a valid email.");
    if (!password) return Alert.alert("Error", "Please enter a password.");
    if (!confirmPassword) return Alert.alert("Error", "Please confirm your password.");
    if (password !== confirmPassword) return Alert.alert("Error", "Passwords do not match.");
    if (!route) return Alert.alert("Error", "Please select a route.");
    if (!photo?.uri || !photo?.name || !photo?.type) return Alert.alert("Error", "Invalid profile photo.");
    if (!selectedDocument?.uri || !selectedDocument?.name) return Alert.alert("Error", "Invalid profile document.");
  
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append("fullname", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("route", route);
  
      formData.append("profilepic", {
        uri: photo.uri,
        type: photo.type,
        name: photo.name
      } as any);
  
      formData.append("profilepdf", {
        uri: selectedDocument.uri,
        type: selectedDocument.type || 'application/pdf',
        name: selectedDocument.name || 'document.pdf'
      } as any);
  
      const res = await axios.post("http://192.168.144.28:5000/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
  
      const userData = res.data;
      navigation.navigate("Login", { userData }); 
  
    } catch (error: any) {
      console.error("Register Error:", error?.response?.data || error.message);
  
      if (error.response) {
        const msg = error.response.data?.message 
                    || (typeof error.response.data === "string" ? error.response.data : "Invalid input or file format.");
        Alert.alert("Registration Failed", msg);
      } else if (error.request) {
        Alert.alert("Network Error", "Could not reach the server. Please check your connection.");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
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

          {loading ? (
            <ActivityIndicator size="large" color="white" style={{ marginVertical: 20 }} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={registerUser}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          )}
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
