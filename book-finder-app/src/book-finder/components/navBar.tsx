import React from 'react';
import { withNavigation } from 'react-navigation';
import {Header, Icon} from 'react-native-elements';


interface Props {
  navigation: any
  title: string
}

class NavBar extends React.Component<Props> {

constructor(props){
  super(props);
}

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Header 
        containerStyle={{
          backgroundColor: '#ff7a59',
        }}
          leftComponent={<Icon name="menu" color={'white'}  onPress={() => this.props.navigation.openDrawer()} />}
          centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
          rightComponent={<Icon name="search" color={'white'}  onPress={() => this.props.navigation.navigate('Search' , {id: 2})} />}
        />
    );
  }
}


export default withNavigation(NavBar);