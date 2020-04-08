import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import firebaseSDK from '../actions/firebaseSDK';
import {addUser} from '../actions/firebaseDB';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';

export default function SignUp() {
    
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [university, setUniversity] = useState('');
    const [faculty, setFaculty] = useState('');
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
        addUser(email, firstname, lastname, birthdate, university, faculty);
		navigation.navigate('Login');
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
                <View style={{flex: 4, flexDirection: 'column'}}>
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onPressSignUp}>
                            <Text style={styles.buttonText}>Registrati</Text>
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
        marginHorizontal: 15,
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
	label: {
        fontFamily: 'Cardo-Bold',
		marginTop: 5,
		marginLeft: 16,
		fontSize: 18
	},
	nameInput: {
		height: 40,
        marginHorizontal: 15,
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
    }
});
