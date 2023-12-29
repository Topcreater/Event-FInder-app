import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Image, TextInput, Platform, TouchableOpacity, Alert, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import searchIcon from '../../../assest/search.png';
import Geolocation from '@react-native-community/geolocation';

const MapEvent = ({ events, searchKeyword, setSearchKeyword, loading }: any) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef<MapView>(null);
    useEffect(() => {
        if (events && mapRef.current) {
            const coordinates = events.map((event: any) => ({
                latitude: parseFloat(event._embedded.venues[0].location.latitude),
                longitude: parseFloat(event._embedded.venues[0].location.longitude),
            }));

            const minLatitude = Math.min(...coordinates.map(coord => coord.latitude));
            const maxLatitude = Math.max(...coordinates.map(coord => coord.latitude));
            const minLongitude = Math.min(...coordinates.map(coord => coord.longitude));
            const maxLongitude = Math.max(...coordinates.map(coord => coord.longitude));

            mapRef.current.fitToCoordinates([{ latitude: maxLatitude, longitude: minLongitude }, { latitude: minLatitude, longitude: maxLongitude }], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, [events]);

    const handleMarkerPress = (event) => {
        if (selectedMarker && selectedMarker.id === event.id) {
            // If the same marker is pressed again, close the modal
            setModalVisible(false);
            setSelectedMarker(null);
        } else {
            // Open the small box for the selected marker
            setSelectedMarker(event);
            setModalVisible(true);
        }
    };

    const handleAddToFavorites = () => {
        // Implement your logic to add to favorites
        // You can use selectedMarker to get the information about the selected event

        // Add your logic to add to favorites
        setModalVisible(false);
        setSelectedMarker(null);
    };
    return (
        <View>
            <ScrollView>
                <View style={styles.searchContainer}>
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
                    <View>
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            zoomControlEnabled={true}
                            zoomEnabled={true}
                        >
                            {events?.map((event: any) => (
                                <Marker
                                    key={event.id}
                                    coordinate={{
                                        latitude: parseFloat(event._embedded.venues[0].location.latitude),
                                        longitude: parseFloat(event._embedded.venues[0].location.longitude),
                                    }}
                                    title={event._embedded.venues[0].name}
                                    description={event._embedded.venues[0].address.line1}
                                    onPress={() => handleMarkerPress(event)}

                                />
                            ))}
                        </MapView>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                {selectedMarker && (
                                    <View style={styles.modalContent}>
                                        <Text>{selectedMarker._embedded.venues[0].name}</Text>
                                        <Text>{selectedMarker._embedded.venues[0].address.line1}</Text>
                                        <TouchableOpacity style={styles.addToFavoritesButton} onPress={handleAddToFavorites}>
                                            <Text style={styles.addToFavoritesButtonText}>Add to Favorites</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                )}
            </ScrollView>
        </View>

    );
};

const windowWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    searchContainer: {
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
    modalContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    addToFavoritesButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    addToFavoritesButtonText: {
        color: 'white',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'black',
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];