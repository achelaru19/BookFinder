import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Picker, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import firebaseSDK from '../actions/firebaseSDK';
import {addUser} from '../actions/firebaseDB';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import DatePicker from 'react-native-datepicker';
import { styles } from '../styles/singupStyle';
import { AppLoading } from 'expo';
import {universities, faculties} from '../consts/constants';
import { isSignupPageValid } from '../utils/inputFormatChecks';


export default function SignUp() {
    
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>("01-01-1995");
    const [university, setUniversity] = useState<string>('');
    const [faculty, setFaculty] = useState<string>('');
    const [fontLoaded, setFontLoaded] = useState<boolean>(false);
    const [buttonDisabled, disableButton] = useState<boolean>(true);

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

    useEffect(() => {
        const notAllCorrect = isSignupPageValid(email, firstname, lastname, password1, password2, birthdate, faculty, university);
        disableButton(!notAllCorrect);
    }, [email, firstname, lastname, password1, password2, birthdate, faculty, university]);
    
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
            <View style={styles.container}>
                <KeyboardAvoidingView
                behavior={"padding"}
                style={{flex:1}}
                >
                <SafeAreaView>
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
                                <Picker.Item label={"Seleziona una università"} value="-" key={'pickerItem--'} />
                                {universities.map((uni, index) => 
                                    <Picker.Item label={uni} value={uni} key={'pickerItem'+index} />
                                )}
                            </Picker>
                            </View>
                            <Text style={styles.label}>Facoltà:</Text>
                            <View style={styles.pickerInput}>
                                    <Picker style={styles.picker} selectedValue={faculty} onValueChange={val => {if(val != '-') setFaculty(val)}}> 
                                        <Picker.Item label={"Seleziona una facoltà"} value="-" key={'facultyPicker--'} />
                                        {faculties.map((fac, index) => 
                                            <Picker.Item label={fac} value={fac} key={'facultyPicker-'+index} />
                                        )}
                                    </Picker>
                            </View>
                            <View>
                            <Text style={styles.label}>Password:</Text>
                            <TextInput
                                style={styles.nameInput}
                                secureTextEntry={true}
                                onChangeText={value => setPassword1(value)}
                            />
                            </View>
                            <View>
                            <Text style={styles.label}>Verifica Password:</Text>
                            <TextInput
                                style={styles.nameInput}
                                secureTextEntry={true}
                                onChangeText={value => setPassword2(value)}
                            />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity disabled={buttonDisabled} onPress={onPressSignUp}>
                                    <Text style={styles.buttonText}>Registrati</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.signingOptions}>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.smallButtons}>Accedi con le tue credenziali</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        );
    }

}

SignUp.navigationOptions = ({ navigation }) => ({
    title: 'SignUp',
    drawerLabel: () => null
});

