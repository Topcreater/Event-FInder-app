import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import searchIcon from '../../assest/search.png';
import { styles } from './style';
import fetchEvents from '../../utils/EventData';
import ListEvent from './components/ListEvent';
import MapEvent from './components/MapEvent';


const Home = () => {
    const [showData1, setShowData1] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchEvents = async () => {
            try {
                setLoading(true);
                const result = await fetchEvents(searchKeyword);

                // Filter out events without a location
                const eventsWithLocation = result.filter(event => event._embedded?.venues[0]?.location);

                setEvents(eventsWithLocation);
            } catch (error) {
                console.log(error, 'error');
            } finally {
                setLoading(false);
            }
        };

        searchEvents();
    }, [searchKeyword]);

    const toggleFirstContent = () => {
        setShowData1(true);
    };

    const toggleSecondContent = () => {
        setShowData1(false);
    };


    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.btnContanir}>
                <TouchableOpacity
                    onPress={toggleFirstContent}
                    style={[
                        styles.button,
                        showData1 ? styles.selectedButton : null,
                    ]}
                >
                    <Text style={styles.buttonText}>List</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleSecondContent}
                    style={[
                        styles.button,
                        !showData1 ? styles.selectedButton : null,
                    ]}
                >
                    <Text style={styles.buttonText}>Map</Text>
                </TouchableOpacity>
            </View>
            {showData1 ? (
                <View>
                    <ListEvent events={events} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} loading={loading} />
                </View>
            ) : (
                <View>
                    <MapEvent events={events} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} loading={loading} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default Home;
