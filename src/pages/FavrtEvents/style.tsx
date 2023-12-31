import { StyleSheet, Dimensions } from "react-native";
const windwoWidth = Dimensions.get('screen').width

export const styles = StyleSheet.create({

    contanir: {
        backgroundColor: 'white',
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
        fontSize: 16,
        color: 'red',
        textAlign: 'right'

    },
    noEventsText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        marginTop: 200,
    },
    eventContainer: {
        backgroundColor: 'white',
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10
    },
    eventTitle: {
        color: '#00A550',
        fontSize: 16,
        fontWeight: 'bold',
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    eventName: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },

    eventDetails: {
        color: '#666', // Medium gray text color
        fontSize: 14,
    },
    addButton: {
        // backgroundColor: '#08994E',
        // padding: 5,
        borderRadius: 8,
        alignItems: 'center',
        // marginLeft: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        color: 'black'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalButton: {
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'grey',
    },
    confirmButton: {
        backgroundColor: 'red',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})