import { Text, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from './style'
import favrot from '../../../assest/favrot.png'
import { useNavigation } from '@react-navigation/native'
import { data } from './Data'
const Cards = ({ title }: any) => {
    const navigation = useNavigation<any>();
    const handleCardClick = (item: any) => {
        navigation.navigate('CardDetails', { cardData: item });
    };
    return (
        <View>
            <Text style={styles.catogoryTitle}>{title}</Text>
            <ScrollView horizontal={true}>
                {data.map((item, index) =>
                    <View key={index} style={styles.mainContanir}>
                        <TouchableWithoutFeedback onPress={() => handleCardClick(item)}>
                            <View style={styles.contanir}>
                                <View style={styles.imageCont}>
                                    <Image source={item.img[0]} style={styles.youTubeIcon} />
                                </View>
                                <View style={styles.priceCont}>
                                    <Text style={styles.titles}>Rs {item.price}</Text>
                                    <Image source={favrot} style={styles.searchIcon} />
                                </View>
                                <Text style={styles.subTitle}>{item.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
            </ScrollView>
        </View>

    )
}
export default Cards;