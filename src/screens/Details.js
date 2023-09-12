import React, {useState, useEffect} from 'react';
import { StyleSheet, ActivityIndicator, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import * as SQLite from 'expo-sqlite'
import Icon from '../utils/VectorIcon'
import Color from '../utils/Colors'

const { width } = Dimensions.get('window');
const windowWidth = width;

export default function Details({navigation, route}) {
  const [db, setDb] = useState(SQLite.openDatabase('professions.db'));
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, onChangeSearchValue] = useState(true);
  const [person, setPerson] = useState([]);
  const [phones, setPhones] = useState([]);
  let id = route.params.id
  let title = route.params.title
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  const ShowPhones = () => {
    return phones.map((phones, index) => {
      return (
        <TouchableOpacity key={index} style={styles.row} onPress={() => alert(phones.name)}>
          <View>
            <Text>{phones.name}</Text>
            <Text>{phones.description}</Text>
            <Text>{phones.phone} / {phones.ext}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  const showPerson = () => {
    return person.map((person, index) => {
      return (
        <View style={styles.container} key={index}>

          <View style={styles.person}>
            <Text style={styles.title}>{person.name}</Text>
            <Text style={styles.description}>{person.description}</Text>

            <Text style={styles.text}>{person.phone}</Text>
            <Text style={styles.text}>{person.ext}</Text>
          </View>

          <View style={styles.rows}>
            <Text style={styles.subTitle}>További telefonszámok</Text>
            <ShowPhones />
          </View>
        </View>
      );
    });
  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM persons WHERE id=' + id, null,
        (txObj, resultSet) => setPerson(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM phones WHERE person_id=' + id + ' ORDER BY pos ASC, name ASC', null,
        (txObj, resultSet) => setPhones(resultSet.rows._array),
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

  //let id = route.params.id

  const search = (searchValue) => {
    onChangeSearchValue(searchValue)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM phones WHERE person_id = ' + id + ' AND name LIKE "%' + searchValue + '%" ORDER BY pos ASC, name ASC', null,
        (txObj, resultSet) => setPhones(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
        placeholder='Keresés'
        style={styles.searchInput} 
        onChangeText={(searchValue) => search(searchValue)}
        value={searchValue}
      />      
      <ScrollView>
        {showPerson()}
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

  person: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.vismeBg39,
    width: '100%',
    borderBottomWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 8,
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    margin: 8,
  },
  row: {
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'flex-start',
    padding: 8,
    width: '100%',
    height: 80,
    marginBottom: 0,
    borderTopWidth: 1,
    borderColor: Color.lightGray,
    backgroundColor: Color.white,
    width: windowWidth,
  },

    icon: {
      width: 50,
      height: 50,
      alignItems: 'center',
      borderWidth: 1,
      padding: 4,
      borderColor: Color.lightGray,
      marginRight: 8,
      borderRadius: 25,
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
