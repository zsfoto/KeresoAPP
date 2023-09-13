import React, { useCallback, useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import MyPushNotifications from './src/components/Notifications'
import * as SQLite from 'expo-sqlite'

import Icon from './src/utils/VectorIcon'
import Color from './src/utils/Colors'

import ScreenHome from './src/screens/Home'
import ScreenCategories from './src/screens/Categories'
import ScreenPersons from './src/screens/Persons'
import ScreenDetails from './src/screens/Details';
import ScreenInformations from './src/screens/Informations'
import ScreenSettings from './src/screens/Settings'

//import MyBarCodeScanner from './src/screens/MyBarCodeScanner'
//import QrGenerator from './src/screens/QRCodeGenerator'

const NavGroups = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Groups' component={ScreenCategories} />
      <Stack.Screen name='Persons' component={ScreenPersons} />
      <Stack.Screen name='Details' component={ScreenDetails} />
    </Stack.Navigator>
  )
}


/*

class CustomComponent extends Component {
  constructor() {
    super();
    // ----------------------------
    alert('Constructor Called. 3');
  }

  componentDidMount () {
    this.props.navigation.addListener('willFocus', (route) => { 
      alert('Changed')
    });
  } 

}
*/


// https://www.youtube.com/watch?v=tG6K4gxVZ4o
const Stack = createNativeStackNavigator()

export default function App() {
  const Tab = createBottomTabNavigator()
  const [db, setDb] = useState(SQLite.openDatabase('professions.db'));
  const [appIsReady, setAppIsReady] = useState(false);

/*
  db.transaction(tx => {
    tx.executeSql('DROP TABLE groups', 
      null,
      (txObj, resultSet) => {
        //Alert.alert('Dropped Groups 2x');
      },
      (txObj, error) => {
        //console.log(error);
        Alert.alert('Dropped ERROR: Groups');
      }
    );
  })
*/

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor='#14557B'/>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            paddingBottom: 4,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconType = 'Ionicons'
            let iconName = 'home'

            if (route.name === 'Kezdőlap') {
              iconType = 'Ionicons';
              iconName = focused ? 'home' : 'home-outline';
            }

            if (route.name === 'Csoportok') {
              iconType = 'MaterialCommunityIcons';
              iconName = focused ? 'search' : 'search';
            }

            if (route.name === 'Beállítások') {
              iconType = 'Ionicons';
              iconName = focused ? 'settings' : 'settings-outline';
            }

            if (route.name === 'Információ') {
              iconType = 'Ionicons';
              iconName = focused ? 'information-circle-sharp' : 'information-circle-outline';
            }

            if (route.name === 'Lista') {
              iconType = 'Ionicons';
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            }

            if (route.name === 'Olvasás') {
              iconType = 'Ionicons';
              iconName = focused ? 'reader' : 'reader-outline';
            }

            // You can return any component that you like here!
            //return <Icon type={iconType} name={iconName} size={32} color={iconColor} />;
            return <Icon type='Ionicons' name={iconName} size={size} color={color} />;

          },
          tabBarActiveTintColor: Color.vismeBgBlue39,
          tabBarInactiveTintColor: Color.lightGray,
        })}
      >

        <Tab.Screen name="Csoportok" component={NavGroups} />
        <Tab.Screen name="Információ" component={ScreenInformations} />
        <Tab.Screen name="Beállítások" component={ScreenSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
})
