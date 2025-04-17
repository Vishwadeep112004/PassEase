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
import Info from './Info';

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_adminDashboard = ({ navigation }: Props) => {


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
          keyboardShouldPersistTaps="handled">
            <Text style={styles.heading}>Admin Dashboard</Text>
          <View style={styles.formContainer}>
            <Info
              name="Alice"
              route="Kolhapur to Sangli"
              doc1="https://example.com/alice-doc1.pdf"
              doc2="https://example.com/alice-doc2.pdf"
            />
            <Info
              name="Bob"
              route="Pune to Mumbai"
              doc1="https://example.com/bob-doc1.pdf"
              doc2="https://example.com/bob-doc2.pdf"
            />
            <Info
              name="Charlie"
              route="Satara to Nashik"
              doc1="https://example.com/charlie-doc1.pdf"
              doc2="https://example.com/charlie-doc2.pdf"
            />
            <Info
              name="Diana"
              route="Sangli to Solapur"
              doc1="https://example.com/diana-doc1.pdf"
              doc2="https://example.com/diana-doc2.pdf"
            />
            <Info
              name="Ethan"
              route="Kolhapur to Pune"
              doc1="https://example.com/ethan-doc1.pdf"
              doc2="https://example.com/ethan-doc2.pdf"
            />
            <Info
              name="Fiona"
              route="Nagpur to Aurangabad"
              doc1="https://example.com/fiona-doc1.pdf"
              doc2="https://example.com/fiona-doc2.pdf"
            />
          </View>

        </ScrollView> 
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Content_on_adminDashboard;

const styles = StyleSheet.create({
  container: {
    height: '90%',
    

  },
  heading: {
    color: 'white',
    fontSize: 40,
    marginTop: '5%',
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 59, 59)',
    width: '100%',
    height: '70%',
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
    borderRadius: 5,
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
