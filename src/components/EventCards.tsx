import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { EventDetails } from '../types/eventType'
import Location from '../assest/location.png'

interface EventCardsProps {
    events: EventDetails[];
    handleEventPress: (event: EventDetails) => void;
    currentPage: number;
    PAGE_SIZE: number;
}

export default function EventCards({ events, handleEventPress, currentPage, PAGE_SIZE }: EventCardsProps) {
    return (
        <View style={{ marginVertical: 10 }}>
            {events?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                ?.map((event: EventDetails) => (
                    <TouchableOpacity key={event.id} style={styles.eventContainer} onPress={() => handleEventPress(event)}>
                        <Text style={styles.eventTitle}>Event</Text>
                        <Text style={styles.eventName}>{event.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={Location} style={{ height: 15, width: 15, marginRight: 5 }} />
                            <Text style={styles.eventDetails}>{event._embedded.venues[0].address.line1}</Text>

                        </View>
                        <Text style={styles.eventDetails}>{event._embedded?.venues[0]?.city?.name}, {event._embedded?.venues[0]?.state?.name}, {event._embedded?.venues[0]?.country?.name}</Text>
                        <Text style={styles.eventDetails}>Start Time: {event.dates.start.localDate} {event.dates.start.localTime}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    )
}
const windwoWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({

    btnContanir: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10
    },
    selectedButton: {
        backgroundColor: 'black'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
    },
    eventContainer: {
        backgroundColor: '#EFEFEF',
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10
    },
    eventTitle: {
        color: '#00A550',
        fontSize: 16,
        fontWeight: 'bold',
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    eventName: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },

    eventDetails: {
        color: '#666', // Medium gray text color
        fontSize: 14,
    },
    noEventsText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        marginTop: 20,
    },
})