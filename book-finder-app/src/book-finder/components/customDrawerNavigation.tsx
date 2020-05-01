import React, { useContext } from 'react';
import { useNavigation } from "react-navigation-hooks";
import { SafeAreaView, ScrollView } from "react-navigation";
import { View, Image, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerItems } from "react-navigation-drawer";
import { UserContext } from '../consts/context';
import { shortenNameIfTooLong, logout } from "../utils/functions";

export default function CustomDrawerNavigation(props: any) {
    //@ts-ignore
    const [user] = useContext(UserContext);
    const navigation = useNavigation();
  
  
    const loggingOut = () => {
      logout();
      navigation.navigate('Login');
    }
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 250, backgroundColor: '#90001F', opacity: 0.9 }}>
          <View style={{ height: 225, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }} >
             <Image source={require('../assets/images/student-logo.png')} style={{ height: 150, width: 150, borderRadius: 60, marginTop: 30 , backgroundColor: '#fff' }} />
          </View>
          <View style={{ height: 25, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize: 20, marginBottom: 20, color: 'white'}}>{shortenNameIfTooLong(user.firstname + " " + user.lastname)}</Text>
          </View>
        </View>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
        <View style={{ alignItems: "center", bottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <Icon name="arrow-circle-o-right" size={30} onPress={() => loggingOut()} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }