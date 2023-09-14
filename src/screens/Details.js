import React, {useState, useEffect} from 'react';
import { StyleSheet, ActivityIndicator, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Linking } from 'react-native'
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
      tx.executeSql('SELECT * FROM phones WHERE person_id=' + id + ' ORDER BY pos ASC, name ASC',
      //tx.executeSql('SELECT * FROM phones',
        null,
        (txObj, resultSet) => setPhones(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM openings  WHERE person_id=' + id + ' ORDER BY pos ASC, name ASC',
      //tx.executeSql('SELECT * FROM openings',
        null,
        (txObj, resultSet) => setOpenings(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    //console.log('id', id)
    //console.log(person.length)
    //console.log(phones.length)
    //console.log(openings.length)

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
      tx.executeSql('SELECT * FROM phones WHERE person_id = ' + id + ' AND (name LIKE "%' + searchValue + '%" OR description LIKE "%' + searchValue + '%" OR slug LIKE "%' + searchValue + '%") ORDER BY pos ASC, name ASC', null,
        (txObj, resultSet) => setPhones(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }

  const showCallIcon = (type, data, ext) => {
    let iconType = 'SimpleLineIcons'
    let icon = 'call-out'

    if (type == 'phone'){
      let phoneNumber = data
      if(String(ext) != '' && String(ext) != 'null' && String(ext) != 'undefined'){
        phoneNumber = data + ',' + ext
      }
      return (
        <TouchableOpacity style={styles.mainRowIcon} onPress={()=>{Linking.openURL('tel:' + phoneNumber)}}>
          <Icon type={iconType} name={icon} size={32} color='gray' />
        </TouchableOpacity>
      )
    }

    if (type == 'email'){
      iconType = 'Entypo'
      icon = 'email'  
      return ''
      /*
      return (
        <TouchableOpacity style={styles.mainRowIcon} onPress={()=>{Linking.openURL('mailto:' + data)}}>
          <Icon type={iconType} name={icon} size={32} color='gray' />
        </TouchableOpacity>
      )
      */
    }

  }


  // {showDetailsMainRow('Tel.:', person.phone, 'call-out')}
  //
  const showDetailsMainRow = (title, data, ext, type) => {
    //if (String(data) != '' && String(data) != 'null' && String(data) != 'undefined'){
    if (type == 'phone' && String(data) != '' && String(data) != 'null' && String(data) != 'undefined'){
      return (
        <View style={styles.mainRow}>
          <View style={styles.mainRowLabel}>
            <Text style={styles.mainLabel}>{title}</Text>
          </View>
          <View style={styles.mainRowData}>
            <Text style={styles.mainData}>{data}{showPhoneExt(ext)}</Text>
          </View>
          {showCallIcon(type, data)}
        </View>
      );
    }
    if (type == 'email' && String(data) != '' && String(data) != 'null' && String(data) != 'undefined'){
      return (
        <View style={styles.mainRow}>
          <View style={styles.mainRowLabel}>
            <Text style={styles.mainLabel}>{title}</Text>
          </View>
          <View style={styles.mainRowData}>            
            <Text style={styles.mainDataEmail}>{data}</Text>
          </View>
          {showCallIcon(type, data)}
        </View>
      );
    }

    /*
    if (type == 'email' && String(data) != '' && String(data) != 'null' && String(data) != 'undefined' && data.length > 20){
      return (
        <View style={styles.mainRow}>
          <View style={styles.mainRowData}>            
            <Text style={styles.mainLabel}>{title}</Text>
          </View>
          <View style={styles.mainRowData}>            
            <Text style={styles.mainDataEmail}>{data}</Text>
          </View>
          {showCallIcon(type, data)}
        </View>
      );
    }
    */
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

          {showDetailsMainRow('Tel.:', person.phone, person.ext, 'phone')}
          {showDetailsMainRow('2. tel.:', person.phone2, person.ext2, 'phone')}
          {showDetailsMainRow('Fax.:', person.fax, person.extFax, 'phone')}
          {showDetailsMainRow('E-mail.:', person.email, '', 'email')}

          {showOpenings()}
          
          <View style={styles.detailsTop}>
            {showPhones()}
          </View>

        </View>
      );
    });
  }

  // ============================= OPENINGS ============================
  const showOpenings = () => {
    if (openings.length > 0){
      return (
        <View style={styles.openingsContainer}>
          <Text style={styles.openingsTitle}>Nyitvatartási idő(k):</Text>
          {showOpeningItems()}
        </View>
      )  
    }
  }

  const showOpeningItems = () => {
    return openings.map((openings, index) => {
      return (
          <View style={styles.openingRow} key={index}>
            <View style={styles.openingName}>
            <Text style={styles.openingTextName}>{openings.name}</Text>
            </View>
            <View style={styles.openingFrom}>
              <Text style={styles.openingTextFrom}>{openings.hour_from}</Text>
            </View>
            <View style={styles.openingTo}>
              <Text style={styles.openingTextTo}>{openings.hour_to}</Text>
            </View>
            {showOpeningComment(openings.comment)}
          </View>
      )
    })
  }

  const showOpeningComment = (comment) => {
    return(
      <View style={styles.openingRow}>
        <View style={styles.openingComment}>
          <Text style={styles.openingTextComment}>{comment}</Text>
        </View>
      </View>
    )
  }


  // ============================= PHONES ============================
  const showPhones = () => {
    if (phones.length > 0){
      return (
        <View style={styles.phonesContainer}>
          <Text style={styles.phonesTitle}>További telefonszámok:</Text>
          {showPhoneItems()}
        </View>
      )  
    }
  }

  const showPhoneExt = (ext) => {
    if(String(ext) != '' && String(ext) != 'null' && String(ext) != 'undefined'){
      return (
        <Text> / {ext}</Text>
      )
    }
  }

  const showPhoneItems = () => {
    let cUrl = ''
    let callIconType = ''
    let callIcon = ''

    return phones.map((phones, index) => {
      callIconType = 'SimpleLineIcons'
      callIcon = 'call-out'    
  
      /*
      if (phones.email != ''){
        callIconType = 'Entypo'
        callIcon = 'email'
        cUrl = 'mailto:' + phones.email
      }
      */
  
      let phoneNumber = phones.phone
      if(String(phones.ext) != '' && String(phones.ext) != 'null' && String(phones.ext) != 'undefined'){
        phoneNumber = phones.phone + ',' + phones.ext
      }

      //cUrl = 'tel:' + phoneNumber
      //console.log(cUrl)

      return (
        <View style={styles.phoneRow} key={index}>
          <View style={styles.phoneName} >
            <Text style={styles.phoneTextName}>{phones.name}</Text>
            <Text style={styles.phoneTextDescription}>{phones.description}</Text>
            <Text style={styles.phoneTextPhone}>{phones.phone}{showPhoneExt(phones.ext)}</Text>
          </View>
          <TouchableOpacity key={index} style={styles.phoneCallIcon} onPress={() => {Linking.openURL('tel:' + phoneNumber)}}>
            <Icon type={callIconType} name={callIcon} size={36} color='gray' />
          </TouchableOpacity>
        </View>
      )
    })
  }

  const searchInput = () => {
    if (phones.length > 0){
      return (
        <View style={styles.searchRow}>
          <TextInput style={styles.input} placeholder='További telefonszám keresése...' onChangeText={(searchValue) => search(searchValue)} value={searchValue} />
          <View style={styles.searchicon}>
            <Text style={styles.searchicontext} onPress={() => search('')}>X</Text>
          </View>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      {searchInput()}

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
        mainDataEmail: {
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
      },

      openingsContainer: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'flex-start',
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        //flexWrap: 'wrap',
    
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
      },
        openingsTitle: {
          padding: 3,
          paddingLeft: 7,
          fontSize: 14,
          fontWeight: 'bold',
        },
        openingRow: {
          flex: 1,
          flexDirection: 'row',
          //flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          backgroundColor: 'white',          
          borderWidth: 0,
          //backgroundColor: 'green',
        },
          openingName: {
            flex: 1,
            paddingTop: 5,
            padding: 7,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          },
            openingTextName: {
              textAlign: 'right',
            },
          openingFrom: {
            flex: 1,
            paddingTop: 5,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          },
            openingTextFrom: {
              textAlign: 'center',
            },
          openingTo: {
            flex: 1,
            paddingTop: 5,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: 'lightgray',

          },
            openingTextTo: {
              textAlign: 'center',
            },
          openingRowComment: {

          },
          openingComment: {
            flex: 1,
            paddingTop: 5,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          },
            openingTextComment: {
              borderWidth: 0,
              borderColor: '#ccc'
            },

      phonesContainer: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'flex-start',
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        //flexWrap: 'wrap',
    
        borderWidth: 1,
        borderColor: '#ccc',
        //backgroundColor: '#ccc',
      },
      phonesMainTitle: {
        backgroundColor: '#ccc',
      },
      phonesTitle: {
        padding: 3,
        paddingLeft: 7,
        fontSize: 14,
        fontWeight: 'bold',
      },
      phoneRow: {
          flex: 1,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: '#ccc',
          backgroundColor: '#fff',
          height: 90,
          padding: 7,
          marginBottom: 5,
        },
          phoneName: {
            flex: 1,
            flexGrow: 1,
            paddingRight: 5,
          },
          phoneTextName: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          phoneTextPhone: {
            fontWeight: 'bold',
          },
          phoneTextDescription: {
            fontWeight: 'normal',
          },
          phoneCallIcon: {
            width: 60,
            height: 60,
            borderWidth: 1,
            borderColor: '#eee',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            marginTop: 5,
          },




});
