import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View />
);
const SecondRoute = () => (
  <View />
);

export default class NavBar extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home' },
      { key: 'mail', title: 'Mail' },
      { key: 'search', title: 'Search'},
      { key: 'profile', title: 'Profile'},
      { key: 'logout', title: 'Logout'},
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          home: FirstRoute,
          mail: SecondRoute,
          search: FirstRoute,
          profile: SecondRoute,
          logout: FirstRoute
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  }
});