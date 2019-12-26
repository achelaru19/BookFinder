import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import {Header, Icon} from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';

function NavBar(props){

  const [fontLoaded, setFontLoaded] = useState(false);
  
  useEffect(() => {
    
  }, []);

  const navigation = useNavigation();
  if(!fontLoaded)
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setFontLoaded)} 
      />
      );
  else 
    return (
    <Header 
      containerStyle={{
        backgroundColor: '#90001F',
      }}
        leftComponent={<Icon name="menu" color={'white'}  onPress={() => navigation.openDrawer()} />}
        centerComponent={{ text: props.title, style: { color: '#fff', fontFamily: 'Cardo-Regular', fontSize: 30 } }}
        rightComponent={<Icon name="search" color={'white'}  onPress={() => navigation.navigate('Search' , {id: 2})} />}
      />
  );
}



export default withNavigation(NavBar);