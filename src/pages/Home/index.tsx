import { Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import searchIcon from '../../../assest/search.png'
import Cards from './Card'
const Home = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <View style={styles.searchContanir}>
                <Image source={searchIcon} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={'black'}
                    style={styles.searchBar}
                />
            </View>
            <ScrollView>
                <Text style={styles.title}>Browse categories</Text>
                <Cards title='Mobiles' />
                <Cards title='Cars' />
                <Cards title='MoterCycle' />
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home;