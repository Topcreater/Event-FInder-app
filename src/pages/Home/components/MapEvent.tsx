import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import searchIcon from '../../../assest/search.png';

const MapEvent = ({ events, searchKeyword, setSearchKeyword, loading }: any) => {

    return (
        <View >
            <ScrollView>
                <View style={styles.searchContanir}>
                    <Image source={searchIcon} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor={'black'}
                        style={styles.searchBar}
                        value={searchKeyword}
                        onChangeText={setSearchKeyword}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    // <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                    // </View>
                )}
            </ScrollView>
        </View>
    );
};

const windowWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    searchContanir: {
        marginTop: 20,
        backgroundColor: '#EEEEEE',
        width: windowWidth * 0.95,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        shadowColor: 'grey',
    },
    searchIcon: {
        width: 25,
        height: 25,
    },
    searchBar: {
        color: 'black',
        paddingLeft: 10,
        width: windowWidth * 0.80,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        height: 400,
        width: windowWidth,
        marginTop: 20,
    },
    btnContanir: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
    },
    selectedButton: {
        backgroundColor: 'black',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
});

export default MapEvent;
