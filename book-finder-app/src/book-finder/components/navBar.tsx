import React from 'react';
import { withNavigation } from 'react-navigation';
import {Header, Icon} from 'react-native-elements';
import * as Font from 'expo-font';


interface Props {
  navigation: any
  title: string
}

class NavBar extends React.Component<Props> {

constructor(props){
  super(props);
}

state = {
  fontLoaded: false
};

async componentDidMount() {
  await Font.loadAsync({
    'Cardo': require('../assets/fonts/Cardo-Regular.ttf'),
  });
  this.setState({ fontLoaded: true });
}
  render() {
    const {navigate} = this.props.navigation;
    return (

      this.state.fontLoaded ? 
      <Header 
        containerStyle={{
          backgroundColor: '#90001F',
        }}
          leftComponent={<Icon name="menu" color={'white'}  onPress={() => this.props.navigation.openDrawer()} />}
          centerComponent={{ text: this.props.title, style: { color: '#fff', fontFamily: 'Cardo', fontSize: 30 } }}
          rightComponent={<Icon name="search" color={'white'}  onPress={() => this.props.navigation.navigate('Search' , {id: 2})} />}
        />
        :
        null
    );
  }
}


export default withNavigation(NavBar);