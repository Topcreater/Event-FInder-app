import { Text, View, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import favrot from '../../../assest/favrot.png'
import favrotColor from '../../../assest/clickFavrot.png'
import { useNavigation } from '@react-navigation/native'
import { data } from './Data'
import useStore from '../../zustandStore/addfavorat'
import uuid from 'react-native-uuid';
const Cards = ({ title, data }: any) => {
    const [isColor, setIsColor] = useState(false)
    const store = useStore();
    const navigation = useNavigation<any>();
    const handleCardClick = (item: any) => {
        navigation.navigate('CardDetails', { cardData: item });
    };
    const isFavorite = (item) => store.data.some((favItem) => favItem.id === item.id);

    const handleAddData = (item: any) => {
        if (isFavorite(item)) {
            store.removeData(item);
        } else {
            const id = uuid.v4(); // Generate a new ID
            setIsColor(item);
            store.addData({ ...item, id }); // Pass the item along with its ID
        }
    };
    return (
        <View>
            <Text style={styles.catogoryTitle}>{title}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data?.map((item, index) =>
                    <View key={index} style={styles.mainContanir}>
                        <View style={styles.contanir}>
                            <TouchableWithoutFeedback onPress={() => handleCardClick(item)}>
                                <View style={styles.imageCont}>
                                    <Image source={item.img[0]} style={styles.youTubeIcon} />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.priceCont}>
                                <Text style={styles.titles}>Rs {item.price}</Text>
                                <TouchableOpacity onPress={() => handleAddData(item)}>
                                    <Image source={isColor ? favrotColor : favrot} style={styles.searchIcon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.subTitle}>{item.title}</Text>
                            <Text style={styles.Location}>{item.location}</Text>

                        </View>
                    </View>
                )}
            </ScrollView>
        </View>

    )
}
export default Cards;