// CustomBox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const CustomBox = ({ event, onAddToFavorites, onClose }: any) => {

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Do you want to Favorites this Event {event._embedded.venues[0].name}?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button,]} onPress={() => onAddToFavorites()}>
                    <Text style={[styles.buttonText, { color: '#00A550' }]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,]} onPress={onClose}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        width: Dimensions.get('screen').width / 2,
        zIndex: 1,
        marginTop: -80,
    },
    eventName: {
        color: 'black',
        fontSize: 12,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'

    },
    button: {
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'black',
    },
});

export default CustomBox;
