import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, SafeAreaView } from 'react-native';
import firebaseSDK from '../actions/firebaseSDK';
import {addUser} from '../actions/firebaseDB';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import DatePicker from 'react-native-datepicker';
import { AppLoading } from 'expo';
import {universities, faculties} from '../consts/constants';

export default function SignUp() {
    
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState("01-01-1995");
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
            <SafeAreaView  style={styles.container}>
                <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Book Finder</Text>
                </View>
                <View style={{flex: 4, flexDirection: 'column'}}>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="Marco"
                        onChangeText={value => setFirstname(value)}
                    />
                    <Text style={styles.label}>Cognome:</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="Rossi"
                        onChangeText={value => setLastname(value)}
                    />
                    <Text style={styles.label}>Data di nascita:</Text>
                    <View style={styles.nameInput}>
                        <DatePicker
                            style={{width: 200}}
                            date={birthdate} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="Imposta data di nascita"
                            format="DD-MM-YYYY"
                            minDate="01-01-1900"
                            maxDate="01-01-2019"
                            confirmBtnText="Conferma"
                            cancelBtnText="Cancella"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(date) => {setBirthdate(date)}}
                        />
                    </View>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="test@gmail.com"
                        onChangeText={value => setEmail(value)}
                    />
                     <Text style={styles.label}>Università:</Text>
                     <View style={styles.pickerInput}>
                     <Picker style={styles.picker} selectedValue={university} onValueChange={val => {if(val != '-') setUniversity(val)}}>
                        <Picker.Item label={"Seleziona una università"} value="-" />
                        {universities.map(uni => 
                            <Picker.Item label={uni} value={uni} />
                        )}
                    </Picker>
                    </View>
                     <Text style={styles.label}>Facoltà:</Text>
                     <View style={styles.pickerInput}>
                            <Picker style={styles.picker} selectedValue={faculty} onValueChange={val => {if(val != '-') setFaculty(val)}}> 
                                <Picker.Item label={"Seleziona una facoltà"} value="-" />
                                {faculties.map(fac => 
                                    <Picker.Item label={fac} value={fac} />
                                )}
                            </Picker>
                    </View>
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
                </ScrollView>
            </SafeAreaView>
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
    },
    pickerInput: {
        height: 40,
        marginHorizontal: 15,
        marginTop: 8,
        paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
        fontSize: 16,
        borderRadius: 30,
        fontFamily: 'Cardo-Bold'
    },
    picker: {
        paddingBottom: 40,
        height: 20
    }
});
