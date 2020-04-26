import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Formik } from 'formik';
import NavBar from '../components/navBar';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';
import { UserType } from '../types/userType';
import { SearchBookType } from '../types/searchBookType';
import { isSearchValid } from '../utils/inputFormatChecks';

export default function Search() {

  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  //@ts-ignore
  const [user] = useContext<UserType>(UserContext);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [editor, setEditor] = useState<string>('');
  const [isbn, setISBN] = useState<string>('');
  const [buttonDisabled, disableButton] = useState<boolean>(true);

  const navigation = useNavigation();

  const searchForBook = () => {
    const params: SearchBookType = {
      title: title,
      editor: editor,
      author: author,
      isbn: isbn
    }
    navigation.navigate('Result', {parameters: params});
  };

  useEffect(() => {
    const notAllCorrect = isSearchValid(title, author, editor, isbn);
    disableButton(!notAllCorrect);
  }, [title, author, editor, isbn])

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
            onSubmit={() => searchForBook()}
          >
            {({ handleChange, handleBlur, values }) => (
              <View style={{flex:6, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                <Text style={styles.labelText}>Titolo: </Text>
                <TextInput
                  onChangeText={val => setTitle(val)}
                  onBlur={handleBlur('title')}
                  value={title}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                  <Text style={styles.labelText}>Autore: </Text>
                <TextInput
                  onChangeText={val => setAuthor(val)}
                  onBlur={handleBlur('author')}
                  value={author}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                <Text style={styles.labelText}>Editore: </Text>
                <TextInput
                  onChangeText={val => setEditor(val)}
                  onBlur={handleBlur('editor')}
                  value={editor}
                  style={styles.inputContainer}
                />
                </View>
                <View style={{flex:1, justifyContent: 'space-around'}}>
                  <Text style={styles.labelText}>ISBN: </Text>
                <TextInput
                  onChangeText={val => setISBN(val)}
                  onBlur={handleBlur('isbn')}
                  value={isbn}
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
                  <TouchableOpacity disabled={buttonDisabled} style={styles.searchButton} onPress={() => searchForBook()}>
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

Search.screenProps = {
  firstname: 'Gianni',
  lastname: 'Rossi'
}

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
