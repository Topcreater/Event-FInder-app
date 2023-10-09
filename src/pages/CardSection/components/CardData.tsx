import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import dots from '../../../../assest/favrot.png'
export default function VideoDownloaded({ item, index, showDropDownMenu, clickedItemIndex, handleRemoveData }: any) {
    console.log(item);


    return (
        <View style={styles.previewContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={{}}
                    style={styles.previewImage}
                />
            </View>
            <View style={styles.titleContanir}>
                <View style={styles.cheenalContanir}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={{}}
                            style={styles.cheenalImage}
                        />
                        <Text>{ }</Text>
                    </View>
                    <TouchableOpacity onPress={() => showDropDownMenu(index)}>
                        <Image source={dots} style={styles.actionImage} />
                    </TouchableOpacity>
                    {clickedItemIndex === index && (
                        <View style={styles.actionLiContanir}>
                            <TouchableOpacity onPress={() => handleRemoveData(item)}>
                                <Text style={styles.actionText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Text numberOfLines={1} style={styles.titleText}>{ }</Text>
                <Text style={styles.sizeText}>4.32MB</Text>
            </View>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    previewContainer: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#EDFCFE',
        borderRadius: 10,
        width: windowWidth * 0.9,
        marginHorizontal: 20,

        padding: 15
    },
    imageContainer: {
        justifyContent: 'center',

    },
    previewImage: {
        width: 144,
        height: 96,
        borderRadius: 10,
        alignItems: 'center',

    },
    titleContanir: {
        justifyContent: 'center',
        marginLeft: 6,
    },
    cheenalContanir: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
        marginBottom: 10
    },
    cheenalImage: {
        width: 22,
        height: 22,
        borderRadius: 30,
        marginRight: 7,

    },
    actionImage: {
        marginLeft: 15,
        height: 15,
        width: 5
    },
    actionLiContanir: {
        position: 'absolute',
        top: 15,
        right: 0,
        borderRadius: 5,
        backgroundColor: '#E3E3E3',
    },
    actionText: {
        borderRadius: 2,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    titleText: {
        zIndex: -1,
        width: 140,

    },
    sizeText: {
        color: '#9D9D9D',
        fontSize: 8,
        fontFamily: 'Lato',
        fontWeight: '700',
        letterSpacing: 0.7,
        marginTop: 10,
        marginBottom: 5
    },
})