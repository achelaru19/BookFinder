import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import NavBar from '../components/navBar';
import BarcodeScan from '../components/barcodeScan';
import {addBook} from '../actions/firebaseDB';
import { Icon } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';
import { UserType } from '../types/userType';
import { isValidNewBook } from '../utils/inputFormatChecks';


export default function AddBook() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [editor, setEditor] = useState<string>('');
  const [isbn, setISBN] = useState<string>('');
  const [price, setPrice] = useState<string>('0.0');
  const [hasPressedCamera, pressCamera] = useState<boolean>(false);
  const [bookAdded, setBookAdded] = useState<boolean>(false);
  const [buttonDisabled, disableButton] = useState<boolean>(true);
  //@ts-ignore
  const [user] = useContext<UserType>(UserContext);
  
  const navigation = useNavigation();

  const addBookFunction = () => {
    addBook(user, title, author, isbn, editor, price);
    setBookAdded(true);
    setTitle('');
    setAuthor('');
    setEditor('');
    setISBN('');
    setPrice('0.0');
  }

  useEffect(() => {
    const notAllCorrect = isValidNewBook(title, author, editor, isbn, price);
    disableButton(!notAllCorrect);
  }, [title, author, editor, isbn, price])

  return (
    <View style={styles.container}>
      <NavBar title="Aggiungi un libro"/>
      
      <View
      style={{
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around'}}>
          <View style={{flex: 4, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={styles.labelCamera}>Ottieni le informazioni con il codice a barre </Text> 
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
            <Icon name="camera-alt" color={"#009071"} reverse={true} onPress={() => pressCamera(!hasPressedCamera)}/>
          </View>
        </View>
            {!hasPressedCamera ? 
            <View style={{flex:9, flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <View style={{flex:1}}>
                <Text style={styles.label}>Titolo</Text>
                <TextInput
                  onChangeText={value => setTitle(value)}
                  value={title}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.label}>Autore</Text>
                <TextInput
                  onChangeText={value => setAuthor(value)}
                  value={author}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.label}>Editore</Text>
                <TextInput
                  onChangeText={value=> setEditor(value)}
                  value={editor}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.label}>ISBN</Text>
                <TextInput
                  onChangeText={value => setISBN(value)}
                  value={isbn}
                  style={styles.inputBox}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.label}>Prezzo</Text>
                <TextInput
                  onChangeText={value => setPrice(value)}
                  value={price}
                  style={styles.inputBox}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity disabled={buttonDisabled} style={styles.addButton} onPress={addBookFunction}>
                  <Text style={styles.buttonText}>Aggiungi</Text>
                </TouchableOpacity>
              </View>
              <AwesomeAlert
                    show={bookAdded}
                    showProgress={false}
                    title="Libro aggiunto"
                    message="Il libro da te inserito &egrave; stato inserito tra i tuoi libri in vendita"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonColor="#009071"
                    onConfirmPressed={() => {
                        setBookAdded(false);
                    }}
                />
          </View>
          : 
            <View style={{flex: 13}}>
              <BarcodeScan pressCamera={() => pressCamera(!hasPressedCamera)} 
                setTitle={t => setTitle(t)}
                setAuthor={a => setAuthor(a)}
                setEditor={e => setEditor(e)}
                setISBN={i => setISBN(i)}
              />
            </View>
          }
        </View>
    </View>
  );
}

AddBook.navigationOptions = ({ navigation }) => ({
  title: 'AddBook',
  drawerLabel: () => null
});
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  inputBox: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 30,
    height: 40,
    paddingHorizontal: 15
  },
  labelCamera: {
    fontFamily: 'Cardo-Regular',
    fontSize: 17
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
    flex: 2,
    backgroundColor: '#90001F',
    flexDirection: 'row',
    width: 390,
    maxHeight: 38,
    borderRadius: 40,
    alignContent: 'center',
    justifyContent: 'center'
  }
});
