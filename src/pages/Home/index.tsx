import { Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import searchIcon from '../../../assest/search.png'
import Cards from './Card'
import { data } from './Data'
const Home = () => {
    const navigation = useNavigation();
    const carsData = data.filter(item => item.category === 'Cars');
    const laptopData = data.filter(item => item.category === 'Laptop');
    const phoneData = data.filter(item => item.category === 'Phone');
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.searchContanir}>
                <Image source={searchIcon} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={'black'}
                    style={styles.searchBar}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Browse categories</Text>
                <Cards title='Mobiles' data={carsData} />
                <Cards title='Cars' data={laptopData} />
                <Cards title='MoterCycle' data={phoneData} />
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home;