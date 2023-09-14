import React, {useState} from 'react';
import { StyleSheet, View, Button, Text, Alert } from 'react-native'
import * as SQLite from 'expo-sqlite'
import axios from 'axios';

const apiURL = 'https://kereso.vzsfoto.hu/api/finders/sync/2023-08-01.json'

export default function Settings() {
  const [db, setDb] = useState(SQLite.openDatabase('professions.db'));

  const syscAll = async () => {
    dropShema()
    createShema()
    syncWithTheApiServer()
  }


  const syncWithTheApiServer = async () => {
    //-----------------------------------------------------------
    //Alert.alert(baseApiUrlCategories + '2023-08-15/asdf')

    axios({
      method: 'get',
      url: apiURL
    }).then((response) => {


      // ------------------ CATEGORIES ----------------------
      let categories = response.data.datas.categories

      for (var i = 0; i < response.data.datas.categories.length; i++) {
        let id = categories[i].id
        let user_id = categories[i].user_id
        let name = categories[i].name
        let description = categories[i].description
        let slug = categories[i].slug
        let keywords = categories[i].keywords
        let iconType = categories[i].iconType
        let icon = categories[i].icon
        let pos = categories[i].pos
        let action = categories[i].action
        let created = categories[i].created
        let modified = categories[i].modified

        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO categories (id, user_id, name, description, slug, keywords, iconType, icon, pos, action, created, modified) VALUES ('+id+', "' + user_id + '", "'+name+'", "'+description+'", "'+slug+'", "'+keywords+'", "'+iconType+'", "'+icon+'", '+pos+', "'+action+'", "'+created+'", "'+modified+'" )'
          ),
          null,
          (txObj, resultSet) => {
            //Alert.alert('INSERTED: ' + name);
          },
          (txObj, error) => {
            //Alert.alert('ERROR: INSERT: ' + name);
          }
        });

      } // for()

      // ------------------ PERSONS ----------------------
      let persons = response.data.datas.persons

      for (var i = 0; i < response.data.datas.persons.length; i++) {
        let id = persons[i].id
        let user_id = persons[i].user_id
        let category_id = persons[i].category_id
        let city_id = persons[i].city_id
        let name = persons[i].name
        let description = persons[i].description
        let phone = persons[i].phone
        let ext = persons[i].ext
        let phone2 = persons[i].phone2
        let ext2 = persons[i].ext2
        let fax = persons[i].fax
        let ext_fax = persons[i].ext_fax
        let email = persons[i].email
        let website = persons[i].website
        let address = persons[i].address
        let more = persons[i].more
        let slug = persons[i].slug
        let keywords = persons[i].keywords
        let iconType = persons[i].iconType
        let icon = persons[i].icon
        let longitude = persons[i].longitude
        let latitude = persons[i].latitude
        let pos = persons[i].pos
        let visible = persons[i].visible ? 1 : 0
        let action = persons[i].action
        let created = persons[i].created
        let modified = persons[i].modified

        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO persons (id, user_id, category_id, city_id, name, description, phone, ext, phone2, ext2, fax, ext_fax, email, website, address, more, slug, keywords, iconType, icon, longitude, latitude, pos, visible, action, created, modified) VALUES ('+id+', "' + user_id + '", '+category_id+', '+city_id+', "'+name+'", "'+description+'", "'+phone+'", "'+ext+'", "'+phone2+'", "'+ext2+'", "'+fax+'", "'+ext_fax+'", "'+email+'", "'+website+'", "'+address+'", "'+more+'", "'+slug+'", "'+keywords+'", "'+iconType+'", "'+icon+'", "'+longitude+'", "'+latitude+'", '+pos+', '+visible+', "'+action+'", "'+created+'", "'+modified+'")'
          ),
          null,
          (txObj, resultSet) => {
            //Alert.alert('INSERTED: ' + name);
          },
          (txObj, error) => {
            //Alert.alert('ERROR: INSERT: ' + name);
          }
        });

      } // for()


      // ------------------ PHONES ----------------------
      let phones = response.data.datas.phones

      for (var i = 0; i < response.data.datas.phones.length; i++) {
        let id = phones[i].id
        let user_id = phones[i].user_id
        let person_id = phones[i].person_id
        let name = phones[i].name
        let description = phones[i].description
        let phone = phones[i].phone
        let ext = phones[i].ext
        let email = phones[i].email
        let slug = phones[i].slug
        let iconType = phones[i].iconType
        let icon = phones[i].icon
        let pos = phones[i].pos
        let visible = phones[i].visible ? 1 : 0
        let action = phones[i].action
        let created = phones[i].created
        let modified = phones[i].modified

        //console.log(name)
        //let sql = 'INSERT INTO phones (id, user_id, person_id, name, description, phone, ext, email, slug, iconType, icon, pos, visible, action, created, modified) VALUES ('+id+', "'+user_id+'", '+person_id+', "'+name+'", "'+description+'", "'+phone+'", "'+ext+'", "'+email+'", "'+slug+'", "'+iconType+'", "'+icon+'", '+pos+', '+visible+', "'+action+'", "'+created+'", "'+modified+'")'
        //console.log(sql)

        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO phones (id, user_id, person_id, name, description, phone, ext, email, slug, iconType, icon, pos, visible, action, created, modified) VALUES ('+id+', "'+user_id+'", '+person_id+', "'+name+'", "'+description+'", "'+phone+'", "'+ext+'", "'+email+'", "'+slug+'", "'+iconType+'", "'+icon+'", '+pos+', '+visible+', "'+action+'", "'+created+'", "'+modified+'")'
          ),
          null,
          (txObj, resultSet) => {
            Alert.alert('PH. INSERTED: ' + name);
          },
          (txObj, error) => {
            Alert.alert('PH. INSERT ERROR: ' + name);
          }
        });

      } // for()


      // ------------------ PERSONS ----------------------
      let openings = response.data.datas.openings

      for (var i = 0; i < response.data.datas.openings.length; i++) {
        let id = openings[i].id
        let user_id = openings[i].user_id
        let person_id = openings[i].person_id
        let name = openings[i].name
        let hour_from = openings[i].hour_from
        let hour_to = openings[i].hour_to
        let comment = openings[i].comment
        let pos = openings[i].pos
        let visible = openings[i].visible ? 1 : 0
        let action = openings[i].action
        let created = openings[i].created
        let modified = openings[i].modified

        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO openings (id, user_id, person_id, name, hour_from, hour_to, comment, pos, visible, action, created, modified) VALUES ('+id+', "'+user_id+'", '+person_id+', "'+name+'", "'+hour_from+'", "'+hour_to+'", "'+comment+'", '+pos+', '+visible+', "'+action+'", "'+created+'", "'+modified+'")'
          ),
          null,
          (txObj, resultSet) => {
            //Alert.alert('INSERTED: ' + name);
          },
          (txObj, error) => {
            //Alert.alert('ERROR: INSERT: ' + name);
          }
        });

      } // for()
      


    })

  }

  const createShema = () => {
    /*
      db.transaction(tx => {
        tx.executeSql('DROP TABLE categories')
      });
    */

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER NOT NULL UNIQUE, user_id TEXT NOT NULL, name TEXT NOT NULL, description TEXT, slug TEXT, keywords TEXT, iconType TEXT DEFAULT "MaterialCommunityIcons", icon TEXT DEFAULT "sitemap-outline", pos INTEGER DEFAULT 1000, action TEXT, created TEXT, modified TEXT)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED: TABLE categories');
        },
        (txObj, error) => {
          //Alert.alert('ERROR: CREATE TABLE categories');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS persons (id INTEGER NOT NULL UNIQUE, user_id TEXT NOT NULL, category_id INTEGER, city_id INTEGER, name TEXT NOT NULL,  description TEXT, phone TEXT, ext TEXT, phone2 TEXT, ext2 TEXT, fax TEXT, ext_fax TEXT, email TEXT, website TEXT, address TEXT, more TEXT, slug TEXT, keywords TEXT, iconType TEXT DEFAULT "MaterialCommunityIcons",  icon TEXT DEFAULT "sitemap-outline",  longitude TEXT, latitude TEXT, pos INTEGER, visible INTEGER, action  TEXT, created TEXT, modified TEXT)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED: TABLE categories');
        },
        (txObj, error) => {
          //Alert.alert('ERROR: CREATE TABLE categories');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS phones (id INTEGER NOT NULL UNIQUE, user_id TEXT NOT NULL, person_id INTEGER, name TEXT, description TEXT, phone TEXT, ext TEXT, email TEXT, slug TEXT, iconType TEXT DEFAULT "MaterialCommunityIcons", icon TEXT DEFAULT "sitemap-outline", pos INTEGER, visible INTEGER, action TEXT, created TEXT, modified TEXT)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED: TABLE phones');
        },
        (txObj, error) => {
          //Alert.alert('ERROR: CREATE TABLE phones');
        }
      );

    });

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS openings (id INTEGER NOT NULL UNIQUE, user_id TEXT NOT NULL, person_id INTEGER, name TEXT, hour_from TEXT, hour_to TEXT, comment TEXT, pos INTEGER, visible INTEGER, action TEXT, created TEXT, modified TEXT)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED: TABLE openings');
        },
        (txObj, error) => {
          //Alert.alert('ERROR: CREATE TABLE openings');
        }
      );
    });


  }
  // ======================================== / CREATE SHEMA =======================================

  const dropShema = () => {

    db.transaction(tx => {
      tx.executeSql('DROP TABLE categories', 
        null,
        (txObj, resultSet) => {
          console.log(resultSet);
          //Alert.alert('Dropped categories table');
        },
        (txObj, error) => {
          console.log(error);
          //Alert.alert('Dropped ERROR: categories table');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('DROP TABLE persons', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped persons table');
        },
        (txObj, error) => {
          console.log(error);
          //Alert.alert('Dropped ERROR: persons table');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('DROP TABLE phones', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped persons table');
        },
        (txObj, error) => {
          console.log(error);
          //Alert.alert('Dropped ERROR: persons table');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('DROP TABLE openings', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped persons table');
        },
        (txObj, error) => {
          console.log(error);
          //Alert.alert('Dropped ERROR: persons table');
        }
      );
    });

  }

  return (
    <View style={styles.container}>
    <Button style={styles.button} title="Synch All" onPress={syscAll} />      
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>      
    <Button style={styles.button} title="Drop Shema" onPress={dropShema} />      
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>      
      <Button style={styles.button} title="Create Shema" onPress={createShema} />
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>      
      <Button style={styles.button} title="Import from server" onPress={syncWithTheApiServer} />
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
  row: {

  },
  btn: {
    margin: 32,
    padding: 32,
    color: 'red',
  }
})
