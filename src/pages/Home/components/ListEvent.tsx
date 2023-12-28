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
    const formattedEvents = events.map((event: any) => ({
        name: event.name,
        country: event._embedded?.venues[0].country.name,
        state: event._embedded?.venues[0].state.name,
        location: event._embedded?.venues[0].city.name,
        address: event._embedded?.venues[0].address.line1,
        date: event.dates.start.localDate,
        time: event.dates.start.localTime,
    }));
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
                        formattedEvents
                            .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                            .map((formattedEvent: any) => (
                                <View key={formattedEvent.name} style={styles.eventContainer}>
                                    <Text style={styles.eventName}>{formattedEvent.name}</Text>
                                    <Text style={styles.eventDetails}>{formattedEvent.location}, {formattedEvent.state}, {formattedEvent.country}</Text>
                                    <Text style={styles.eventDetails}>{formattedEvent.date} {formattedEvent.time}</Text>
                                </View>
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