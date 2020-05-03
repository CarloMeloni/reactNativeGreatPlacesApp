import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION); //CAMERA_ROLL PER LA GALLERIA
        if (result.status !== 'granted') {
            Alert.alert('Cosa sei vendi?', 'Vi vò l\'autorizzazioni pa la posizioni!', [{text: 'Anda bè!'}]);
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({timeout: 5000});
            console.log(location);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert('Non è possibile ottenere la posizione', 'Riprova piu tardi', [{text: 'Okay'}]);
        }
        setIsFetching(false);
    };

    return(
            <View style={styles.locationPicker}>
                <MapPreview style={styles.mapPreview} location={pickedLocation}>
                    {isFetching 
                    ? <ActivityIndicator size='large' color={Colors.primary} /> 
                    : <Text>Nessuna location scelta per il momento.</Text>}
                </MapPreview>
                <Button title="Ottieni la posizione!" color={Colors.primary} onPress={getLocationHandler} />
            </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 140,
        borderColor: '#ccc',
        borderWidth: 1,
        
    }
});

export default LocationPicker;