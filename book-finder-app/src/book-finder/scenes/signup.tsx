import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebaseSDK from '../actions/firebaseSDK';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';

export default function SignUp() {
    
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [fontLoaded, setFontLoaded] = useState(false);

    const navigation = useNavigation();

	const onPressSignUp = async () => {
		const user = {
			email: email,
			password: password1
		};

		const response = firebaseSDK.signup(
			user,
			signUpSuccess,
			signUpFailure
		);
    };

	const signUpSuccess = () => {
        console.log('login successful, navigate to homepage.');
        
		navigation.navigate('Home', {
			email: email
		});
	};

	const signUpFailure = () => {
		alert('Email già esistente');
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
                <View style={{flex: 3, flexDirection: 'column'}}>
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
                        onChangeText={value => setPassword1(value)}
                    />
                    <Text style={styles.label}>Verifica Password:</Text>
                    <TextInput
                        style={styles.nameInput}
                        secureTextEntry={true}
                        onChangeText={value => setPassword2(value)}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onPressSignUp}>
                            <Text style={styles.buttonText}>Registrati</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.signingOptions}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.smallButtons} onPress={() => console.log("Login page")}>Login con le tue credenziali</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
   
	
}

SignUp.navigationOptions = ({ navigation }) => ({
    title: 'SignUp',
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
