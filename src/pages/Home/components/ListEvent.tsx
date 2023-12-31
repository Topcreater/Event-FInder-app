import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import searchIcon from '../../../assest/search.png';
import Location from '../../../assest/location.png';
import { EventDetails } from '../../../types/eventType';
import EventCards from '../../../components/EventCards';



interface ListEventProps {
    events: EventDetails[] | null;
    searchKeyword: string;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

const PAGE_SIZE = 5;

const ListEvent: React.FC<ListEventProps> = ({ events, searchKeyword, setSearchKeyword, loading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigation = useNavigation<any>();

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage === 1) {
            ToastAndroid.showWithGravityAndOffset(
                'No Previous Event Found',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else
            setCurrentPage(currentPage - 1);
    };

    const handleEventPress = (eventDetails: EventDetails) => {
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
                <Text style={styles.heading}>Events</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#00A550" />
                ) : (
                    events && events?.length > 0 ? (
                        <EventCards events={events} handleEventPress={handleEventPress} currentPage={currentPage} PAGE_SIZE={PAGE_SIZE} />
                    ) : (
                        <Text style={styles.noEventsText}>No events available</Text>
                    )
                )}
                <View style={[styles.btnContanir, { marginBottom: 100 }]}>
                    {currentPage > 1 && <TouchableOpacity
                        onPress={handlePrevPage}
                        style={[styles.button, currentPage === 1 ? styles.disabledButton : null]}

                    >
                        <Text style={styles.buttonText}>Load Less</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity
                        onPress={handleNextPage}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Load More</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}
export default ListEvent;
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
        paddingLeft: 10,
        width: windwoWidth * 0.850,
    },

    btnContanir: {
        flexDirection: "row",
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
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
    disabledButton: {
        backgroundColor: '#999', // Set a color for disabled state
    },
})