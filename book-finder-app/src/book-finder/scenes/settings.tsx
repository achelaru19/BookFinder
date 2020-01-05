import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { AppLoading } from 'expo';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import NavBar from "../components/navBar";
import { useNavigation } from 'react-navigation-hooks';

export default function Settings() {
  const [id, setID] = useState(3);
  const [username, setUsername] = useState("angel.chelaru");
  const [firstname, setFirstname] = useState("Angel");
  const [firstnamePlaceholder, setFirstnamePlaceholder] = useState(firstname);
  const [lastname, setLastname] = useState("Chelaru");
  const [lastnamePlaceholder, setLastnamePlaceholde] = useState(lastname);
  const [birthdate, setBirthdate] = useState("1996-02-19");
  const [birthdatePlaceholder, setBirthdayPlaceholder] = useState(birthdate);
  const [email, setEmail] = useState("angel.chelaru@gmail.com");
  const [emailPlaceholder, setEmailPlaceholder] = useState(email);
  const [university, setUniversity] = useState("Politecnico di Milano");
  const [universityPlaceholder, setUniversityPlaceholder] = useState(university);
  const [faculty, setFaculty] = useState("Computer Science and Engineering");
  const [facultyPlaceholder, setFacultyPlaceholder] = useState(faculty);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modifyPressed, pressModify] = useState(false);

  useEffect(() => {

  }, []);

  
  const saveSettings = () => {
    pressModify(false);
    setFirstname(firstnamePlaceholder);
    setLastname(lastnamePlaceholder);
    setEmail(emailPlaceholder);
    setBirthdate(birthdatePlaceholder);
    setUniversity(universityPlaceholder);
    setFaculty(facultyPlaceholder);
    console.log("modificate impostazioni");
  };

  const navigation = useNavigation();

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
      <View style={{flex: 1}}>
        <NavBar title="Impostazioni" />
        <View style={{flex: 9, flexDirection: 'column', alignItems: 'stretch'}}>
          <View style={styles.box}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.information}>{username}</Text>
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
              <TextInput style={styles.information} value={lastnamePlaceholder} />
            :
              <Text style={styles.information}>{lastname}</Text>
            }
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Email </Text>
            {
            modifyPressed ?
              <TextInput style={styles.information} value={emailPlaceholder} />
            :
              <Text style={styles.information}>{email}</Text>
            }
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Data di nascita </Text>
            {
            modifyPressed ?
              <DatePicker
                style={{width: 200}}
                date={birthdatePlaceholder} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Imposta data di nascita"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2019-01-01"
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
              <TextInput style={styles.information} value={universityPlaceholder} />
            :
              <Text style={styles.information}>{university}</Text>
            }
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Facolt&agrave;  </Text>
            {
            modifyPressed ?
              <TextInput style={styles.information} value={facultyPlaceholder} />
            :
              <Text style={styles.information}>{faculty}</Text>
            }
          </View>
          <View style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableOpacity style={styles.buttonBox} onPress={() => navigation.navigate("ChangePassword")}>
              <Text style={{fontFamily: 'Cardo-Regular', color: 'white', fontSize: 20}}>Cambia Password</Text>
            </TouchableOpacity>
            {
              modifyPressed ?
                <TouchableOpacity style={styles.buttonBox} onPress={() => saveSettings()}>
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

  
Settings.navigationOptions = ({ navigation }) => ({
  drawerIcon: ({ tintColor }) => (
      <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderColor: 'black',
    paddingLeft: 10,
    fontFamily: ''
  },
  label: {
    color: '#a9a9a9',
    fontFamily: 'Cardo-Regular',
    fontSize: 15
    
  },
  information: {
    fontSize: 18,
    fontFamily: 'Cardo-Bold'
  },
  buttonBox: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#90001F',
    color: 'white',
    width: 280,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
