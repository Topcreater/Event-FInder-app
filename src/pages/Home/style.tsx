import { StyleSheet, Dimensions } from "react-native";
const windwoWidth = Dimensions.get('screen').width
export const styles = StyleSheet.create({

    searchContanir: {
        marginTop: 20,
        backgroundColor: '#EEEEEE',
        width: windwoWidth * 0.950,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingLeft: 10,
        shadowColor: 'grey',

    },
    searchIcon: {
        width: 25,
        height: 25,

    },
    searchBar: {
        color: 'black',
        paddingLeft: 10

    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#232D3F',
        fontSize: 20,

    },
    mainContanir: {
        marginVertical: 15,
        marginHorizontal: 5,
        flexDirection: "row",

    },
    contanir: {
        backgroundColor: '#EDFCFE',
        borderRadius: 10,
        paddingBottom: 5

    },
    imageCont: {
        backgroundColor: '#EEEEEE',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    youTubeIcon: {
        width: windwoWidth / 2.1,
        height: 100,
        resizeMode: 'contain',
        alignItems: 'center'
    },
    subTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Raleway',
        color: '#232D3F',
        paddingTop: 10,
        paddingLeft: 10
    },
    catogoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Raleway',
        marginTop: 20,
        marginLeft: 20,
        color: '#232D3F'
    }
})