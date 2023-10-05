import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
const CardDetails = () => {
    const navigation = useNavigation<any>()
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View>
                    <Text style={styles.textColor}>CardDetails</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default CardDetails;