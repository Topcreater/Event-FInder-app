import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width
export const styles = StyleSheet.create({

    imageContainer: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        height: 220,

    },
    image: {
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        alignItems: 'center',
        height: 200,

    },
    pageText: {
        color: '#232D3F',
        fontSize: 18,
        backgroundColor: '#EEEEEE',
    },
    fullscreenImage: {
        height: 600,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    detailCon: {
        backgroundColor: '#EDFCFE',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
    },

    TitleCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        color: '#232D3F',
        paddingTop: 10,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Raleway',
        color: '#232D3F',
        paddingTop: 10,

    },
    downloadingButton: {
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 29,
        paddingVertical: 16,
        backgroundColor: '#EBE76C'
    },
    buyNowBut: {
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 29,
        paddingVertical: 16,
        backgroundColor: '#D07000'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Lato'

    },

    ButtonContanior: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 38,
        marginBottom: 20,
    },
})