import React, {useState} from 'react';
import { StyleSheet, View, Button, Text, Alert } from 'react-native'
import * as SQLite from 'expo-sqlite'
import axios from 'axios';

const url = 'https://vzsfoto.hu/api/groups.json';

const baseApiUrlGroups = 'https://kereso.vzsfoto.hu/api/sync/groups/' // + 2023-08-15/asdf
const baseApiUrlPersons = 'https://kereso.vzsfoto.hu/api/sync/persons/' // + 2023-08-15/asdf
const baseApiUrlPhones = 'https://kereso.vzsfoto.hu/api/sync/phones/' // + 2023-08-15/asdf
const baseApiUrlOpenings = 'https://kereso.vzsfoto.hu/api/sync/openings/' // + 2023-08-15/asdf

export default function Groups() {
  const [db, setDb] = useState(SQLite.openDatabase('professions.db'));

  const importFromServer = async () => {
    //-----------------------------------------------------------
    //Alert.alert(baseApiUrlGroups + '2023-08-15/asdf')

    axios({
      method: 'get',
      url: baseApiUrlGroups + '2023-08-15/asdf'
    }).then((response) => {
      let json = response.data
      for (var i = 0; i < response.data.length; i++) {
        let id = json[i].id
        let name = json[i].name
        let description = json[i].description
        let slug = json[i].slug
        let iconType = json[i].iconType
        let icon = json[i].icon
        let pos = json[i].pos
        let modified = json[i].modified

        db.transaction(tx => {
          tx.executeSql(
            //'INSERT INTO groups (id, name, description, slug, iconType, icon, pos, modified) VALUES (?, ?, ?, ?,  ?, ?, ?, ?)', 
            //[id, name, description, slug,  iconType, icon, pos, modified]
            'INSERT INTO groups (id, name, description, slug, iconType, icon, pos, modified) VALUES ('+id+', "'+name+'", "'+description+'", "'+slug+'", "'+iconType+'", "'+icon+'", '+pos+', "'+modified+'" )'
          ),
          null,
          (txObj, resultSet) => {
            //Alert.alert('INSERTED: ' + name);
          },
          (txObj, error) => {
            Alert.alert('ERROR: INSERT: ' + name);
          }
        });

      }
    });

    //-----------------------------------------------------------
    axios({
      method: 'get',
      url: baseApiUrlPersons + '2023-08-15/asdf'
    }).then((response) => {
      let json = response.data
      for (var i = 0; i < response.data.length; i++) {
        let id = json[i].id
        let group_id = json[i].group_id
        let city_id = json[i].city_id
        let name = json[i].name
        let description = json[i].description
        let phone = json[i].phone
        let phone2 = json[i].phone2
        let fax = json[i].fax
        let email = json[i].email
        let website = json[i].website
        let address = json[i].address
        let more = json[i].more
        let slug = json[i].slug
        let longitude = json[i].longitude
        let latitude = json[i].latitude
        let iconType = json[i].iconType
        let icon = json[i].icon
        let pos = json[i].pos
        let modified = json[i].modified
        db.transaction(tx => {
          tx.executeSql(
            //'INSERT INTO persons (id, group_id, city_id, name, description, phone, phone2, fax, email, website, address, more, slug, longitude, latitude, iconType, icon, pos, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            //[id, group_id, city_id, name, description, phone, phone2, fax, email, website, address, more, slug, longitude, latitude, iconType, icon, pos, modified]
            'INSERT INTO persons (id, group_id, city_id, name, description, phone, phone2, fax, email, website, address, more, slug, longitude, latitude, iconType, icon, pos, modified) VALUES ('+id+', '+group_id+', '+city_id+', "'+name+'", "'+description+'", "'+phone+'", "'+phone2+'", "'+fax+'", "'+email+'", "'+website+'", "'+address+'", "'+more+'", "'+slug+'", "'+longitude+'", "'+latitude+'", "'+iconType+'", "'+icon+'", '+pos+', "'+modified+'")'
          ),
          null,
          (txObj, resultSet) => {
            //Alert.alert('ADDED: ' + name);
          },
          (txObj, error) => {
            Alert.alert('ERROR: ADDED: ' + name);
          }
        });
      }
    });

    //-----------------------------------------------------------
    axios({
      method: 'get',
      url: baseApiUrlPhones + '2023-08-15/asdf'
    }).then((response) => {
      let json = response.data
      for (var i = 0; i < response.data.length; i++) {
        let id = json[i].id
        let person_id = json[i].person_id
        let name = json[i].name
        let description = json[i].description
        let phone = json[i].phone
        let ext = json[i].ext
        let email = json[i].email
        let slug = json[i].slug
        let iconType = json[i].iconType
        let icon = json[i].icon
        let pos = json[i].pos
        let modified = json[i].modified

        let sql = 'INSERT INTO phones (id, person_id, name, description, phone, ext, email, slug, iconType, icon, pos, modified) VALUES ('+id+', '+person_id+', "'+name+'", "'+description+'", "'+phone+'", "'+ext+'", "'+email+'", "'+slug+'", "'+iconType+'", "'+icon+'", '+pos+', "'+modified+'")'

        //Alert.alert(sql)

        db.transaction(tx => {
          tx.executeSql(
            //'INSERT INTO phones (id, person_id, name, description, phone, ext, email, slug, iconType, icon, pos, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            //[id, person_id, name, description, phone, ext, email, slug, iconType, icon, pos, modified]
            //'INSERT INTO phones (id, person_id, name, description, phone, ext, email, slug, iconType, icon, pos, modified) VALUES ('+id+', '+person_id+', "'+name+'", "'+description+'", "'+phone+'", "'+ext+'", "'+email+'", "'+slug+'", "'+iconType+'", "'+icon+'", '+pos+', "'+modified+'")'
            sql
          ),
          null,
          (txObj, resultSet) => {
            //Alert.alert('CREATED INDEX phones LAST');
          },
          (txObj, error) => {
            Alert.alert('ERROR: INSERT PHONE');
          }
        });

      }
    });

    //-----------------------------------------------------------
    axios({
      method: 'get',
      url: baseApiUrlOpenings + '2023-08-15/asdf'
    }).then((response) => {
      let json = response.data
      for (var i = 0; i < response.data.length; i++) {
        let id = json[i].id
        let name = json[i].name
        let hour_from = json[i].hour_from
        let hour_to = json[i].hour_to
        let comment = json[i].comment
        let pos = json[i].pos
        let modified = json[i].modified
        db.transaction(tx => {
          tx.executeSql(
            //'INSERT INTO openings (id, name, hour_from, hour_to, comment, pos, modified) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            //[id, name, hour_from, hour_to, comment, pos, modified]
            'INSERT INTO openings (id, name, hour_from, hour_to, comment, pos, modified) VALUES ('+id+', "'+name+'", "'+hour_from+'", "'+hour_to+'", "'+comment+'", '+pos+', "'+modified+'")'
          ),
          null,
          (txObj, resultSet) => {
            //Alert.alert('CREATED INDEX openings LAST');
          },
          (txObj, error) => {
            Alert.alert('ERROR: INSERT OPENING');
          }
        });
      }
    });

  }


  const createShema = () => {
    /*
      db.transaction(tx => {
        tx.executeSql('DROP TABLE groups')
      });
    */

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS groups ("id" INTEGER NOT NULL UNIQUE, "name" TEXT NOT NULL, "description" TEXT, "slug" TEXT, "iconType" TEXT DEFAULT "MaterialCommunityIcons", "icon" TEXT DEFAULT "sitemap-outline", "pos" INTEGER DEFAULT 1000, "modified" TEXT, PRIMARY KEY("id"))', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED TABLE groups');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATE TABLE GROUPS');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS groups ("id" INTEGER NOT NULL UNIQUE, "name" TEXT NOT NULL, "description" TEXT, "slug" TEXT, "iconType" TEXT DEFAULT "MaterialCommunityIcons", "icon" TEXT DEFAULT "sitemap-outline", "pos" INTEGER DEFAULT 1000, "modified" TEXT, PRIMARY KEY("id"))', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED TABLE groups 2');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATE TABLE GROUPS 2');
        }
      );
    });


    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_id" ON "groups" ("id" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_id');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED INDEX key_id in GROUPS TABLE');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_name" ON "groups" ("name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED INDEX key_name IN GROUPS TABLE');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_pos_name" ON "groups" ("pos" ASC, "name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_pos_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED INDEX key_pos_name IN GROUPS TABLE');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_slug" ON "groups" ("slug" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_slug');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED INDEX key_slug IN GROUPS ERROR');
        }
      );
    });
    
    // ---------------------------------------------------------------------------------
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS persons ("id" INTEGER NOT NULL UNIQUE, "group_id" INTEGER, "city_id" INTEGER, "name" TEXT NOT NULL, "description" TEXT, "phone" TEXT, "phone2" TEXT, "fax" TEXT, "email" TEXT, "website" TEXT, "address" TEXT, "more" TEXT, "slug" TEXT, "iconType" TEXT, "icon" TEXT, "longitude" TEXT, "latitude" TEXT, "pos" INTEGER DEFAULT 1000, "created" TEXT, "modified" TEXT, PRIMARY KEY("id"))', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED TABLE persons');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED persons table');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_id" ON "persons" ("id" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_id');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED persons index key_id');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_name" ON "persons" ("name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED persons index key_name');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_pos_name" ON "persons" ("pos" ASC, "name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_pos_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED persons index key_pos_name');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_slug" ON "persons" ("slug" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_slug');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED persons index key_slug');
        }
      );
    });

    // ---------------------------------------------------
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS phones ("id" INTEGER NOT NULL UNIQUE, "person_id" INTEGER, "name" TEXT NOT NULL, "description" TEXT, "phone" TEXT, "ext" TEXT, "email" TEXT, "slug" TEXT, "iconType" TEXT, "icon" TEXT, "pos" INTEGER DEFAULT 1000, "created" TEXT, "modified" TEXT, PRIMARY KEY("id"))', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED TABLE phones');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED phones table');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_id" ON "phones" ("id" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_id');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED phones index key_id');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_name" ON "phones" ("name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED phones index key_name');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_pos_name" ON "phones" ("pos" ASC, "name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_pos_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED phones index key_pos_name');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_slug" ON "phones" ("slug" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_slug');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED phones index key_slug');
        }
      );
    });

    // --------------------------------------------------------------------

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS openings ("id" INTEGER NOT NULL UNIQUE, "person_id" INTEGER, "name" TEXT NOT NULL, "hour_from" TEXT, "hour_to" TEXT, "comment" TEXT, "iconType" TEXT, "icon" TEXT, "pos" INTEGER DEFAULT 50, "created" TEXT, "modified" TEXT, PRIMARY KEY("id"))', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED TABLE openings');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED openings table');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_id" ON "openings" ("id" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_id');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED openings index key_id');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_name" ON "openings" ("name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED openings index key_name');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('CREATE INDEX IF NOT EXISTS "key_pos_name" ON "openings" ("pos" ASC, "name" ASC)', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('CREATED INDEX key_pos_name');
        },
        (txObj, error) => {
          Alert.alert('ERROR: CREATED openings index key_pos_name');
        }
      );
    });

  }
  // ======================================== / CREATE SHEMA =======================================

  const dropShema = () => {

    db.transaction(tx => {
      tx.executeSql('DROP TABLE groups', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped Groups 2x');
        },
        (txObj, error) => {
          console.log(error);
          Alert.alert('Dropped ERROR: Groups');
        }
      );
    });


    db.transaction(tx => {
      tx.executeSql('DROP TABLE groups', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped Groups');
        },
        (txObj, error) => {
          console.log(error);
          Alert.alert('Dropped ERROR: Groups');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('DROP TABLE persons', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped Persons');
        },
        (txObj, error) => {
          console.log(error);
          Alert.alert('Dropped ERROR: Persons');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('DROP TABLE phones', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped Phones');
        },
        (txObj, error) => {
          console.log(error);
          Alert.alert('Dropped ERROR: Phones');
        }
      );
    });

    db.transaction(tx => {
      tx.executeSql('DROP TABLE openings', 
        null,
        (txObj, resultSet) => {
          //Alert.alert('Dropped Openings');
        },
        (txObj, error) => {
          console.log(error);
          Alert.alert('Dropped ERROR: Openings');
        }
      );
    });

  }

  return (
    <View style={styles.container}>
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
      <Button style={styles.button} title="Import from server" onPress={importFromServer} />
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
