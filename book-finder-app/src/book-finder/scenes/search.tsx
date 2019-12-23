import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Formik } from 'formik';
import NavBar from '../components/navBar';

interface Props {
  navigation: any
}


export default class Search extends React.Component<Props> {
  static navigationOptions = {
    title: 'Search',
    drawerLabel: () => null
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <NavBar title="Cerca Libro"/>
        <View style={{flex: 12, flexDirection: "column"}}>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 17, backgroundColor: 'white', borderRadius: 30}}>Aggiungi pi&ugrave; informazioni per una ricerca migliore</Text>
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
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                <View style={{flex:1, justifyContent: 'center'}}>
                  <TouchableOpacity style={styles.searchButton} onPress={() => handleSubmit}>
                    <Text>Cerca</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik> 
          </View> 
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
    inputContainer: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 30,
      height: 40,
      paddingLeft: 15
    },
    labelText: {
      fontSize: 20,
      marginLeft: 7
    },
    searchButton: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: '#ff7a59',
      maxHeight: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
  