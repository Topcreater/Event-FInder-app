import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Image, TextInput, Platform, TouchableOpacity, Alert, Modal, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import searchIcon from '../../../assest/search.png';
import CustomBox from '../../../components/CustomBox';
import useStore from '../../../zustandStore/addfavorat';
import uuid from 'react-native-uuid'
import { EventDetails } from '../../../types/eventType';
import Geolocation from '@react-native-community/geolocation';

interface MapEventProps {
    events: EventDetails[] | null;
    searchKeyword: string;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

const MapEvent = ({ events, searchKeyword, setSearchKeyword, loading }: MapEventProps) => {
    const [filteredEvents, setFilteredEvents] = useState<EventDetails[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
    const addData = useStore((state: any) => state.addData);
    const [showNearby, setShowNearby] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Permission',
                            message: 'Allow the app to access your location',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getCurrentLocation();
                    } else {
                        Alert.alert('Permission Denied', 'Location permission is required for this feature.');
                    }
                } else {
                    getCurrentLocation();
                }
            } catch (error) {
                console.error('Error requesting location permission:', error);
            }
        };

        requestLocationPermission();
    }, []);

    // Get the user's location
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            },
            error => console.log('Error getting location:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };
    const onAddToFavorites = (cardDatas: EventDetails) => {
        setSelectedEvent(null);
        const id = uuid.v4();
        addData({ cardDatas, id });

    };
    const mapRef = useRef<MapView>(null);
    useEffect(() => {
        if (events && mapRef.current) {
            const eventsToDisplay = showNearby
                ? filterNearbyEvents(events)
                : events;

            const validCoordinates = eventsToDisplay
                .map((event: EventDetails) => ({
                    latitude: parseFloat(event._embedded?.venues?.[0]?.location?.latitude) || 0,
                    longitude: parseFloat(event._embedded?.venues?.[0]?.location?.longitude) || 0,
                }))
                .filter(coord => !isNaN(coord.latitude) && !isNaN(coord.longitude));

            if (validCoordinates.length > 0) {
                const minLatitude = Math.min(...validCoordinates.map(coord => coord.latitude));
                const maxLatitude = Math.max(...validCoordinates.map(coord => coord.latitude));
                const minLongitude = Math.min(...validCoordinates.map(coord => coord.longitude));
                const maxLongitude = Math.max(...validCoordinates.map(coord => coord.longitude));

                mapRef.current.fitToCoordinates(
                    [
                        { latitude: maxLatitude, longitude: minLongitude },
                        { latitude: minLatitude, longitude: maxLongitude },
                    ],
                    {
                        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                        animated: true,
                    }
                );
            }
        }
    }, [events, showNearby]);
    const filterNearbyEvents = (events: EventDetails[]) => {
        if (!userLocation) {
            return events; // Return all events if user location is not available
        }

        const sortedEvents = events
            .map(event => {
                const eventLatitude = parseFloat(event._embedded?.venues?.[0]?.location?.latitude) || 0;
                const eventLongitude = parseFloat(event._embedded?.venues?.[0]?.location?.longitude) || 0;
                const distance = calculateDistance(userLocation.latitude, userLocation.longitude, eventLatitude, eventLongitude);

                return { ...event, distance };
            })
            .sort((a, b) => a.distance - b.distance);

        return sortedEvents;
    };
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    useEffect(() => {
        if (events) {
            const eventsToDisplay = showNearby
                ? filterNearbyEvents(events)
                : events;

            setFilteredEvents(eventsToDisplay);
        }
    }, [events, showNearby, userLocation]);

    useEffect(() => {
        if (events) {
            const filtered = events.filter(event =>
                event._embedded &&
                event._embedded.venues &&
                event._embedded.venues[0]?.name &&
                event._embedded.venues[0]?.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setFilteredEvents(filtered);
        }
    }, [events, searchKeyword]);

    return (
        <View >
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
                <View style={styles.btnContanir}>
                    <TouchableOpacity
                        style={[styles.button, showNearby && styles.selectedButton]}
                        onPress={() => setShowNearby(!showNearby)}
                    >
                        <Text style={styles.buttonText}>Nearby</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        zoomControlEnabled={true}
                        zoomEnabled={true}
                    >
                        {filteredEvents?.map((event: any) => (
                            <Marker
                                key={event.id}
                                coordinate={{
                                    latitude: parseFloat(event._embedded.venues[0].location.latitude),
                                    longitude: parseFloat(event._embedded.venues[0].location.longitude),
                                }}
                                title={event._embedded.venues[0].name}
                                description={event._embedded.venues[0].address.line1}
                                onPress={() => setSelectedEvent(event)}
                            />
                        ))}
                    </MapView>
                    <View>
                        {selectedEvent && (
                            <CustomBox
                                event={selectedEvent}
                                onAddToFavorites={() => onAddToFavorites(selectedEvent)}
                                onClose={() => setSelectedEvent(null)}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>

    );
};

const windowWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 10,
        backgroundColor: '#EEEEEE',
        width: windowWidth * 0.95,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        shadowColor: 'grey',
        zIndex: 1,
        marginBottom: 30

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
    map: {
        height: Dimensions.get('screen').height / 2,
        width: windowWidth,
        marginTop: 20,
    },
    btnContanir: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: -60,
        zIndex: 1
        // width: windowWidth * 0.97,
    },
    button: {
        // backgroundColor: '#08994E',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,

    },
    selectedButton: {
        // backgroundColor: '#08994E',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
});

export default MapEvent;
