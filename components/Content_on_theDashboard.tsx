import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, CameraView } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
  Dashboard: {
    user: {
      name: string;
      state: string;
      daysLeft: number;
      route: string;
    };
  };
};

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<RootStackParamList, 'Dashboard'>;
};

const Content_on_theDashboard = ({ navigation, route }: Props) => {
  const [name, setName] = useState("Loading...");
  const [state, setState] = useState("Loading...");
  const [days, setDays] = useState("Loading...");
  const [routeName, setRouteName] = useState("Loading...");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scanDisabled, setScanDisabled] = useState(false);



  const handleScanLimitCheck = async (fullname: string): Promise<boolean> => {
    try {
      const response = await fetch("http://192.168.144.28:5000/api/users/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fullname })
      });
  
      const data = await response.json();
  
      // If backend says scan limit is 0, disable scan
      if (data.scanLimit === 0) {
        Toast.show({
          type: 'error',
          text1: 'Scan Disabled',
          text2: 'Scanning is currently disabled.',
        });
        return false;
      }
      console.log("Scan Limit Data:", data);
      
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Scan Allowed',
          text2: `Scan ${data.scanCount} of ${data.scanLimit} done`,
        });
        return true;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Limit Reached',
          text2: data.error || 'Scan not allowed.',
        });
        return false;
      }
  
    } catch (err) {
      console.error("Backend Scan Check Error:", err);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Unable to verify scan limit',
      });
      return false;
    }
  };
  

  // Common daily limiter function
  const checkDailyLimit = async (key: string, limit: number): Promise<boolean> => {
    const today = new Date().toISOString().split('T')[0];
    const storedDate = await AsyncStorage.getItem(`${key}Date`);
    let count = parseInt((await AsyncStorage.getItem(`${key}Count`)) || '0');

    if (storedDate !== today) {
      await AsyncStorage.setItem(`${key}Date`, today);
      await AsyncStorage.setItem(`${key}Count`, '0');
      return false;
    }

    if (count >= limit) return true;
    return false;
  };

  const incrementDailyCount = async (key: string) => {
    const today = new Date().toISOString().split('T')[0];
    let count = parseInt((await AsyncStorage.getItem(`${key}Count`)) || '0');
    count += 1;
    await AsyncStorage.setItem(`${key}Count`, count.toString());
    await AsyncStorage.setItem(`${key}Date`, today);
  };

  useEffect(() => {
    if (route.params && route.params.user) {
      const { name, state, route: userRoute } = route.params.user;
      setName(name);
      setState(state);
      setRouteName(userRoute);
    }
  }, [route.params]);

  useEffect(() => {
    const handleDaysLeftUpdate = async () => {
      if (route.params && route.params.user) {
        let { daysLeft } = route.params.user;
        const limitReached = await checkDailyLimit('days', 1);

        if (!limitReached) {
          if (daysLeft > 0) daysLeft -= 1;
          await AsyncStorage.setItem('userDaysLeft', daysLeft.toString());
          await incrementDailyCount('days');
        } else {
          const storedDays = await AsyncStorage.getItem('userDaysLeft');
          if (storedDays) daysLeft = parseInt(storedDays);
        }

        setDays(daysLeft.toString());
      }
    };

    handleDaysLeftUpdate();
  }, [route.params]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const limitReached = await checkDailyLimit('scan', 2);
      if (limitReached) setScanDisabled(true);
    })();
  }, []);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    const limitReached = await checkDailyLimit('scan', 0);
    if (limitReached) {
      alert('You can only scan the QR code twice per day.');
      setScanDisabled(true);
      setModalVisible(false);
      return;
    }

    await incrementDailyCount('scan');
    setScanned(true);
    setModalVisible(false);
    alert(`Scanned QR code: ${data}`);
  };

  if (hasPermission === null) return <Text>Requesting permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <LinearGradient colors={['#2980B9', '#89253e']} style={styles.mainContainer}>
      <View style={styles.Container}>
        <Image source={require("../app/images/person.jpg")} style={styles.Image} />
        <View style={styles.infoContainer}><Text style={styles.Text}>State: {state}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Name: {name}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Days left: {days}</Text></View>
        <View style={styles.infoContainer}><Text style={styles.Text}>Valid route: {routeName}</Text></View>
      </View>

      <TouchableOpacity
        style={[styles.button,{ backgroundColor: 'gray' }]}
        onPress={async () => {
          const allowed = await handleScanLimitCheck(name);
          if (allowed) {
            setModalVisible(true);
            setScanned(false);
          }
        }}
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
