import { Text, View, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import favrot from '../../../assest/favrot.png'
import favrotColor from '../../../assest/clickFavrot.png'
import { useNavigation } from '@react-navigation/native'

const Cards = ({ title, data }: any) => {
    const navigation = useNavigation<any>();
    const handleCardClick = (item: any) => {
        navigation.navigate('CardDetails', { cardData: item });
    };


    return (
        <View>
            <Text style={styles.catogoryTitle}>{title}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data?.map((item: any, index: any) =>
                    <View key={index} style={styles.mainContanir}>
                        <View style={styles.contanir}>
                            <TouchableWithoutFeedback onPress={() => handleCardClick(item)}>
                                <View style={styles.imageCont}>
                                    <Image source={item.img[0]} style={styles.youTubeIcon} />
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={styles.subTitle}>Rs {item.price}</Text>
                            <Text style={styles.subTitle}>{item.title}</Text>
                            <Text style={styles.subTitle}>{item.location}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>

    )
}
export default Cards;