import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import useStore from '../../zustandStore/addfavorat'
const CardSection = () => {
    const navigation = useNavigation<any>()
    const data = useStore((state: any) => state.data);
    const removeData = useStore((state: any) => state.removeData);
    console.log(data)
    const handleRemoveData = (item: any) => {
        removeData(item);

    };
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