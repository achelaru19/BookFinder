import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { searchBookDetails } from '../utils/functions';

interface PropsType {
  setISBN: (string) => void;
  pressCamera: () => void;
  setTitle: (string) => void;
  setEditor: (string) => void;
  setAuthor: (string) => void;
}

export default function BarcodeScan(props: PropsType) {

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if(type == 32 || type == 10) {
      searchBookDetails(data, d => props.setISBN(d), 
                        () => props.pressCamera(), 
                        (title) => props.setTitle(title),
                        (editor) => props.setEditor(editor),
                        (author) => props.setAuthor(author))
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
      style={styles.cameraSquare}
    />
  );

}

const styles = StyleSheet.create({
  cameraSquare: {
    flex: 1,
  },
  
});
