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

type Document = {
  name: string;
};

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_the_register_page: React.FC<Props> = ({ navigation }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.assets && result.assets.length > 0) {
        setSelectedDocument({ name: result.assets[0].name });
  
        if (Platform.OS === "android") {
          ToastAndroid.show("File uploaded successfully!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Success", "File uploaded successfully!");
        }
      }
    } catch (error) {
      console.log("Error picking file:", error);
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
            <TextInput style={styles.input} placeholder='Enter your full name' placeholderTextColor='black' autoCorrect={false} />
            
            <Text style={styles.text}>Password:</Text>
            <TextInput style={styles.input} placeholder='Enter password' placeholderTextColor='black' secureTextEntry autoCorrect={false} />
            
            <Text style={styles.text}>Confirm Password:</Text>
            <TextInput style={styles.input} placeholder='Re-enter password' placeholderTextColor='black' secureTextEntry autoCorrect={false} />
            
            <RNPickerSelect
              onValueChange={(value) => setSelectedValue(value)}
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
                  fontSize: 16
                },
                placeholder: {
                  color: 'black',
                  fontSize: 16
                }
              }}
              placeholder={{ label: "Choose a route...", value: null }}
            />
            
            <Text style={styles.text}>Upload Document:</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPick}>
              <Text style={styles.buttonText2}>Choose File</Text>
            </TouchableOpacity>
            {selectedDocument && <Text style={styles.selectedFileText}>{selectedDocument.name}</Text>}
          </View>
          
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Dashboard")}>
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
    marginVertical: 15,
    padding: 15,
    borderRadius: 15,
    color: 'black',
    height: '10%',
  },
  text: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 0, // Ensure number instead of string
  },
  button: {
    backgroundColor: 'rgb(255, 59, 59)',
    padding: 15,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    margin: '10%',
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