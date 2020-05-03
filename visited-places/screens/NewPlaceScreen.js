import React, { useState } from 'react';
import { ScrollView, View, Button, Text, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import * as placesAction from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/Colors';

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        // si può aggiungere validation form
        setTitleValue(text);
    };

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath);
    };

    const savePlaceHandler = () => {
        dispatch(placesAction.addPlace(titleValue, selectedImage));
        props.navigation.goBack();
    };

    return(
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Location:</Text>
                <TextInput style={styles.TextInput} onChangeText={titleChangeHandler} value={titleValue} />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker />
                <Button title='Salva il luogo' color={Colors.primary} onPress={savePlaceHandler} /> 
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Aggiungi un luogo'
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 17,
        marginBottom: 15
    },
    TextInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;