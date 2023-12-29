import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import searchIcon from '../../../assest/search.png';

const PAGE_SIZE = 5;

export default function ListEvent({ events, searchKeyword, setSearchKeyword, loading }: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const navigation = useNavigation();

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEventPress = (eventDetails) => {
        navigation.navigate('EventDetails', { eventDetails });
    };

    return (
        <View>
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
                <View style={{ marginVertical: 10 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" />
                    ) : (
                        events.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                            .map((event: any) => (
                                <TouchableOpacity key={event.id} style={styles.eventContainer} onPress={() => handleEventPress(event)}>
                                    <Text style={styles.eventTitle}>Event</Text>
                                    <Text style={styles.eventName}>{event.name}</Text>
                                    <Text style={styles.eventName}>{event._embedded?.venues[0]?.location?.latitude},{event._embedded?.venues[0]?.location?.longitude}</Text>
                                    <Text style={styles.eventDetails}>{event._embedded?.venues[0]?.city?.name}, {event._embedded?.venues[0]?.state?.name}, {event._embedded?.venues[0]?.country?.name}</Text>
                                    <Text style={styles.eventDetails}>{event.dates.start.localDate} {event.dates.start.localTime}</Text>
                                </TouchableOpacity>
                            ))
                    )}
                </View>
                <View style={[styles.btnContanir, { marginBottom: 100 }]}>
                    <TouchableOpacity
                        onPress={handlePrevPage}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNextPage}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
const windwoWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({

    searchContanir: {
        marginTop: 20,
        backgroundColor: '#EEEEEE',
        width: windwoWidth * 0.950,
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
        paddingLeft: 10

    },

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
        color: '#4F6F52',
        fontSize: 16,
        fontWeight: 'bold',
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
})