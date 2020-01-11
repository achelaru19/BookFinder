import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'firebase';
import firebaseSDK from '../actions/firebaseSDK';
import { useNavigation } from 'react-navigation-hooks';
import HomePage from '../homepage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';

export default function Login() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);

    const navigation = useNavigation();

	const onPressLogin = async () => {
		const user = {
			name: username,
			email: email,
			password: password
		};

		const response = firebaseSDK.login(
			user,
			loginSuccess,
			loginFailed
		);
    };

    /*
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            navigation.navigate('Home');
        } 
    });
    */

	const loginSuccess = () => {
		console.log('login successful, navigate to homepage.');
		navigation.navigate('Home', {
			name: username,
			email: email
		});
	};

	const loginFailed = () => {
		alert('Credenziali errate');
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
                <View style={{flex: 2, flexDirection: 'column'}}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="test@gmail.com"
                        onChangeText={value => setEmail(value)}
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.nameInput}
                        secureTextEntry={true}
                        onChangeText={value => setPassword(value)}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onPressLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.signingOptions}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.smallButtons} onPress={() => console.log("Reset password page")}>Password dimenticata?</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.smallButtons} onPress={() => console.log("SignUp page")}>Registrati</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
   
	
}

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    drawerLabel: () => null
});

const styles = StyleSheet.create({
    container: {
        flex: 6,
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
    buttonContainer: {
        backgroundColor: '#90001F',
        marginHorizontal: 40,
        borderRadius: 30,
        marginTop: 16,
        height: 60
    },
    buttonText: {
        fontFamily: 'Cardo-Regular',
		fontSize: 36,
        textAlign: 'center',
        color: 'white'
    },
	label: {
        fontFamily: 'Cardo-Bold',
		marginTop: 5,
		marginLeft: 16,
		fontSize: 18
	},
	nameInput: {
		height: 16 * 2,
        marginHorizontal: 16,
        marginVertical: 10,
		paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
        fontSize: 16,
        borderRadius: 5
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
    }
});
