import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
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
    lastMessageBox: {
      flex:1,
      height: 20,
  
    },
    messages: {
      flex: 1,
      flexDirection: 'row',
  
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
  });
  