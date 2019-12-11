import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavBar from './components/navBar';
import BookInformation from './components/bookInformation';

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
    title: 'BookFinder',
  };

  state: thisState = {
    userID : 3, // somehow else
    booksAroundMe: [{title: 'Titolo1', author: 'Autore 1', editor: 'Editore 1'}, 
    {title: 'Titolo2', author: 'Autore 2', editor: 'Editore 2'}, 
    {title: 'Titolo3', author: 'Autore 3', editor: 'Editore 3'}] // to be retrieved later in componentDidMount
  }
  constructor(props){
    super(props);
  }

  componentWillMount(){
    // get userID
    // get booksAroundMe
    this.setState({
      booksAroundMe: [{title: 'Titolo1', author: 'Autore 1', editor: 'Editore 1'}, 
                      {title: 'Titolo2', author: 'Autore 2', editor: 'Editore 2'}, 
                      {title: 'Titolo3', author: 'Autore 3', editor: 'Editore 3'}]
    })
    }

  render() {
    const {navigate} = this.props.navigation;
   
    return (
      <View>
        <NavBar/>
        {this.state.booksAroundMe.forEach(element => {
          <BookInformation title={element.title} author={element.author} editor={element.editor} />
        })
        }
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
  });
  