import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import NavBar from '../components/navBar';
import BarcodeScan from '../components/barcodeScan';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddBook() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editor, setEditor] = useState('');
  const [isbn, setISBN] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [hasPressedCamera, pressCamera] = useState(false);
  
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
            <View style={{flex:8, flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <View style={{flex:0.8}}>
                <Text style={styles.label}>Titolo</Text>
                <TextInput
                  onChangeText={value => setTitle(value)}
                  value={title}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:0.8}}>
                <Text style={styles.label}>Autore</Text>
                <TextInput
                  onChangeText={value => setAuthor(value)}
                  value={author}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:0.8}}>
                <Text style={styles.label}>Editore</Text>
                <TextInput
                  onChangeText={value=> setEditor(value)}
                  value={editor}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:0.8}}>
                <Text style={styles.label}>ISBN</Text>
                <TextInput
                  onChangeText={value => setISBN(value)}
                  value={isbn}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:0.8}}>
                <Text style={styles.label}>Materia</Text>
                <TextInput
                  onChangeText={value => setSubject(value)}
                  value={subject}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex:0.8}}>
                <Text style={styles.label}>Professore</Text>
                <TextInput
                  onChangeText={value=> setTeacher(value)}
                  value={teacher}
                  style={styles.inputBox}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.addButton} onPress={() => console.log("Aggiungi libro")}>
                  <Text style={styles.buttonText}>Aggiungi</Text>
                </TouchableOpacity>
              </View>
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
    borderRadius: 30,
    height: 30,
    paddingLeft: 15
  },
  labelCamera: {
    fontFamily: 'Cardo-Regular',
    fontSize: 17
  },
  label: {
    fontFamily: 'Cardo-Bold',
    fontSize: 15,
    paddingLeft: 10
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
    width: 150,
    maxHeight: 38,
    borderRadius: 40,
    alignContent: 'center',
    justifyContent: 'center'
  }
});
