import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, Modal, Linking, ImageBackground, ToastAndroid } from 'react-native';
// import { styles } from './style';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../zustandStore/addfavorat';
import back from '../../assest/clickFavrot.png'
import uuid from 'react-native-uuid'
import MapView, { Marker } from 'react-native-maps';
import backgroundImage from '../../assest/background.png';

const EventDetails = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const addData = useStore((state: any) => state.addData);
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const cardDatas = route.params?.eventDetails;
    console.log(cardDatas, "cardDatas");


    const handelAddData = () => {
        if (isButtonDisabled) {
            ToastAndroid.showWithGravityAndOffset(
                'Event Already Favorites',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            setIsButtonDisabled(true);
            const id = uuid.v4();
            addData({ cardDatas, id });
        }
    };
    const openTicketmasterWebsite = () => {
        const ticketmasterUrl = cardDatas.url;
        if (ticketmasterUrl) {
            Linking.openURL(ticketmasterUrl);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={{
                flex: 1
            }}>
                <ScrollView >
                    <MapView
                        style={styles.image}
                        initialRegion={{
                            latitude: parseFloat(cardDatas._embedded.venues[0].location.latitude),
                            longitude: parseFloat(cardDatas._embedded.venues[0].location.longitude),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: parseFloat(cardDatas._embedded.venues[0].location.latitude),
                                longitude: parseFloat(cardDatas._embedded.venues[0].location.longitude),
                            }}
                            title={cardDatas._embedded.venues[0].name}
                            description={cardDatas._embedded.venues[0].address.line1}
                        />
                    </MapView>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.eventName}>{cardDatas.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.heading}>Date</Text>
                                <Text style={styles.date}>{cardDatas.dates.start.localDate}</Text>
                            </View>
                            <View>
                                <Text style={styles.heading}>Start Time</Text>
                                <Text style={styles.date}>{cardDatas.dates.start.localTime}</Text>
                            </View>
                        </View>
                        <Text style={styles.heading}>Venue</Text>
                        <Text style={styles.date}>{cardDatas._embedded.venues[0].name}</Text>
                        <Text style={styles.heading}>Address</Text>
                        <Text style={styles.date}>{cardDatas._embedded.venues[0].address.line1}</Text>
                        <Text style={styles.heading}>State</Text>
                        <Text style={styles.date}>{cardDatas._embedded?.venues[0]?.city?.name}, {cardDatas._embedded?.venues[0]?.state?.name}, {cardDatas._embedded?.venues[0]?.country?.name}</Text>
                        {cardDatas.info &&
                            <View>
                                <Text style={styles.heading}>About Events</Text>
                                <Text style={styles.info}>{cardDatas.info}</Text>
                            </View>
                        }
                        <View style={styles.btnContanir}>
                            <TouchableOpacity onPress={openTicketmasterWebsite} style={styles.addButton} >
                                <Text style={styles.addButtonText}>Buy Tickets </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handelAddData}
                                style={[styles.addButton, { backgroundColor: isButtonDisabled ? '#044222' : '#08994E' }]}
                            >
                                <Text style={styles.addButtonText}>Add to Favorites</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>

    );
};

export default EventDetails;
import { StyleSheet } from 'react-native';
import Header from '../../components/Header';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 20,
    },
    detailsContainer: {
        padding: 16,
    },
    eventName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    heading: {
        fontSize: 16,
        // marginBottom: 16,
        color: '#333',
    },
    date: {
        fontSize: 12,
        marginBottom: 16,
        color: '#555',

    },
    info: {
        fontSize: 12,
        marginBottom: 16,
        // lineHeight: 24,
        color: '#555'
    },
    btnContanir: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    addButton: {
        backgroundColor: '#08994E',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 10
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});
