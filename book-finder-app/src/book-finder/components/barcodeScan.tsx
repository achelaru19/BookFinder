import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';

export default function BarcodeScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [hasPressedCamera, pressCamera] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editor, setEditor] = useState('');
  const [isbn, setISBN] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if(type == 32 || type == 10) {
        setScanned(true);
        // SEARCH FOR ISBN WITH data
        // "http://openlibrary.org/api/books?bibkeys=ISBN:9780141033570&jscmd=data&format=json"
        let response = {
                "publishers": [
                {
                    "name": "Penguin Group"
                }
                ],
                "title": "Thinking, fast and slow",
                "url": "http://openlibrary.org/books/OL25426844M/Thinking_fast_and_slow",
                "number_of_pages": 512,
                "cover": {
                "small": "https://covers.openlibrary.org/b/id/7256677-S.jpg",
                "large": "https://covers.openlibrary.org/b/id/7256677-L.jpg",
                "medium": "https://covers.openlibrary.org/b/id/7256677-M.jpg"
                },
                "authors": [
                {
                    "url": "http://openlibrary.org/authors/OL2066695A/Daniel_Kahneman",
                    "name": "Daniel Kahneman"
                }
                ],
                "publish_date": "2012"
            
        };

        pressCamera(!hasPressedCamera)
        setTitle(response.title);
        setAuthor(response.authors[0].name);
        setEditor(response.publishers[0].name);
        setISBN(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Richiesta accesso alla fotocamera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Accesso alla fotocamera negato</Text>;
  }

  return (
    <View
      style={{
        flex: 15,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>

      <View style={{flex:5, flexDirection: 'row'}}>
        <Text>Ottieni le informazioni con il codice a barre </Text> 
        <Icon name="camera-alt" reverse={true} onPress={() => pressCamera(!hasPressedCamera)}/>
      </View>

      <View style={{flex:10}}>
      {hasPressedCamera ? 
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      : <View style={{flex: 8}}>
      
          <View>
            <View>
            <Text>Titolo: </Text>
            <TextInput
              onChangeText={() => setTitle(this.value)}
              value={title}
            />
            </View>
            <View>
              <Text>Autore: </Text>
            <TextInput
              onChangeText={() => setAuthor(this.value)}
              value={author}
            />
            </View>
            <View>
            <Text>Editore: </Text>
            <TextInput
              onChangeText={() => setEditor(this.value)}
              value={editor}
            />
            </View>
            <View>
              <Text>ISBN: </Text>
            <TextInput
              onChangeText={() => setISBN(this.value)}
              value={isbn}
            />
            </View>
            <View>
              <Text>Materia: </Text>
            <TextInput
              onChangeText={() => setSubject(this.value)}
              value={subject}
            />
            </View>
            <View>
              <Text>Professore: </Text>
            <TextInput
              onChangeText={() => setTeacher(this.value)}
              value={teacher}
            />
            </View>
            <Button onPress={() => console.log("Aggiungi libro")} title="Aggiungi" />
          </View>
        </View>
        }
        </View>
    </View>
  );
}
