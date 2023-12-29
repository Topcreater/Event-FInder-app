import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, Modal } from 'react-native';
// import { styles } from './style';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../zustandStore/addfavorat';
import back from '../../assest/back.png'
import uuid from 'react-native-uuid'
import MapView, { Marker } from 'react-native-maps';

const EventDetails = () => {

    const addData = useStore((state: any) => state.addData);
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const cardDatas = route.params?.eventDetails;
    console.log(cardDatas, "cardDatas");


    const handelAddData = () => {
        const id = uuid.v4()
        addData({ cardDatas, id })
    }


    return (
        <View style={styles.container}>
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
                    <Text style={styles.date}>{cardDatas.dates.start.localDate}</Text>

                    <Text style={styles.info}>{cardDatas.info}</Text>

                    <TouchableOpacity onPress={handelAddData} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add to Favorites</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
};

export default EventDetails;
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 16,
    },
    eventName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        marginBottom: 16,
        color: '#555',
    },
    info: {
        fontSize: 18,
        marginBottom: 16,
        lineHeight: 24,
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
