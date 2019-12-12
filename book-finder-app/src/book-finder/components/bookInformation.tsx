import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';


interface Props {
    book: BookShortInfo
  }
  
interface BookShortInfo {
    title: string,
    author: string,
    editor: string
  };

export default class BookInformation extends React.Component<Props> {

    componentDidMount(){
        let userID: number = 3; //this.props.userID
        
    }

    render() {
        return (
        <View>
            <View>
                <Image 
                    style={{width: 50, height: 50}}
                    source={{uri:"https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.63"}}
                />
            </View>
            <View>
                <Text>Titolo: {this.props.book.title}</Text>
                <Text>Autore: {this.props.book.author}</Text>
                <Text>Editore: {this.props.book.editor}</Text>
            </View>
        </View>);
    }
}