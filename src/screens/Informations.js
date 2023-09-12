import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import * as Application from 'expo-application'

import Icon from '../utils/VectorIcon'
import Color from '../utils/Colors'


export default function Informations() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Informations screen!</Text>
        
        <Text style={styles.text}>{Application.androidId}</Text>
        <Text style={styles.text}>{Application.applicationId}</Text>
        <Text style={styles.text}>{Application.applicationName}</Text>
        <Text style={styles.text}>{Application.nativeApplicationVersion}</Text>
        <Text style={styles.text}>{Application.nativeBuildVersion}</Text>
        <Text style={styles.text}>----------------------------------</Text>
        <Text style={styles.text}>{Constants.appOwnership}</Text>
        <Text style={styles.text}>{Constants.debugMode ? 'Debug' : 'App'}</Text>
        <Text style={styles.text}>{Constants.deviceName}</Text>
        <Text style={styles.text}>{Constants.executionEnvironment}</Text>
        <Text style={styles.text}>{Constants.experienceUrl}</Text>
        <Text style={styles.text}>{Constants.expoVersion}</Text>
        <Text style={styles.text}>{Constants.intentUri}</Text>
        <Text style={styles.text}>{Constants.isDetached}</Text>
        <Text style={styles.text}>{Constants.isHeadless}</Text>
        <Text style={styles.text}>{Constants.linkingUri}</Text>
        <Text style={styles.text}>{Constants.nativeAppVersion}</Text>
        <Text style={styles.text}>{Constants.nativeBuildVersion}</Text>
        <Text style={styles.text}>{Constants.sessionId}</Text>
        <Text style={styles.text}>{Constants.statusBarHeight}</Text>
        <Text style={styles.text}>{Constants.systemFonts}</Text>
        <Text style={styles.text}>{Constants.systemVersion}</Text>
        <Text style={styles.text}>{Constants.android ? 'Android' : 'Other'}</Text>
        <Text style={styles.text}>{Constants.developer}</Text>
        <Text style={styles.text}>{Constants.scopeKey}</Text>
        <Text style={styles.text}>{Constants.Bare}</Text>
        <Text style={styles.text}>-----------------------------</Text>
        <Text style={styles.text}>{Device.brand}</Text>
        <Text style={styles.text}>{Device.designName}</Text>
        <Text style={styles.text}>{Device.deviceName}</Text>
        <Text style={styles.text}>{Device.deviceType}</Text>
        <Text style={styles.text}>{Device.deviceYearClass}</Text>
        <Text style={styles.text}>{Device.isDevice}</Text>
        <Text style={styles.text}>{Device.manufacturer}</Text>
        <Text style={styles.text}>{Device.modelId}</Text>
        <Text style={styles.text}>{Device.modelName}</Text>
        <Text style={styles.text}>{Device.osBuildFingerprint}</Text>
        <Text style={styles.text}>{Device.osBuildId}</Text>
        <Text style={styles.text}>{Device.osInternalBuildId}</Text>
        <Text style={styles.text}>{Device.osName}</Text>
        <Text style={styles.text}>{Device.osVersion}</Text>
        <Text style={styles.text}>{Device.platformApiLevel}</Text>
        <Text style={styles.text}>{Device.productName}</Text>
        <Text style={styles.text}>{Device.totalMemory}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  scrollView: {
    backgroundColor: '#f0f0f0',
    marginHorizontal: 0,
    padding: 8,
  },
  text: {
    fontSize: 14,
  },
});