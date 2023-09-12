// https://www.npmjs.com/package/react-native-qrcode-svg
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeGenerator() {
  
  return (
    <View style={styles.container}>
      <QRCode
        value="Varga Zsolt"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
