import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 30,
    marginHorizontal: 5,
    height: 40,
    paddingHorizontal: 10
  },
  labelText: {
    fontSize: 20,
    marginLeft: 7,
    fontFamily: 'Cardo-Bold'
  },
  searchButton: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#90001F',
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width * 0.95,
    marginTop: 180
  },
});
