import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    containerNoBookFound: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
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
    buttonLabel: {
      fontFamily: 'Cardo-Regular',
      fontSize: 20,
      color: 'white',
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
  });
  