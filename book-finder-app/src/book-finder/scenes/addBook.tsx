import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert,TouchableOpacity, Image, AppRegistry } from 'react-native';
import {RNCamera} from 'react-native-camera';
import { Formik } from 'formik';
import { Icon } from 'react-native-elements';
import NavBar from '../components/navBar';

interface Props {
  navigation: any
}

interface myState {
    torchOn: string,
    cameraType: string
}


export default class AddBook extends React.Component<Props> {
  static navigationOptions = {
    title: 'AddBook',
    drawerLabel: () => null
  };

  state = {
    torchMode: 'off',
    cameraType: 'back',
  };
    camera: RNCamera;

  constructor(props){
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    
  }

  
  barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  }


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <NavBar title="Aggiungi un libro"/>
        <View>
            <Text>Ottieni le informazioni con il codice a barre </Text> 
            <Icon name="camera-alt" reverse={true} />
            <RNCamera
            ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}
            />
            {
            //<View style={styles.bottomOverlay}>
            //<TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}>
            //<Image style={styles.cameraIcon}
            //source={this.state.torchOn === true ? require('../../images/flasher_on.png') : require('../../images/flasher_off.png')} />
            //</TouchableOpacity>
            //</View>
            }
        </View>
        <View style={{flex: 12}}>
          <Formik
            initialValues={
              { title: '',
                author: '',
                editor: '',
                isbn: '',
                subject: '',
                teacher: ''
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
                <View>
                  <Text>Materia: </Text>
                <TextInput
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  value={values.subject}
                />
                </View>
                <View>
                  <Text>Professore: </Text>
                <TextInput
                  onChangeText={handleChange('teacher')}
                  onBlur={handleBlur('teacher')}
                  value={values.teacher}
                />
                </View>
                <Button onPress={() => handleSubmit} title="Aggiungi" />
              </View>
            )}
          </Formik> 
        </View>
      </View>
    );
  }
  handleTourch(value) {
    if (value === true) {
        this.setState({ torchOn: false });
    } else {
        this.setState({ torchOn: true });
    }
}
  }

  
 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
    cameraIcon: {
            margin: 5,
            height: 40,
            width: 40
        },
     bottomOverlay: {
            position: "absolute",
            width: "100%",
            flex: 20,
            flexDirection: "row",
            justifyContent: "space-between"
        },
  });
  