import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from 'firebase';
import firebaseSDK from '../actions/firebaseSDK';
import { useNavigation } from 'react-navigation-hooks';
import HomePage from '../homepage';

export default function Login() {
    
    const [username, setUsername] = useState('angel.chelaru');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

	const loginSuccess = () => {
		console.log('login successful, navigate to chat.');
		navigation.navigate('Home', {
			name: username,
			email: email
		});
	};

	const loginFailed = () => {
		alert('Login failure. Please tried again.');
    };
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            return <HomePage />;
        }
    });

    return (
        <View>
            <Text style={styles.title}>Email:</Text>
            <TextInput
                style={styles.nameInput}
                placeholder="test3@gmail.com"
                onChangeText={value => setEmail(value)}
            />
            <Text style={styles.title}>Password:</Text>
            <TextInput
                style={styles.nameInput}
                secureTextEntry={true}
                onChangeText={value => setPassword(value)}
            />
            <Button
                title="Login"
                onPress={onPressLogin}
            />

            <Button
                title="Signup"
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    );
   
	
}

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    //drawerLabel: () => null
});

const styles = StyleSheet.create({
	title: {
		marginTop: 16,
		marginLeft: 16,
		fontSize: 16
	},
	nameInput: {
		height: 16 * 2,
		margin: 16,
		paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
		fontSize: 16
	},
	buttonText: {
		marginLeft: 16,
		fontSize: 42
	}
});
