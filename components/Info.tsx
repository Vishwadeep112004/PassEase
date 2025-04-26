import { StyleSheet, Text, View, Modal, TouchableOpacity, Button, Linking, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

interface InfoProps {
  name: string;
  route: string;
  doc1: string;
  doc2: string;
  userId: string; // Add userId prop
}

const Info = ({ name, route, doc1, doc2, userId }: InfoProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAccept = async () => {
    try {
      const response = await axios.post('http://192.168.144.28:5000/api/admin/verify', {
        fullname: name, // <-- Send fullname key here
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'User verified successfully');
        setModalVisible(false);
      }
    } catch (error: any) {
      console.error('Verification failed:', error.response?.data?.error || error.message);
      Alert.alert('Error', 'Failed to verify user');
    }
  };
  

  const handleReject = () => {
    // You can add rejection API here if needed
    Alert.alert('Rejected', 'User has been rejected');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.infoText}>Info</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalName}>{name}</Text>
            <Text style={styles.modalInfo}>Here is some information about {name}.</Text>
            <Text style={styles.modalInfo}>Route: {route}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(doc1)}>
              <Text style={styles.linkText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(doc2)}>
              <Text style={styles.linkText}>Adhar card and bonafide certificate</Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <Button title="Accept" color="green" onPress={handleAccept} />
              <Button title="Reject" color="red" onPress={handleReject} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    margin: '3%',
  },
  name: {
    fontSize: 18,
  },
  infoButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 10,
  },
});
