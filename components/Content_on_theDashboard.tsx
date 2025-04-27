import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView } from 'expo-camera';

import { PermissionsAndroid } from 'react-native';
import axios from 'axios';

type RootStackParamList = {
  Dashboard: {
    user: {
      name: string;
      state: string;
      daysLeft: number;
      route: string;
      paid: boolean;
    };
  };
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<RootStackParamList, 'Dashboard'>;
};

const Content_on_theDashboard = ({ navigation, route }: Props) => {

  const [name, setName] = useState("Loading...");
  const [state, setState] = useState("Inactive");
  const [days, setDays] = useState("Loading...");
  const [routeName, setRouteName] = useState("Loading...");
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scanDisabled, setScanDisabled] = useState(true);
  const [paid, setPaid] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [verified, setVerified] = useState(true); // Default true for existing users
  const [verificationModal, setVerificationModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");



// Initial fetch on load
useEffect(() => {
  let interval: NodeJS.Timeout;

  const fetchUserData = async () => {
    if (!route.params?.user?.name) return;
    const fullname = route.params.user.name;
    setName(fullname);

    try {
      const response = await fetch("http://192.168.144.28:5000/api/users/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullname })
      });

      const data = await response.json();

      if (response.ok) {
        setPaid(data.paid);
        setDays(data.daysLeft?.toString());
        setRouteName(data.route);
        setScanCount(data.scanCount);
        setVerified(data.isVerified);
        setMsg(data.msg);
        setId(data._id);
        if (!data.isVerified) {
          setVerificationModal(true); 
        } else {
          setVerificationModal(false); 
        }
        
        if (data.scanCount <= 0 || !data.paid) {
          setScanDisabled(true);
        } else {
          console.log("Scan count:", data.scanCount);
          setScanDisabled(false);
          setState("Active");
        }
      } else {
        console.error("Error:", data.error);
      }

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchUserData();
  interval = setInterval(fetchUserData, 3000);
  return () => clearInterval(interval);
}, [route.params?.user?.name]); 

  useEffect(() => {
    const requestPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    };
  
    requestPermission();
  }, []);


  const handleBarcodeScanned = async () => {
    setScanned(true);
    setModalVisible(false); 
    alert('QR code scanned');
    await scanUser();
    

  };


  const deleteObjectByName = async (fullname: string) => {
    try {
        const response = await fetch(`http://192.168.144.28:5000/api/users/delete`, {
            method: 'POST', // POST because we send data in body
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullname }) // Send fullname in body
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User deleted successfully:', data);
        } else {
            const errorData = await response.json();
            console.error('Error deleting user:', errorData);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};




  const scanUser = async () => {
    if (name === "Loading...") return;
  
    try {
      const response = await axios.post('http://192.168.144.28:5000/api/users/scan', { fullname: name });
  
      if (response.status === 200) {
        console.log('Scan successful');
  
        if (response.data.scanCount === 0) {
          setScanDisabled(true);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        console.error('No scans left');
        setScanDisabled(true);
      } else if (error.response) {
        console.error('Scan failed:', error.response.data.error);
      } else {
        console.error('Scan error:', error.message);
      }
    } finally {
      setModalVisible(false);
    }
  };

  const handlePaid = async () => {
    console.log(name);
    try {
      const response = await axios.post('http://192.168.144.28:5000/api/users/paid', {
        fullname: name, // pass user's fullname
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'Payment status updated successfully');
        setScanDisabled(false);
        setPaid(true);// if you want to close any modal after paid
      }
    } catch (error: any) {
      console.error('Payment update failed:', error.response?.data?.error || error.message);
      Alert.alert('Error', 'Failed to update payment status');
    }
  };
  



  return (
    <LinearGradient colors={['#2980B9', '#89253e']} style={styles.mainContainer}>
      <View style={styles.Container}>
        <Image source={require("../app/images/person.jpg")} style={styles.Image} />
        <View style={styles.infoContainer}>
          <Text style={state === "Active" ? styles.activeText : styles.inactiveText}>
            {state === "Active" ? "🟢 Active" : "🔴 Inactive"}
          </Text>
        </View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Name: {name}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Days left: {days}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Valid route: {routeName}</Text></View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: scanDisabled ? '#ccc' : '#FF3B3B' }]}
        onPress={() => setModalVisible(true)}
        disabled={scanDisabled}
      >
        <Text style={styles.buttonText}>Scan QR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: paid ? '#ccc' : '#FF3B3B' }]}
          onPress={() => {handlePaid()}}
      >                      
        <Text style={styles.buttonText}>
          Paid
        </Text>
      </TouchableOpacity>

{/* this modal is for camera view */}
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <CameraView
            style={StyleSheet.absoluteFill}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={handleBarcodeScanned}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

          

        </View>
      </Modal>



{/* this is the modal for verification pending */}
      <Modal
        visible={verificationModal}
        transparent
        animationType="fade"
      >
        <View style={styles.verificationModalContainer}>
          <View style={styles.verificationModalContent}>
            <Text style={styles.verificationText}>
             {msg!==""? "Your verification is pending, please wait..." :` youre form is rejected{\n}reason: ${msg}{\n}register again`}
            </Text>

            {/* Add BACK Button here */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => 
                {
                  if (msg !== "") {
                    // Call the function to delete the object if msg is not empty
                    deleteObjectByName(name);
                  }
                  navigation.reset({   
                  index: 0,
                  routes: [{ name: 'Landing' }],
              })}}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>



      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image source={require('../app/images/home2.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
          <Image source={require('../app/images/profile1.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../app/images/logout1.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Content_on_theDashboard;

const styles = StyleSheet.create({
  activeText: {
    fontSize: 18,
    color: '#128c07', // Green text when active
    fontWeight: 'bold',
    padding: '5%'
  },
  inactiveText: {
    fontSize: 18,
    color: 'red', // Red text when inactive
    fontWeight: 'bold',
    padding: '5%'
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  verificationModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verificationModalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  Container: {
    backgroundColor: "red",
    height: "70%",
    width: "90%",
    marginTop: "15%",
    borderRadius: 30,
  },
  Image: {
    height: "35%",
    width: "46%",
    marginLeft: "27%",
    borderRadius: 15,
    marginTop: "5%",
    marginBottom: "5%",
  },
  infoContainer: {
    height: "10%",
    backgroundColor: "white",
    width: "90%",
    marginLeft: "5%",
    margin: "2.5%",
    borderRadius: 10,
  },
  Text: {
    fontSize: 18,
    padding: "5%",
  },
  button: {
    backgroundColor: "#FF3B3B",
    padding: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: 40,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#00BFFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#FF3B3B',
    padding: 12,
    borderRadius: 8,
    zIndex: 1,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
