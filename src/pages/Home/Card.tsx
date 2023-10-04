import { Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './style'
import favrot from '../../../assest/favrot.png'
import { data } from './Data'
const Cards = ({ title }: any) => {
    return (
        <View>
            <Text style={styles.catogoryTitle}>{title}</Text>
            <ScrollView horizontal={true}>
                {data.map((item, index) =>
                    <View key={index} style={styles.mainContanir}>
                        <View style={styles.contanir}>
                            <View style={styles.imageCont}>
                                <Image source={item.img} style={styles.youTubeIcon} />
                            </View>
                            <View style={styles.priceCont}>
                                <Text style={styles.titles}>Rs {item.price}</Text>
                                <Image source={favrot} style={styles.searchIcon} />
                            </View>
                            <Text style={styles.subTitle}>{item.title}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>

    )
}
export default Cards;