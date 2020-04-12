import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function BarcodeScan(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if(type == 32 || type == 10) {
        setScanned(true);
        const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + data + "&key=AIzaSyBXQmkSjmW-R4qHjzocTg2aWJ4gImi3fdM";
        fetch(url)
        .then(response => response.text())
        .then((response) => {
          const json = JSON.parse(response)
          const items = json["items"]
          const fisrtElement = items[0];
          const volumeInfo = fisrtElement["volumeInfo"]
          const title = volumeInfo['title'];
          const publisher = volumeInfo['publisher']
          const authors = volumeInfo['authors'];
          let authorString = ''
          const len = authors.length;
          for(let i = 0; i < len; i++){
            if(i != 0)
              authorString = authorString + ', ' + authors[i];
            else
              authorString = authors[i];
          }
          if(title != undefined) props.setTitle(title);
          if(authors != undefined) props.setAuthor(authorString);
          if(publisher != undefined) props.setEditor(publisher);
          props.setISBN(data);
          props.pressCamera()
        }).catch((err) => {
            console.log('fetch', err)
        })
    }
  };

  if (hasPermission === null) {
    return <Text>Richiesta accesso alla fotocamera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Accesso alla fotocamera negato</Text>;
  }

  return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
  );
}
