import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width
export const styles = StyleSheet.create({

    imageContainer: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        height: 200,

    },
    image: {
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        alignItems: 'center',
        height: 200,

    },
    pageText: {
        color: 'white',
        fontSize: 18,
        textAlign: "center",
        backgroundColor: 'grey',
    },
    fullscreenImage: {
        height: 600,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        alignItems: 'center',
    }
})