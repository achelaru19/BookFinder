import React, { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { AppLoading } from 'expo';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import NavBar from "../components/navBar";
import { UserContext } from '../consts/context';
import { styles } from '../styles/settingsStyle';
import { updateUser } from '../actions/firebaseDB';
import {universities, faculties} from '../consts/constants';
import { UserType } from '../types/userType';
import { areSettingsValid } from '../utils/inputFormatChecks';


export default function Settings() {

  //@ts-ignore
  const [user] = useContext<UserType>(UserContext);
  const [firstname, setFirstname] = useState<string>(user.firstname);
  const [firstnamePlaceholder, setFirstnamePlaceholder] = useState<string>(firstname);
  const [lastname, setLastname] = useState<string>(user.lastname);
  const [lastnamePlaceholder, setLastnamePlaceholder] = useState<string>(lastname);
  const [birthdate, setBirthdate] = useState<string>(user.birthdate);
  const [birthdatePlaceholder, setBirthdayPlaceholder] = useState<string>(birthdate);
  const [email, setEmail] = useState<string>(user.email);
  const [university, setUniversity] = useState<string>(user.university);
  const [universityPlaceholder, setUniversityPlaceholder] = useState<string>(university);
  const [faculty, setFaculty] = useState<string>(user.faculty);
  const [facultyPlaceholder, setFacultyPlaceholder] = useState<string>(faculty);
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [modifyPressed, pressModify] = useState<boolean>(false);
  const [buttonDisabled, disableButton] = useState<boolean>(true);

  const saveSettings = () => {
    pressModify(false);
    setFirstname(firstnamePlaceholder);
    setLastname(lastnamePlaceholder);
    setBirthdate(birthdatePlaceholder);
    setUniversity(universityPlaceholder);
    setFaculty(facultyPlaceholder);
    updateUser(email, firstnamePlaceholder, lastnamePlaceholder, birthdatePlaceholder, universityPlaceholder, facultyPlaceholder);
  };

  useEffect(() => {
    const notAllCorrect = areSettingsValid(firstnamePlaceholder, lastnamePlaceholder, birthdatePlaceholder, universityPlaceholder, facultyPlaceholder);
    disableButton(!notAllCorrect);
  }, [firstnamePlaceholder, lastnamePlaceholder, birthdatePlaceholder, universityPlaceholder, facultyPlaceholder])

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
      <View style={{flex: 1}}>
        <NavBar title="Impostazioni" />
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>
          <View style={styles.box}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.information}>{email}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Nome </Text>
            {
            modifyPressed ?
              <TextInput style={styles.information} value={firstnamePlaceholder} onChangeText={text => setFirstnamePlaceholder(text)} />
            : <Text style={styles.information}>{firstname}</Text>
            }
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Cognome </Text>
            {
            modifyPressed ?
              <TextInput style={styles.information} value={lastnamePlaceholder} onChangeText={text => setLastnamePlaceholder(text)} />
            :
              <Text style={styles.information}>{lastname}</Text>
            }
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Data di nascita </Text>
            {
            modifyPressed ?
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
                onDateChange={(date) => {setBirthdayPlaceholder(date)}}
              />
            :
              <Text style={styles.information}>{birthdate}</Text>
            }
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Universit&agrave; </Text>
            {
            modifyPressed ?
              <View style={styles.pickerInput}>
                <Picker style={styles.picker} selectedValue={universityPlaceholder} onValueChange={val => {if(val != '-') setUniversityPlaceholder(val)}}>
                  <Picker.Item label={"Seleziona una università"} value="-" key={'setting-uni--'}/>
                  {universities.map((uni, index) => 
                      <Picker.Item label={uni} value={uni} key={'setting-uni-'+index} />
                  )}
                </Picker>
              </View>
            :
              <Text style={styles.information}>{university}</Text>
            }
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Facolt&agrave;  </Text>
            {
            modifyPressed ?
              <View style={styles.pickerInput}>
                <Picker style={styles.picker} selectedValue={facultyPlaceholder} onValueChange={val => {if(val != '-') setFacultyPlaceholder(val)}}> 
                  <Picker.Item label={"Seleziona una facoltà"} value="-" key={'settings-faculty--'} />
                  {faculties.map((fac, index) => 
                      <Picker.Item label={fac} value={fac} key={'settings-faculty-'+index}/>
                  )}
                </Picker>
              </View>
            :
              <Text style={styles.information}>{faculty}</Text>
            }
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            {
              modifyPressed ?
                <TouchableOpacity disabled={buttonDisabled} style={styles.buttonBox} onPress={() => saveSettings()}>
                  <Text style={{fontFamily: 'Cardo-Regular', color: 'white', fontSize: 20}}>Salva Modifiche</Text>
                </TouchableOpacity>
              :
                <TouchableOpacity style={styles.buttonBox} onPress={() => pressModify(true)}>
                  <Text style={{fontFamily: 'Cardo-Regular', color: 'white', fontSize: 20}}>Modifica Informazioni</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  }
  
}

  
Settings.navigationOptions = ({ navigation }) => ({
  drawerIcon: ({ tintColor }) => (
      <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
  )
});

