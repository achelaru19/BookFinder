import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';
import {Header, Icon} from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';

interface PropsType {
  title: string;
}

const NavBar = (props: PropsType) => {

  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const navigation = useNavigation();

  if(!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setFontLoaded)} 
      />
    );
  }
  else {
    return (
      <Header 
        containerStyle={{backgroundColor: '#90001F'}}
        leftComponent={<Icon name="menu" color={'white'}  onPress={() => navigation.openDrawer()} />}
        centerComponent={{ text: props.title, style: { color: '#fff', fontFamily: 'Cardo-Bold', fontSize: 23 } }}
        rightComponent={<Icon name="search" color={'white'}  onPress={() => navigation.navigate('Search')} />}
      />
    );
  }

}


export default withNavigation(NavBar);