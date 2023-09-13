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
  const [openings, setOpenings] = useState([]);
  let id = route.params.id
  let title = route.params.title
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);
  

  useEffect(() => {

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM persons WHERE id=' + id, 
        null,
        (txObj, resultSet) => setPerson(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    db.transaction(tx => {
      //tx.executeSql('SELECT * FROM phones WHERE person_id=' + id + ' ORDER BY pos ASC, name ASC',
      tx.executeSql('SELECT * FROM phones',
        null,
        (txObj, resultSet) => setPhones(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });


    db.transaction(tx => {
      //tx.executeSql('SELECT * FROM openings  WHERE person_id=' + id + ' ORDER BY pos ASC, name ASC',
      tx.executeSql('SELECT * FROM openings',
        null,
        (txObj, resultSet) => setOpenings(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    //alert(person)
    //alert(phones.length)
    //alert(openings.length)

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

  }

  //let id = route.params.id
  const search = (searchValue) => {
    onChangeSearchValue(searchValue)
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM phones WHERE person_id = ' + id + ' AND (name LIKE "%' + searchValue + '%" OR slug LIKE "%' + searchValue + '%") ORDER BY pos ASC, name ASC', null,
        (txObj, resultSet) => setPhones(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }

  // {showDetailsMainRow('Tel.:', person.phone, 'call-out')}
  const showDetailsMainRow = (title, data, type, icon) => {
    if (data != '' && data != 'null'){
      return (
        <View style={styles.mainRow}>
          <View style={styles.mainRowLabel}>
            <Text style={styles.mainLabel}>{title}</Text>
          </View>
          <View style={styles.mainRowData}>
            <Text style={styles.mainData}>{data}</Text>
          </View>
          <View style={styles.mainRowIcon}>
            <Icon type={type} name={icon} size={32} color='gray' />
          </View>
        </View>
      );
    }
  }

  const showDetails = () => {
    return person.map((person, index) => {
      return (
        <View style={styles.details} key={index}>
          <View style={styles.detailsTop}>
            <View style={styles.detailRow}>
              <Text style={styles.name}>{person.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.description}>{person.description}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.address}>{person.address}</Text>
            </View>
          </View>

          {showDetailsMainRow('Tel.:', person.phone, 'SimpleLineIcons', 'call-out')}
          {showDetailsMainRow('2. tel.:', person.phone2, 'SimpleLineIcons', 'call-out')}
          {showDetailsMainRow('Fax.:', person.fax, 'SimpleLineIcons', 'call-out')}
          {showDetailsMainRow('E-mail.:', person.email, 'Entypo', 'email')}

          {showOpenings()}
          {showPhones()}

        </View>
      );
    });
  }

  const showOpenings = () => {
    return openings.map((openings, index) => {
      alert(openings.open_from)
      alert(index)
      /*
      return (
        <View style={styles.mainRowLabel}>
          <Text style={styles.mainLabel}>asd: {phones.ext}</Text>
        </View>
      )
      */
    })
  }

  const showPhones = () => {
    return phones.map((phones, index) => {
      //alert(phones.phone)
      //alert(index)

      /*
      return (
        <View style={styles.mainRowLabel}>
          <Text style={styles.mainLabel}>asd: {phones.ext}</Text>
        </View>
      )
      */
    })
  }

/*
    return phones.map((phones, index) => {
      return (
        <View style={styles.mainRowLabel} key={index}>
          <Text style={styles.mainLabel}>{title}</Text>
        </View>
      )
    });
*/


/*
      return (
        <TouchableOpacity key={index} style={styles.row} onPress={() => alert(phones.name)}>
          <View style={styles.mainRow}>
            <View style={styles.mainRowLabel}>
              <Text style={styles.mainLabel}>{title}</Text>
            </View>
            <View style={styles.mainRowData}>
              <Text style={styles.mainData}>{data}</Text>
            </View>
            <View style={styles.mainRowIcon}>
              <Icon type={type} name={icon} size={32} color='gray' />
            </View>
          </View>
        </TouchableOpacity>
      );
      */


  return (
    <SafeAreaView style={styles.container}>      
      <View style={styles.searchRow}>
        <TextInput style={styles.input} placeholder='További telefonszám keresése...' onChangeText={(searchValue) => search(searchValue)} value={searchValue} />
        <View style={styles.searchicon}>
          <Text style={styles.searchicontext} onPress={() => search('')}>X</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.rowContainer}>
          {showDetails()}
        </View>
      </ScrollView>        
      
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    //marginBottom: 110,
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  subContainer: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
    searchRow: {
      flexGrow: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ccf',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      padding: 3,
      marginBottom: 5,
    },

    rowContainer: {
      flex: 1,
      marginBottom: 110,
      //padding: 10,
      margin: 3,
      //backgroundColor: 'red',
    },
    details: {
      //backgroundColor: 'red',
      //borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      //backgroundColor: 'red',
      padding: 5,
    },
    detailsTop: {
      marginBottom: 10,
    },
    detailRow: {
      flexGrow: 1,
      borderWidth: 0,
      //borderTopWidth: 1,
      //borderBottomWidth: 1,
      borderColor: '#acc',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      padding: 2,
      marginBottom: 0,
      //height: 60,
      //verticalAlign: 'middle',
    },
      name: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      description: {
        fontSize: 16,
        fontWeight: 'normal',
      },
      address: {
        fontSize: 14,
        fontWeight: 'bold',
      },

    mainRow: {
      flexGrow: 1,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderColor: '#acc',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      padding: 3,
      marginBottom: 10,
      height: 50,
      backgroundColor: '#f5f5f5',
      //paddingTop: 10,
      //verticalAlign: 'middle',
    },
      mainRowLabel: {
        paddingTop: 10,
        width: 65,
        borderWidth: 0,
      },
      mainRowData: {
        padding: 8,
        paddingTop: 10,
        //width: 70,
        //borderWidth: 1,
        flexGrow: 1,
      },
      mainRowIcon: {
        paddingLeft: 10,
        paddingTop: 5,
        width: 52,
        borderLeftWidth: 1,
        borderColor: '#ccc',
        borderWidth: 0,
      },
        mainLabel: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#888',
          paddingRight: 5,
          textAlign: 'right',
        },
        mainData: {
          fontSize: 16,
          fontWeight: 'bold',
          //color: 'red',
          textAlign: 'left',
        },

    row: {
      flexGrow: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#acc',
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      padding: 3,
      marginBottom: 5,
      //height: 60,
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


/*
        <View style={styles.subContainer} key={index}>

          <View style={styles.personBox}>
            <View style={styles.row}>
              <Text>{person.name}</Text>
            </View>
            <View style={styles.row}>
              <Text>{person.category_id}</Text>
            </View>
            <View style={styles.row}>
              <Text>{person.description}</Text>
            </View>
            <View style={styles.row}>
              <Text>{person.address}</Text>
            </View>

          </View>


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

*/
    /*
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
    */

    
/*
    <SafeAreaView style={styles.container}>
      <TextInput 
        placeholder='Keresés'
        style={styles.searchInput} 
        onChangeText={(searchValue) => search(searchValue)}
        value={searchValue}
      />      
      <ScrollView style={styles.scrollView}>
        {showDetails()}
      </ScrollView>
    </SafeAreaView>
*/