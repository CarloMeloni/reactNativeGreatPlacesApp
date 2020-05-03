import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL); //CAMERA_ROLL PER LA GALLERIA
        if (result.status !== 'granted') {
            Alert.alert('Cosa sei vendi?', 'Vi vò l\'autorizzazioni pa la fotoccamera!', [{text: 'Anda bè!'}]);
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8
        });

        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return(
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                 { !pickedImage 
                 ? <Text>Nessuna foto scattata per il momento.</Text>
                 : <Image style={styles.image} source={{uri: pickedImage}} /> 
                 }
            </View>
            <Button title='Scatta foto' color={Colors.primary} onPress={takeImageHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImgPicker;