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

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {validData.length > 0 ? (
                validData?.map((item, index) => (
                    <View key={index}>
                        <View style={styles.contanir}>
                            <View style={styles.imageCont}>
                                <Image source={item.cardDatas.img[0]} style={styles.youTubeIcon} />
                            </View>
                            <View>
                                <Text style={styles.subTitle}>{item.cardDatas.title}</Text>
                                <Text style={styles.subTitle}>Rs {item.cardDatas.price}</Text>
                                <Text style={styles.subTitle}>{item.cardDatas.location}</Text>
                            </View>
                            <View style={styles.removeData}>
                                <TouchableOpacity onPress={() => handleRemoveData(item.id)}>
                                    <Text style={styles.catogoryTitle}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <Text>Nothing is downloaded.....</Text>
            )}
        </View>
    )
}
export default CardSection;