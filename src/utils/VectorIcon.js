import React from 'react'
import { View } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
//import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
//import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro'
//import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'

const VectorIcon = (props) => {
  const {name, size, color, type, onPress} = props;
  return (
    <View>
      {
      type === "AntDesign" ? (
        <AntDesign onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Entypo" ? (
        <Entypo onPress={onPress} name={name} size={size} color={color} />
      ) : type === "EvilIcons" ? (
        <EvilIcons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Feather" ? (
        <Feather onPress={onPress} name={name} size={size} color={color} />
      ) : type === "FontAwesome" ? (
        <FontAwesome onPress={onPress} name={name} size={size} color={color} />
      ) : type === "FontAwesome5" ? (
        <FontAwesome5 onPress={onPress} name={name} size={size} color={color} />
      ) : type === "FontAwesome6" ? (
        <FontAwesome6 onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Fontisto" ? (
        <Fontisto onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Foundation" ? (
        <Foundation onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Ionicons" ? (
        <Ionicons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "MaterialIcons" ? (
        <MaterialIcons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Octicons" ? (
        <Octicons onPress={onPress} name={name} size={size} color={color} />
      ) : type === "Zocial" ? (
        <Zocial onPress={onPress} name={name} size={size} color={color} />
      ) : type === "SimpleLineIcons" ? (
        <SimpleLineIcons onPress={onPress} name={name} size={size} color={color} />
      ) : ("X")
      }
    </View>
  )
}

export default VectorIcon