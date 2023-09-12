import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function Details({navigation, route}) {
  let id = route.params.id

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Részletek', // it can be a variable
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
    <Text>Your expo push token: {expoPushToken}</Text>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Title: {notification && notification.request.content.title} </Text>
      <Text>Body: {notification && notification.request.content.body}</Text>
      <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    </View>
    <Button
      title="Press to schedule a notification"
      onPress={async () => {
        await schedulePushNotification();
      }}
    />
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

