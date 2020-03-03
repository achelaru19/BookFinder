import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { parseString } from "react-native-xml2js"; 

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
        let url = 'https://www.google.com/books/feeds/volumes/?q=ISBN%3C' + data + '%3E';
        fetch(url)
        .then(response => response.text())
        .then((response) => {
            parseString(response, function (err, result) {
              
                console.log(result.getElementsByTagName("entry")[0].childNodes[0].nodeValue)
            });
        }).catch((err) => {
            console.log('fetch', err)
        })
      
        console.log(data);
        console.log(type);
        //props.pressCamera()
        //props.setTitle(response.title);
        //props.setAuthor(response.authors[0].name);
        //props.setEditor(response.publishers[0].name);
        //props.setISBN(data);
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
