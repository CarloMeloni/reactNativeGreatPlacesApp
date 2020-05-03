import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderTitle } from 'react-navigation-stack';

const PlaceDetailScreen = props => {
    return(
        <View>
            <Text>PlaceDetailScreen!</Text>
        </View>
    );
};

PlaceDetailScreen.navigationOptions = navData => {
    return {
        HeaderTitle: navData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({});

export default PlaceDetailScreen;