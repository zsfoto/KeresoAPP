// https://github.com/michalchudziak/react-native-geolocation
// https://www.toptal.com/react-native/react-native-camera-tutorial

import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert, Text, Button, PermissionsAndroid } from 'react-native'
import * as Location from 'expo-location';


// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    //console.log('granted', granted);
    //console.log('granted', granted);
    if (granted === 'granted') {
      //console.log('You can use Geolocation');
      alert('You can use Geolocation');
      return true;
    } else {
      //console.log('You cannot use Geolocation');
      alert('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};



export default function Home({navigation, route}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Kezdőlap', // it can be a variable
    });
  }, []);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location !== null){

      }
      setLocation(location);
      
    })();
  }, [location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button title="Go to Details" onPress={() => navigation.navigate('Details', {id: 100})} />

      <Text></Text>
      <View>
        <Text>{text}</Text>
        <Text></Text>
        {/*
        <Text>Lat: {location.coords.latitude ? 'Hello' : 'Másik'}</Text>
        <Text>Long: {location.coords.longitude}</Text>
        <Text>Speed: {location.coords.speed}</Text>
        */}
      </View>
      <Text></Text>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
