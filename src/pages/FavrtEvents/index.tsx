import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import useStore from '../../zustandStore/addfavorat'
import backgroundImage from '../../assest/background.png';
import Header from '../../components/Header'
import Location from '../../assest/location.png';
import { EventDetails } from '../../types/eventType'



interface FavrtData {
    cardDatas: EventDetails;
    id: string;
}

const FavrtEvents = () => {
    const navigation = useNavigation<any>()
    const data = useStore((state: any) => state.data);
    const removeData = useStore((state: any) => state.removeData);

    const handleRemoveData = (itemId: string) => {
        removeData(itemId);
    };
    console.log(data?.id);
    const validData = data.filter((item: FavrtData) => item && item.cardDatas);
    console.log(validData, 'validData');

    const goToEventDetails = (itemData: FavrtData) => {
        navigation.navigate('EventDetails', { eventDetails: itemData.cardDatas });
    };

    return (
        <View style={{ flex: 1, }}>
            <ImageBackground source={backgroundImage} style={{
                flex: 1
            }}>
                <Header title='Favourites Events' />
                {validData.length > 0 ? (
                    validData?.map((event: FavrtData) => (
                        <View key={event.id}>
                            <TouchableOpacity style={styles.eventContainer} onPress={() => goToEventDetails(event)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={styles.eventTitle}>Event</Text>
                                    <TouchableOpacity onPress={() => handleRemoveData(event.id)} style={styles.addButton}>
                                        <Text style={styles.catogoryTitle}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.eventName}>{event.cardDatas.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={Location} style={{ height: 15, width: 15, marginRight: 5 }} />
                                    <Text style={styles.eventDetails}>{event.cardDatas._embedded?.venues[0].address.line1}</Text>

                                </View>
                                <Text style={styles.eventDetails}>{event.cardDatas._embedded?.venues[0]?.city?.name}, {event.cardDatas._embedded?.venues[0]?.state?.name}, {event.cardDatas._embedded?.venues[0]?.country?.name}</Text>
                                <Text style={styles.eventDetails}>Start Time: {event.cardDatas?.dates?.start?.localDate} {event.cardDatas.dates?.start?.localTime}</Text>
                            </TouchableOpacity>

                        </View>
                    ))
                ) : (
                    <Text style={styles.noEventsText}>No events availabls.....</Text>
                )}
            </ImageBackground>
        </View>
    )
}
export default FavrtEvents;