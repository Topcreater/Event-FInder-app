import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import useStore from '../../zustandStore/addfavorat'
import CardDetails from '../CardDetails'
const CardSection = () => {
    const navigation = useNavigation<any>()
    const data = useStore((state: any) => state.data);
    const removeData = useStore((state: any) => state.removeData);
    const [clickedItemIndex, setClickedItemIndex] = useState(null);

    const showDropDownMenu = (index: any) => {
        setClickedItemIndex(index === clickedItemIndex ? null : index);
    };

    console.log(data)
    const handleRemoveData = (item: any) => {
        removeData(item);
    };
    const renderItem = ({ item, index }: any) => (
        <CardDetails item={item} index={index} showDropDownMenu={showDropDownMenu} clickedItemIndex={clickedItemIndex} data={data} setClickedItemIndex={setClickedItemIndex} handleRemoveData={handleRemoveData} />
    );
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={data} style={{ marginTop: 150 }}
                ListEmptyComponent={
                    <Text >Nothing is downloaded.....</Text>
                }
                renderItem={renderItem}
            />
        </View>
    )
}
export default CardSection;