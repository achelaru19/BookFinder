import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import NavBar from '../components/navBar';

interface Props {
  navigation: any
}


export default class Search extends React.Component<Props> {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <NavBar/>
        <View style={{flex: 12}}>
          <Formik
            initialValues={
              { title: '',
                author: '',
                editor: '',
                isbn: ''
            }
            }
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <View>
                <Text>Titolo: </Text>
                <TextInput
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
                </View>
                <View>
                  <Text>Autore: </Text>
                <TextInput
                  onChangeText={handleChange('author')}
                  onBlur={handleBlur('author')}
                  value={values.author}
                />
                </View>
                <View>
                <Text>Editore: </Text>
                <TextInput
                  onChangeText={handleChange('editor')}
                  onBlur={handleBlur('editor')}
                  value={values.editor}
                />
                </View>
                <View>
                  <Text>ISBN: </Text>
                <TextInput
                  onChangeText={handleChange('isbn')}
                  onBlur={handleBlur('isbn')}
                  value={values.isbn}
                />
                </View>
                <Button onPress={() => handleSubmit} title="Cerca" />
              </View>
            )}
          </Formik> 
        </View>
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
  