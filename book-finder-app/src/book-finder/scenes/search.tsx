import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Formik } from 'formik';
import NavBar from '../components/navBar';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';
import { NavigationEvents } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';

export default function Search() {

  const [fontLoaded, setFontLoaded] = useState(false);
  
  const navigation = useNavigation();

  useEffect(() => {

  }, []);

  const searchForBook = values => {console.log("send"); navigation.navigate('Result', {values})};

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
      (<View style={{flex: 1}}>
        <NavBar title="Cerca Libro"/>
        <View style={{flex: 12, flexDirection: "column"}}>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 17, borderRadius: 30, fontFamily: 'Cardo-Regular',justifyContent: 'space-around'}}>
              Aggiungi pi&ugrave; informazioni
            </Text>
            <Text style={{fontSize: 17, borderRadius: 30, fontFamily: 'Cardo-Regular',justifyContent: 'space-around'}}>
              per una ricerca migliore
            </Text>
          </View>
          <View style={{flex: 11}}>
          <Formik
            initialValues={
              { title: '',
                author: '',
                editor: '',
                isbn: '',
                subject: ''

            }
            }
            onSubmit={values=> searchForBook(values)}
          >
            {({ handleChange, handleBlur, values }) => (
              <View style={{flex:6, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                <Text style={styles.labelText}>Titolo: </Text>
                <TextInput
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                  <Text style={styles.labelText}>Autore: </Text>
                <TextInput
                  onChangeText={handleChange('author')}
                  onBlur={handleBlur('author')}
                  value={values.author}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                <Text style={styles.labelText}>Editore: </Text>
                <TextInput
                  onChangeText={handleChange('editor')}
                  onBlur={handleBlur('editor')}
                  value={values.editor}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                  <Text style={styles.labelText}>ISBN: </Text>
                <TextInput
                  onChangeText={handleChange('isbn')}
                  onBlur={handleBlur('isbn')}
                  value={values.isbn}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                  <Text style={styles.labelText}>Corso: </Text>
                <TextInput
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  value={values.subject}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity style={styles.searchButton} onPress={values => searchForBook(values)}>
                    <Text style={{color: 'white', fontFamily: 'Cardo-Regular', fontSize: 25}}>Cerca</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik> 
          </View> 
        </View>
      </View>
    ));
}


Search.navigationOptions = ({ navigation }) => ({
  title: 'Search',
  drawerLabel: () => null
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    height: 40,
    paddingLeft: 15,
    marginLeft: 3,
    marginRight: 3
  },
  labelText: {
    fontSize: 20,
    marginLeft: 7,
    fontFamily: 'Cardo-Bold'
  },
  searchButton: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#90001F',
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 280
  },
});
