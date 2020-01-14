import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import firebaseSDK from '../actions/firebaseSDK';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';

export default function ForgottenPassword() {
    
    const [email, setEmail] = useState('');
    const [fontLoaded, setFontLoaded] = useState(false);

    const navigation = useNavigation();

	const onPressResetPassword = async () => {
		const user = {
			email: email
		};

		const response = firebaseSDK.resetPassword(
			user,
			resetSuccess,
			resentFailure
		);
    };

	const resetSuccess = () => {
        console.log('login successful, navigate to homepage.');
        
		navigation.navigate('Login');
	};

	const resentFailure = () => {
		alert(`L'indirizzo email inserito non è stato registrato`);
    };
    
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
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Book Finder</Text>
                </View>
                <View style={{flex: 3, flexDirection: 'row', alignContent: 'stretch'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image style={styles.image} source={require('../assets/images/forgot-password.png')} />
                    </View>
                    <View style={{flex: 2, flexDirection: 'column'}}>
                        <Text style={styles.text1}>Hai dimenticato la password?</Text>
                        <Text style={styles.text2}>Nessun problema.</Text>
                        <Text style={styles.text3}>Inserisci la tua email e ti invieremo un link per reimpostarla.</Text>
                    </View>
                </View>
                <View style={{flex: 2, flexDirection: 'column'}}>
                    <TextInput
                        style={styles.emailInput}
                        placeholder="La tua email"
                        onChangeText={value => setEmail(value)}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onPressResetPassword}>
                            <Text style={styles.buttonText}>Invia</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.signingOptions}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.smallButtons} onPress={() => console.log("Login page")}>Accedi con le tue credenziali</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
   
	
}

ForgottenPassword.navigationOptions = ({ navigation }) => ({
    title: 'ForgottenPassword',
    drawerLabel: () => null
});

const styles = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignContent: 'space-around'
    },
    title:{
        flexDirection: 'row',
        fontFamily: 'Cardo-Regular',
        fontSize: 58,
        alignContent: 'center',
        textAlign: 'center',
        color: '#90001F'
    },
    image: {
        maxHeight: 200,
        maxWidth: 80,
        marginLeft: 30
    },
    buttonContainer: {
        backgroundColor: '#90001F',
        marginHorizontal: 30,
        borderRadius: 30,
        marginTop: 16,
        height: 40
    },
    buttonText: {
        fontFamily: 'Cardo-Regular',
		fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },
	emailInput: {
		height: 40,
        marginHorizontal: 30,
        marginVertical: 10,
		paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
        fontSize: 16,
        borderRadius: 30
    },
    smallButtons: {
        fontSize: 16,
        fontFamily: 'Cardo-Bold',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    signingOptions: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    text1: {
        fontFamily: 'Cardo-Regular',
        fontSize: 20
    },
    text2: {
        fontFamily: 'Cardo-Bold',
        fontSize: 20
    },
    text3: {
        fontFamily: 'Cardo-Regular',
        fontSize: 20,
        marginTop: 30,
        justifyContent: 'space-around',
        alignContent: 'stretch'
    },
});
