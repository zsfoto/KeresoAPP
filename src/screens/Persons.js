import React, {useState, useEffect} from 'react';
import { StyleSheet, ActivityIndicator, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import * as SQLite from 'expo-sqlite'
import Icon from '../utils/VectorIcon'
import Color from '../utils/Colors'

import Details from '../screens/Details'

const { width } = Dimensions.get('window');
const windowWidth = width;

export default function Groups({navigation, route}) {
  const [db, setDb] = useState(SQLite.openDatabase('professions.db'));
  const [isLoading, setIsLoading] = useState(true);
  const [persons, setPersons] = useState([]);
  const [searchValue, onChangeSearchValue] = useState('');
  let group_id = route.params.id
  let title = route.params.title

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);
  
  const showGroups = () => {
    return persons.map((persons, index) => {
      return (
        <TouchableOpacity key={index} style={styles.row} onPress={() => navigation.navigate('Details', {id: persons.id, title: persons.name })}>
          <View style={styles.icon}>
            <Icon type={persons.iconType} name={persons.icon} size={32} color='gray' />
          </View>
          <View style={styles.text}>
            <Text style={styles.name}>{persons.name}</Text>
            <Text style={styles.description}>{persons.description}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }  

  useEffect(() => {
    onChangeSearchValue('')
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM persons WHERE group_id=' + group_id + ' ORDER BY slug ASC', null,
        (txObj, resultSet) => setPersons(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [db]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loading}>
          <Text>Loading persons...</Text>
        </View>
      </View>
    )
    /*
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
    */
  }



  const search = (searchValue) => {
    onChangeSearchValue(searchValue)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM persons WHERE group_id = ' + group_id + ' AND name LIKE "%' + searchValue + '%" ORDER BY slug ASC', null,
        (txObj, resultSet) => setPersons(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }

  //  <TextInput placeholder='Keresés' style={styles.searchInput} />
  
  //let id = route.params.id

  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
        placeholder='Keresés'
        style={styles.searchInput} 
        onChangeText={(searchValue) => search(searchValue)}
        value={searchValue}
      />

      <ScrollView>
        {showGroups()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:  24,
    paddingTop: 4,
    paddingBottom: 60,
    backgroundColor: Color.white,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  row: {
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'flex-start',
    padding: 8,
    width: '100%',
    height: 70,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderColor: Color.lightGray,
    backgroundColor: Color.white,
    width: windowWidth,
  },

    icon: {
      width: 50,
      height: 50,
      alignItems: 'center',
      //borderWidth: 1,
      //borderRadius: 25,
      //borderColor: Color.lightGray,
      padding: 4,
      borderColor: Color.lightGray,
      marginRight: 8,
    },
    text: {
      width: windowWidth - 70,
      backgroundColor: Color.white,
    },


  /*
    icon: {
      flex: 1,
      width: 50,
      height: 50,
      marginRight: 8,
      borderWidth: 1,
      borderColor: Color.lightGray,
      padding: 8,
      alignItems: 'center',
      backgroundColor: Color.vismeBgLightGray39,
    },
    texts: {
      flex: 1,
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      borderWidth: 0,
      borderColor: Color.lightGray,
      backgroundColor: Color.white,
      padding: 4,
      marginLeft: 4,
    },
*/

      name: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      description: {

      },

  searchInput: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.gray,
    width: '100%',
    paddingTop: 0,
    padding: 2,
    paddingHorizontal: 8,
    marginBottom: 4,
    backgroundColor: Color.white,
    color: Color.black,
  },
  
});
