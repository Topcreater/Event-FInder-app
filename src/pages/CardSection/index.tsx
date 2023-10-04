import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
const CardSection = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View>
                    <Text style={styles.textColor}>Card</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default CardSection;