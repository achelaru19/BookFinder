import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import {Header, Icon} from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import * as Font from 'expo-font';

function NavBar(props){

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Cardo': require('../assets/fonts/Cardo-Regular.ttf'),
    });
    setFontLoaded(true);
  }, []);

  const navigation = useNavigation();
  return (
    fontLoaded ? (
    <Header 
      containerStyle={{
        backgroundColor: '#90001F',
      }}
        leftComponent={<Icon name="menu" color={'white'}  onPress={() => navigation.openDrawer()} />}
        centerComponent={{ text: props.title, style: { color: '#fff', fontFamily: 'Cardo', fontSize: 30 } }}
        rightComponent={<Icon name="search" color={'white'}  onPress={() => navigation.navigate('Search' , {id: 2})} />}
      />
    ) : null
  );
}



export default withNavigation(NavBar);