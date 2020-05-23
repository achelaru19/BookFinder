import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    heading: {
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    headingText: {
        fontSize: 18,
        fontFamily: "Cardo-Regular",
        justifyContent: 'center',
        textAlign: 'center'
    },
    inputBox: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 30,
        marginHorizontal: 5,
        height: 40,
        paddingHorizontal: 10
    },
    label: {
        fontSize: 20,
        fontFamily: "Cardo-Bold",
        marginLeft: 12,
        marginTop: 5
    },
    buttonBox: {
        backgroundColor: '#90001F',
        marginHorizontal: 10,
        marginTop: 190,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonText: {
        fontFamily: 'Cardo-Regular',
        color: 'white',
        fontSize: 20
    }
  });
  