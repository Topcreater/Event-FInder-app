import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, Modal } from 'react-native';
import { styles } from './style';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const CardDetails = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fullscreenModalVisible, setFullscreenModalVisible] = useState(false);
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const cardDatas = route.params?.cardData;
    const images = cardDatas?.img;

    const openFullscreen = (index) => {
        setCurrentIndex(index);
        setFullscreenModalVisible(true);
    };

    return (
        <View style={{ backgroundColor: 'black' }}>
            <Text style={styles.pageText}>{currentIndex + 1} / {images.length}</Text>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imageContainer}
                onMomentumScrollEnd={(event) => {
                    const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
                    setCurrentIndex(page);
                }}>
                {images.map((image: any, index: any) => (
                    <TouchableOpacity key={index} onPress={() => openFullscreen(index)}>
                        <Image source={image} style={styles.image} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text>{cardDatas.title}</Text>

            {/* Fullscreen Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={fullscreenModalVisible}
                onRequestClose={() => {
                    setFullscreenModalVisible(false);
                }}>
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>{currentIndex + 1} / {images.length}</Text>
                    <TouchableOpacity onPress={() => setFullscreenModalVisible(false)}>
                        <Text style={{ color: 'white', paddingLeft: 20 }}>Close</Text>
                    </TouchableOpacity>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(event) => {
                            const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
                            setCurrentIndex(page);
                        }}
                    >
                        {images.map((image: any, index: any) => (
                            <Image key={index} source={image} style={styles.fullscreenImage} />
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default CardDetails;
