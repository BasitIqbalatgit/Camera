import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';

import { Button } from "react-native-paper";
import {  
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig';

function TakePicture() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isModalVisible, setModalVisible] = useState(false);
  const [enteredName, setEnteredName] = useState('');
  const [image, setImage] = useState(null);

  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button mode="contained" onPress={requestPermission}  >Grant Permission</Button> 
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((currentType) =>
      currentType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.current.takePictureAsync();
      setImage(photoData.uri);
    }
    setModalVisible(true);
 };

  const saveImage = async () => {
    try {
      if(enteredName !== '') {
        const imageRef = collection(db, 'images');
        const docRef = await addDoc(imageRef, {
          name: enteredName,
          url: image
        });

        console.log('Image uploaded with id: ', docRef.id);
      }
    } catch (error) {
      console.log('Error in saving image: ', error);
    }
    setModalVisible(false);
    setEnteredName('');
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text><MaterialCommunityIcons name="camera-flip" size={50} color="white" /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text><Entypo name="circle" size={60} color="white"/></Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={styles.model}
        >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Enter Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEnteredName(text)}
            value={enteredName}
          />
          <Button mode="contained" onPress={saveImage} style={{ backgroundColor: '#8B4513' }}>Save Image</Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },model:{
    height:"100%",
    backgroundColor: 'transparent',
  }
  ,
  modalContainer: {
    height:"50%",
    width:"100%",
    flex: 1,
   marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white",
    borderRadius:20
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius:10
  },
});
export default TakePicture;