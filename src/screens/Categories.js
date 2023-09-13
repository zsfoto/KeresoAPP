import React, {useState, useEffect} from 'react';
import { StyleSheet, ActivityIndicator, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import * as SQLite from 'expo-sqlite'
import Icon from '../utils/VectorIcon'
//import * as SplashScreen from 'expo-splash-screen';
//import Color from '../utils/Colors'
//import Details from './Details'

const { width } = Dimensions.get('window');
const windowWidth = width;

export default function Categories({navigation, route}) {
  const [db, setDb] = useState(SQLite.openDatabase('professions.db'));
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchValue, onChangeSearchValue] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Főcsoportok',
    });
  }, []);
  
  const search = (searchValue) => {
    onChangeSearchValue(searchValue)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM categories WHERE name LIKE "%' + searchValue + '%" OR slug LIKE "%' + searchValue + '%" ORDER BY slug ASC', null,
        (txObj, resultSet) => setCategories(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }

  const showCategories = () => {
    return categories.map((categories, index) => {
      return (
        <TouchableOpacity key={index} style={styles.row} onPress={() => navigation.navigate('Persons', {id: categories.id, title: categories.name})}>
          <View style={styles.icon}>
            <Icon type={categories.iconType} name={categories.icon} size={32} color='gray' />
          </View>
          <View style={styles.text}>
            <Text style={styles.textTitle}>{categories.name}</Text>
            <Text style={styles.textSubTitle}>{categories.description}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }  

  // 

  useEffect(() => {
    onChangeSearchValue('')
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM categories ORDER BY slug ASC', null,
        (txObj, resultSet) => setCategories(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [db]);

  if (isLoading) {
    //<Text>Loading categories...</Text>
    // Keep the splash screen visible while we fetch resources
    //SplashScreen.preventAutoHideAsync()
    //SplashScreen.hideAsync

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )

  }


  return (
    <SafeAreaView style={styles.container}>      
      
      <View style={styles.searchRow}>
        <TextInput style={styles.input} 
          placeholder='Keresés...' 
          onChangeText={(searchValue) => search(searchValue)}
          value={searchValue}
        />
        <View style={styles.searchicon}>
          <Text style={styles.searchicontext} onPress={() => search('')}>X</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {showCategories()}     
      </ScrollView>        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ccc',
  },
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 110,
    flexDirection: 'row',
    backgroundColor: '#aaa',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
    searchRow: {
      flexGrow: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      padding: 3,
      marginBottom: 5,
    },
    row: {
      flexGrow: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      padding: 3,
      marginBottom: 5,
      height: 60,
      //verticalAlign: 'middle',
    },

      input: {
        backgroundColor: '#fff',
        height: 26,
        padding: 0,
        paddingLeft: 7,
        paddingTop: 0,
        fontSize: 18,
        flexGrow: 1,
      },
      searchicon: {
        width: 40,        
      },
      searchicontext: {
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: '#eee',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },

      icon: {
        borderWidth: 0,
        backgroundColor: 'white',
        padding: 3,
        alignItems: 'center',
        //justifyContent: 'flex-start',
        justifyContent: 'center',
        width: 40,
        height: 40,
      },
      text: {
        marginLeft: 0,
        marginTop: 0,
        borderWidth: 0,
        backgroundColor: 'white',
        flexGrow: 1,
        padding: 5,
        paddingTop: 1,
        paddingLeft: 1,
      },
      textTitle: {
        marginLeft: 7,
        borderWidth: 0,
        backgroundColor: 'white',
        //flexGrow: 1,
        padding: 2,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: 'bold',
        marginBottom: 0,
        //fontSize: 16,
        fontSize: 20,
      },
      textSubTitle: {
        marginLeft: 5,
        borderWidth: 0,
        backgroundColor: 'white',
        //flexGrow: 1,
        padding: 5,
        paddingTop: 0,
        marginTop: 0,
      }

});
