import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Dimensions, Image, TextInput, Platform, TouchableOpacity, Alert, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import searchIcon from '../../../assest/search.png';
import CustomBox from '../../../components/CustomBox';
import useStore from '../../../zustandStore/addfavorat';
import uuid from 'react-native-uuid'
import { EventDetails } from '../../../types/eventType';



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


    const onAddToFavorites = (cardDatas: EventDetails) => {
        setSelectedEvent(null);
        const id = uuid.v4();
        addData({ cardDatas, id });

    };
    const mapRef = useRef<MapView>(null);
    useEffect(() => {
        if (events && mapRef.current) {
            const validCoordinates = events
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
    }, [events]);

    useEffect(() => {
        if (events) {
            const filtered = events.filter(event =>
                event._embedded && // Check if _embedded property exists
                event._embedded.venues &&
                event._embedded.venues[0]?.name && // Check if name property exists
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
        zIndex: 1

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
