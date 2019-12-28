import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

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
        // SEARCH FOR ISBN WITH data
        // "http://openlibrary.org/api/books?bibkeys=ISBN:9780141033570&jscmd=data&format=json"
        
        let url = 'https://api.altmetric.com/v1/isbn/' + data;
        fetch(url)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      
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

        console.log(type);
        props.pressCamera()
        props.setTitle(response.title);
        props.setAuthor(response.authors[0].name);
        props.setEditor(response.publishers[0].name);
        props.setISBN(data);
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
