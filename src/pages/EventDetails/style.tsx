import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width
export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 20,
    },
    detailsContainer: {
        padding: 16,
    },
    eventName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    heading: {
        fontSize: 16,
        // marginBottom: 16,
        color: '#333',
    },
    date: {
        fontSize: 12,
        marginBottom: 16,
        color: '#555',

    },
    info: {
        fontSize: 12,
        marginBottom: 16,
        // lineHeight: 24,
        color: '#555'
    },
    btnContanir: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    addButton: {
        backgroundColor: '#08994E',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 10
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
    },
})