import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'stretch',
      justifyContent: 'space-around',
      flexDirection: 'column',
      borderBottomWidth: 0.5,
      borderColor: 'black',
      paddingLeft: 10,
      fontFamily: ''
    },
    label: {
      color: '#a9a9a9',
      fontFamily: 'Cardo-Regular',
      fontSize: 15
      
    },
    information: {
      fontSize: 18,
      fontFamily: 'Cardo-Bold'
    },
    buttonBox: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: '#90001F',
      color: 'white',
      marginHorizontal: 10,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },
    pickerInput: {
      height: 40,
      marginRight: 10,
          borderColor: '#111111',
          borderWidth: 1,
      paddingHorizontal: 0,
      fontSize: 16,
      borderRadius: 10,
      fontFamily: 'Cardo-Bold'
    },
    picker: {
      paddingBottom: 40,
      height: 20
    }
  });
  