import React, { useState, useContext, createContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebaseSDK from '../actions/firebaseSDK';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';
import AwesomeAlert from 'react-native-awesome-alerts';
import { UserContext } from '../consts/context';
import { UserType } from '../types/userType';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [fontLoaded, setFontLoaded] = useState<boolean>(false);
    const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);
    const user = useContext<UserType>(UserContext);
    const navigation = useNavigation();

	const onPressLogin = async () => {
		const user = {
			email: email,
			password: password
		};

		const response = firebaseSDK.login(
			user,
			loginSuccess,
			loginFailed
		);
    };


	const loginSuccess = async () => {
        navigation.navigate('Home', {
            email: email
        });
	};

	const loginFailed = () => {
		setWrongCredentials(true);
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
                            <Text style={styles.buttonText}>Accedi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.signingOptions}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgottenPassword')}>
                            <Text style={styles.smallButtons}>Password dimenticata?</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.smallButtons}>Registrati</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AwesomeAlert
                    show={wrongCredentials}
                    showProgress={false}
                    title="Credenziali errate"
                    message="L'email e la password inserite non sono valide"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => {
                        setWrongCredentials(false);
                    }}
                />
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
