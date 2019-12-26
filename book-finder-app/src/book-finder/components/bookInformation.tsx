import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';


interface Props {
    book: BookShortInfo
  }
  
interface BookShortInfo {
    title: string,
    author: string,
    editor: string
  };

export default function BookInformation(props){

    const [userID, setUserID] = useState(3);

    useEffect(() => {

    }, []);
        

    return (
    <View style={{flex: 12, flexDirection: 'row', height: 100, borderBottomWidth: 0.5, borderColor: 'black', alignContent: 'center'}}>
        <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Image 
                style={{width: 80, height: 80}}
                source={{uri:"https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.63"}}
            />
        </View>
        <View style={{flex: 7, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
            <Text>Titolo: {props.book.title}</Text>
            <Text>Autore: {props.book.author}</Text>
            <Text>Editore: {props.book.editor}</Text>
        </View>
        <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Text>9,99&euro;</Text>
        </View>
    </View>);
}