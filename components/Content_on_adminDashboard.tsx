import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView,
  Platform 
} from 'react-native';

import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Info from './Info'; // Assuming you have an Info component
import axios from 'axios';

type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_adminDashboard = ({ navigation }: Props) => {

  const [userData, setUserData] = useState<any[]>([]);  // User data state
  const [loading, setLoading] = useState(false);  // Loading state

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.144.28:5000/api/users/getall');  // Replace with actual backend URL
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Could not fetch users.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchUsers();
  }, []);

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
              {loading ? (
                <Text style={styles.loading}>Loading users...</Text>
              ) : (
                userData.length > 0 ? (
                  userData.map((user, index) => (
                    <Info
                      key={user._id || index}
                      name={user.fullname}
                      route={user.route}
                      doc1={user.profilepic} // Correct field for the PDF
                      doc2={user.profilepdf} // Correct field for the image
                      userId={`${index}`}                    />
                  ))
                  
                ):(
                  <Text>No users found</Text>
                )
              )}
            </View>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgb(255, 59, 59)',
                  width: '30%',
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  marginHorizontal:'auto'
                }}
                onPress={() => navigation.navigate('Chart')}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>Chart</Text>
              </TouchableOpacity>
            
        </ScrollView> 
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Content_on_adminDashboard;

// const styles = StyleSheet.create({
//   container: {
//     height: '90%',
//   },
//   heading: {
//     color: 'white',
//     fontSize: 40,
//     marginTop: '5%',
//     alignSelf: 'center',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   formContainer: {
//     alignItems: 'center',
//     backgroundColor: 'rgb(255, 59, 59)',
//     width: '100%',
//     height: '70%',
//     borderRadius: 15,
//     alignSelf: 'center',
//     paddingVertical: 20,
//     marginTop: '20%',
//   },
//   loading: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

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
    height: 'auto',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 20,
    marginTop: '20%',
    borderWidth:2
  },
  loading: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },});
