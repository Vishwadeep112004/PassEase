import { StyleSheet, Text, View, Modal, TouchableOpacity, Button, Linking, Alert, TextInput } from 'react-native'; // TextInput added
import React, { useState } from 'react';
import axios from 'axios';

interface InfoProps {
  name: string;
  route: string;
  doc1: string;
  doc2: string;
  userId: string;
}

const Info = ({ name, route, doc1, doc2, userId }: InfoProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState(''); // New state to store rejection message

  const handleAccept = async () => {
    try {
      const response = await axios.post('http://192.168.144.28:5000/api/admin/verify', {
        fullname: name,
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

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      Alert.alert('Error', 'Please enter a rejection reason.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.144.28:5000/api/admin/reject', {
        fullname: name,
        rejectMessage: rejectReason,
      });

      if (response.status === 200) {
        Alert.alert('Rejected', 'User has been rejected successfully');
        setModalVisible(false);
        setRejectReason(''); // Clear after submit
      }
    } catch (error: any) {
      console.error('Rejection failed:', error.response?.data?.error || error.message);
      Alert.alert('Error', 'Failed to reject user');
    }
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
            <Text style={styles.modalInfo}>Route: {route}</Text>

            <TouchableOpacity onPress={() => Linking.openURL(doc1)}>
              <Text style={styles.linkText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(doc2)}>
              <Text style={styles.linkText}>Adhar card and bonafide certificate</Text>
            </TouchableOpacity>

            {/* Input for Rejection Reason */}
            <TextInput
              placeholder="if form is invalid the enter rejection reason..."
              style={styles.input}
              value={rejectReason}
              onChangeText={setRejectReason}
              multiline
            />

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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
});
