import React from 'react';
import HomePage from "./src/book-finder/homepage";
import Messages from "./src/book-finder/scenes/messages";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


const MainNavigator = createStackNavigator({
  Home: {screen: HomePage},
  Messages: {screen: Messages},
});

const App = createAppContainer(MainNavigator);

export default App;

/*
export default class App extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>La mia prima App!</Text>
        <Text> Test cambio pagina 3 </Text>
        <BookInformation />
        <BookInformation />
        <Button 
          title="Go to Homepage"
          onPress={() => this.props.navigator()}
        />
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

*/