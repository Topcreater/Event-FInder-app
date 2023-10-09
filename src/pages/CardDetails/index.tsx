import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, Modal } from 'react-native';
import { styles } from './style';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../zustandStore/addfavorat';
import back from '../../../assest/back.png'
const CardDetails = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fullscreenModalVisible, setFullscreenModalVisible] = useState(false);
    const addData = useStore((state: any) => state.addData);
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const cardDatas = route.params?.cardData;
    const images = cardDatas?.img;
    console.log(cardDatas?.title);
    // console.log(cardDatas?.img);
    {
        images.map((image: any, index: any) => (
            <Image key={index} source={image} style={styles.fullscreenImage} />
        ))
    }
    console.log(image);

    const handelAddData = () => {
        addData(cardDatas)
    }
    const openFullscreen = (index: any) => {
        setCurrentIndex(index);
        setFullscreenModalVisible(true);
    };

    return (
        <View></View>
        // <View style={{ backgroundColor: '#EEEEEE', flex: 1 }}>
        //     <ScrollView>
        //         <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginHorizontal: 20, }}>
        //             <TouchableOpacity onPress={() => navigation.goBack()}>
        //                 <Image source={back} style={{ height: 25, width: 25, }} />
        //             </TouchableOpacity>
        //             <Text style={styles.pageText}>{currentIndex + 1} / {images.length}</Text>
        //         </View>
        //         <View>
        //             <ScrollView
        //                 horizontal
        //                 pagingEnabled
        //                 showsHorizontalScrollIndicator={false}
        //                 contentContainerStyle={styles.imageContainer}
        //                 onMomentumScrollEnd={(event) => {
        //                     const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        //                     setCurrentIndex(page);
        //                 }}>
        //                 {images?.map((image: any, index: any) => (
        //                     <TouchableOpacity key={index} onPress={() => openFullscreen(index)}>
        //                         <Image source={image} style={styles.image} />
        //                     </TouchableOpacity>
        //                 ))}
        //             </ScrollView>
        //         </View>
        //         <View style={styles.detailCon}>
        //             <View style={styles.TitleCon}>
        //                 <Text style={styles.title}>{cardDatas.title}</Text>
        //                 <Text style={styles.title}>Price:{cardDatas.price}/PKR</Text>
        //             </View>
        //             <Text style={styles.title}>Location:</Text>
        //             <Text style={styles.subTitle}>{cardDatas.location}</Text>
        //             <Text style={styles.title}>Description:</Text>
        //             <Text style={styles.subTitle}>{cardDatas.description}</Text>
        //             <Text style={styles.title}>Delivery Time:</Text>
        //             <Text style={styles.subTitle}>Next 7 TO 10 working days</Text>
        //             <Text style={styles.title}>Services:</Text>
        //             <Text style={styles.subTitle}>*7 Day Returns *warenty are avalible</Text>

        //         </View>
        //         <View style={styles.ButtonContanior}>
        //             <TouchableOpacity style={styles.buyNowBut} >
        //                 <Text style={styles.buttonText}>Buy Now</Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity style={styles.downloadingButton} onPress={handelAddData} >
        //                 <Text style={styles.buttonText}> Add TO Cart</Text>
        //             </TouchableOpacity>
        //         </View>
        //         {/* Fullscreen Modal */}
        //         <Modal
        //             animationType="slide"
        //             transparent={true}
        //             visible={fullscreenModalVisible}
        //             onRequestClose={() => {
        //                 setFullscreenModalVisible(false);
        //             }}>
        //             <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
        //                 <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginHorizontal: 20, }}>
        //                     <TouchableOpacity onPress={() => setFullscreenModalVisible(false)}>
        //                         <Image source={back} style={{ height: 25, width: 25, }} />
        //                     </TouchableOpacity>
        //                     <Text style={styles.pageText}>{currentIndex + 1} / {images.length}</Text>
        //                 </View>
        //                 <ScrollView
        //                     horizontal
        //                     pagingEnabled
        //                     showsHorizontalScrollIndicator={false}
        //                     onMomentumScrollEnd={(event) => {
        //                         const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        //                         setCurrentIndex(page);
        //                     }}
        //                 >
        //                     {images.map((image: any, index: any) => (
        //                         <Image key={index} source={image} style={styles.fullscreenImage} />
        //                     ))}
        //                 </ScrollView>
        //             </View>
        //         </Modal>
        //     </ScrollView>
        // </View>
    );
};

export default CardDetails;
