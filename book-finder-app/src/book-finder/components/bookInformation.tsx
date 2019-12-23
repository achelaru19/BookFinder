import React from 'react';
import { Text, View, Image } from 'react-native';


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
        <View style={{flex: 12, flexDirection: 'row', height: 100, borderBottomWidth: 0.5, borderColor: 'orange', alignContent: 'center'}}>
            <View style={{flex: 3, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Image 
                    style={{width: 80, height: 80}}
                    source={{uri:"https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=5.0.63"}}
                />
            </View>
            <View style={{flex: 7, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                <Text>Titolo: {this.props.book.title}</Text>
                <Text>Autore: {this.props.book.author}</Text>
                <Text>Editore: {this.props.book.editor}</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Text>9,99&euro;</Text>
            </View>
        </View>);
    }
}