import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import useStore from '../../zustandStore/addfavorat'
const CardSection = () => {
    const navigation = useNavigation<any>()
    const data = useStore((state: any) => state.data);
    const removeData = useStore((state: any) => state.removeData);
    const handleRemoveData = (itemId: string) => {
        removeData(itemId);
    };
    console.log(data?.id);
    const validData = data.filter(item => item && item.cardDatas);
    // console.log(validData, 'validData');

    const goToEventDetails = (itemData: any) => {
        // Navigate to EventDetails and pass the item data as params
        navigation.navigate('EventDetails', { eventDetails: itemData.cardDatas });
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {validData.length > 0 ? (
                validData?.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => goToEventDetails(item)}>

                            <View style={styles.contanir}>
                                <View style={styles.imageCont}>
                                    <Image source={{ uri: item.cardDatas.images[0].url }} style={styles.youTubeIcon} />
                                </View>
                                <View>
                                    <Text style={styles.title}>Event</Text>
                                    <Text style={styles.subTitle}>{item.cardDatas.name}</Text>
                                    <Text style={styles.subTitle}>{item.cardDatas.dates.start.localDate}</Text>
                                </View>
                                <View style={styles.removeData}>
                                    <TouchableOpacity onPress={() => handleRemoveData(item.id)}>
                                        <Text style={styles.catogoryTitle}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                ))
            ) : (
                <Text>Nothing is downloaded.....</Text>
            )}
        </View>
    )
}
export default CardSection;