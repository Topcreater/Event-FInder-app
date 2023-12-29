import { StyleSheet, Dimensions } from "react-native";
const windwoWidth = Dimensions.get('screen').width

export const styles = StyleSheet.create({

    contanir: {
        backgroundColor: '#EDFCFE',
        borderRadius: 10,
        flexDirection: "row",
        marginTop: 20,
        marginHorizontal: 10,
        justifyContent: "space-between"
    },
    imageCont: {
        backgroundColor: '#EDFCFE',
        borderTopStartRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    removeData: {
        flexDirection: "row",
        justifyContent: 'space-between',


    },
    youTubeIcon: {
        width: windwoWidth / 2.5,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 10,

    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        color: '#4F6F52',
        paddingTop: 10,
        // paddingLeft: 10

    },
    subTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        color: '#232D3F',
        paddingTop: 10,
        // paddingLeft: 10
        width: 100,
    },
    catogoryTitle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Raleway',
        marginTop: 10,
        marginRight: 10,
        color: '#232D3F',
        textAlign: 'right'

    }
})