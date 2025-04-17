import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CameraView } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = {
  navigation: NavigationProp<any>;
};

const Content_on_theDashboard = ({ navigation }: Props) => {
  const [name, setName] = useState("shahid Mulani");
  const [state, setState] = useState("Active");
  const [days, setDays] = useState("30");
  const [route, setRoute] = useState("Kolhapur to Sangli");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scanDisabled, setScanDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
  
      const today = new Date().toISOString().split('T')[0];
      const storedDate = await AsyncStorage.getItem('lastScanDate');
      const scanCount = parseInt((await AsyncStorage.getItem('scanCount')) || '0');
  
      if (storedDate === today && scanCount >= 2) {
        setScanDisabled(true);
      }
    })();
  }, []);
  

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    const today = new Date().toISOString().split('T')[0];
    const storedDate = await AsyncStorage.getItem('lastScanDate');
    let scanCount = parseInt((await AsyncStorage.getItem('scanCount')) || '0');
  
    if (storedDate !== today) {
      scanCount = 0;
      await AsyncStorage.setItem('lastScanDate', today);
      await AsyncStorage.setItem('scanCount', '0');
    }
  
    if (scanCount >= 2) {
      alert('You can only scan the QR code twice per day.');
      setScanDisabled(true);
      setModalVisible(false);
      return;
    }
  
    scanCount += 1;
    await AsyncStorage.setItem('scanCount', scanCount.toString());
    await AsyncStorage.setItem('lastScanDate', today);
  
    setScanned(true);
    setModalVisible(false);
    alert(`Scanned QR code: ${data}`);
  };
  
  if (hasPermission === null) return <Text>Requesting permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <LinearGradient colors={['#2980B9', '#ffffff']} style={styles.mainContainer}>
      <View style={styles.Container}>
        <Image source={require("../app/images/person.jpg")} style={styles.Image} />
        <View style={styles.infoContainer}><Text style={styles.Text}>State: {state}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Name: {name}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Days left: {days}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Valid route: {route}</Text></View>
      </View>

      <TouchableOpacity
            style={[styles.button, scanDisabled && { backgroundColor: 'gray' }]}
            onPress={() => { setModalVisible(true); setScanned(false); }}
            disabled={scanDisabled}
            >
            <Text style={styles.buttonText}>
                {scanDisabled ? "Limit Reached" : "Scan QR"}
            </Text>
      </TouchableOpacity>


      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <CameraView
            style={StyleSheet.absoluteFill}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.NavBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image source={require('../app/images/home2.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
    padding: "4%",
  },
  button: {
    backgroundColor: "#FF3B3B",
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    height: 55,
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
    backgroundColor: '#8A2BE2',
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
