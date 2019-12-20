import React from 'react';
import {Header, Icon} from 'react-native-elements';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import NavBar from './components/navBar';
import BookInformation from './components/bookInformation';
import Search from './scenes/search';

interface Props {
  navigation: any
};

interface BookShortInfo {
  title: string,
  author: string,
  editor: string
};

interface thisState {
  userID: number,
  booksAroundMe: BookShortInfo[] | any
};

export default class HomePage extends React.Component<Props> {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    ) 
  }


  state: thisState = {
    userID : 3, // somehow else
    booksAroundMe: [{title: 'Titolo1', author: 'Autore 1', editor: 'Editore 1'}, 
    {title: 'Titolo2', author: 'Autore 2', editor: 'Editore 2'}, 
    {title: 'Titolo3', author: 'Autore 1', editor: 'Editore 1'}, 
    {title: 'Titolo4', author: 'Autore 2', editor: 'Editore 2'}, 
    {title: 'Titolo5', author: 'Autore 1', editor: 'Editore 1'}, 
    {title: 'Titolo6', author: 'Autore 2', editor: 'Editore 2'}, 
    {title: 'Titolo7', author: 'Autore 3', editor: 'Editore 3'}] // to be retrieved later in componentDidMount
  }

  constructor(props){
    super(props);
  }

  componentWillMount(){
    // get userID
    // get booksAroundMe
  
    }

  render() {
    const {navigate} = this.props.navigation;
   
    return (
      <View style={{flex: 1,flexDirection: 'column',
      justifyContent: 'center',
      borderTopWidth: 10,
      alignItems: 'stretch',}}>
        <NavBar />
        <View style={{flex: 12}}>
          <ScrollView style={{flex: 11}}>
            {this.state.booksAroundMe.map((book, index) => <BookInformation book={book} key={'book-info-'+index}/>)}
          </ScrollView>
          <View style={styles.addBookButton}>
            <Button title="+" onPress={()=>console.log("Add book page")} color="#ff7a59" />
          </View>
        </View>
      </View>
    );
  }
  }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addBookButton: {
      position: 'absolute',
      borderRadius: 1,
      width: 50,
      height: 50,
      bottom:0,
      right:30,
    },
  });
  