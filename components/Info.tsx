import { StyleSheet, Text, View, Modal, TouchableOpacity, Button, Linking } from 'react-native'
import React, { useState } from 'react'
interface InfoProps {
  name: string;
  route: string;
  doc1: string;
  doc2: string;
}
const Info = ({name,route,doc1,doc2}:InfoProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  

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
              <Text style={styles.linkText}>Adhar card and bonafide cetificate</Text>
            </TouchableOpacity>
            <View style={styles.modalButtons}>
              <Button title="Accept" onPress={() => setModalVisible(false)} />
              <Button title="Reject" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Info

const styles = StyleSheet.create({
  container:
  {
    height: '10%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    margin: '3%'
  },
  name: {
    fontSize: 18
  },
  infoButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5
  },
  infoText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 10
  }
  
})
