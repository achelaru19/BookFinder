import React, { useState } from 'react';
import { Text, TextInput, View, Button, KeyboardAvoidingView, Platform } from 'react-native';
import firebaseSDK from '../actions/firebaseSDK';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';
import AwesomeAlert from 'react-native-awesome-alerts';
import { styles } from '../styles/loginStyle';


export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fontLoaded, setFontLoaded] = useState<boolean>(false);
    const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);
    const navigation = useNavigation();

	const onPressLogin = async () => {
		const user = {
			email: email,
			password: password
		};

		firebaseSDK.login(
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
    
    if(!fontLoaded) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setFontLoaded)} 
            />
        );
    }
    else {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior={undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Book Finder</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'column'}}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.nameInput}
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
                        onConfirmPressed={() => setWrongCredentials(false)}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
	
}

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    drawerLabel: () => null
});

