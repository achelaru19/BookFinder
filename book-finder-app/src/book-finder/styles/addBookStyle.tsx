import { StyleSheet, Dimensions } from 'react-native';

export 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  inputBox: {
    borderWidth: 0.5,
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 30,
    height: 40,
    paddingHorizontal: 15
  },
  inputField: {
    flex: 1,
    flexDirection: 'column'
  },
  labelCamera: {
    fontFamily: 'Cardo-Regular',
    fontSize: 17,
    flexDirection: 'column',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  label: {
    fontFamily: 'Cardo-Bold',
    fontSize: 20,
    paddingLeft: 20
  },
  buttonText: {
    fontFamily: 'Cardo-Bold',
    fontSize: 20,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center'
  },
  addButton: {
    flex: 1,
    backgroundColor: '#90001F',
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.95,
    marginTop: 120,
    height: 40,
    borderRadius: 40,
    alignContent: 'center',
    justifyContent: 'center'
  }
});
