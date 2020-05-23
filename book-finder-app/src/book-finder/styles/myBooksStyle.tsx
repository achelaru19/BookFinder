import { StyleSheet } from 'react-native';

export 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageHolder: {
      width: 200,
      height: 150
    },
    textHolder: {
      fontSize: 20,
      fontFamily: 'Cardo-Regular',
      marginTop: 17
    },
    addButton: {
        backgroundColor: '#90001F',
        height: 50,
        width: 180,
        alignContent: 'space-around',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        marginTop: 17
      },
      buttonLabel: {
        fontFamily: 'Cardo-Regular',
        fontSize: 20,
        color: 'white',
      },
    bookContainer: {
        flex: 3,
        height: 100,
        flexDirection: "column",
        alignContent: 'space-around',
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },
    label: {
        flex: 1,
        fontFamily: "Cardo-Regular",
        fontSize: 18,
        paddingLeft: 9
    },
    deleteButton: {
        height: 100,
        width: 70,
        backgroundColor: '#CC0000',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
});