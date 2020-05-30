import SQLite from 'react-native-sqlite-storage';
export default class DB {
    database_name = "gsmobile.db";
    database_version = "1.0";
    database_displayname = "SQLite Test Database";
    database_size = 200000;
    async init() {
        try {
            SQLite.DEBUG(true);
            // SQLite.enablePromise(false);
            await this.connectToDB();
            global.gsDb = this.db;
            return true;
        } catch(e) {
            return false;
        }
    }
    async connectToDB() {
        // this.db = SQLite.openDatabase(
        //     this.database_name, 
        //     this.database_version, 
        //     this.database_displayname, 
        //     this.database_size, 
        //     (db) => {console.log('DB open success'); this.populateDatabase(db);}, 
        //     () => {console.log('DB error on opening')}
        // );
        this.db = SQLite.openDatabase({name: this.database_name, createFromLocation: '~gsmobile.db', location: 'Library'});
        let isDbSetupDone = await this.isDbSetupDone();
        if(!isDbSetupDone)
            await this.doDatabaseSetup();
        return true;
        
    }
    async isDbSetupDone() {
        return new Promise( (resolve, reject) => {
            this.db.transaction((txn) => {
                txn.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
                    [],
                    (tx, res) => {
                        console.log('DB.js: item:', res.rows.length);
                        if (res.rows.length == 0)
                            return resolve(false);
                        else
                            return resolve(true);
                    },
                    (err) => {
                        console.log('DB.js: Err in isDbSetupDone()');
                        console.log(err);
                    }
                );
            });
        });  
    }

    doDatabaseSetup() {
        return new Promise( (resolve, reject) => {
            this.db.transaction( (txn) => {
                //txn.executeSql(`DROP TABLE IF EXISTS user`, []);
                txn.executeSql(`CREATE TABLE user (
                                    id	INTEGER PRIMARY KEY AUTOINCREMENT,
                                    name	INTEGER NOT NULL
                                )`, [], (tx, results) => {
                                    return resolve(true);
                                });
            });
        });
    }

    /*
    populateDatabase(db) {
        console.log('-===POPULATING DB');
        this.db = db;
        this.db.executeSql('SELECT 1 FROM user Limit 1', [], 
            () => {},
            () => {
                this.db.transaction(this.setupDB, 
                    (arg1) => {
                        console.log("Error", arg1);
                    }, 
                    (arg1) => {
                        console.log('Success', arg1);
                    }
                )
            })
    }
    setupDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS user;');
        tx.executeSql(`CREATE TABLE user (
            id	INTEGER PRIMARY KEY AUTOINCREMENT,
            name	INTEGER NOT NULL
        )`);
        tx.executeSql('INSERT INTO user (name) VALUES ("Ram")');
        tx.executeSql('INSERT INTO user (name) VALUES ("Raj")');
    } */
    executeSql(sql, options, successCB, errorCB) {
        console.log('=====EXecuting sql');
        return new Promise( (resolve, reject) => {
            this.db.transaction( (txn) => {
                txn.executeSql(sql, options, (tx, results) => {
                                    console.log('DB.js =========EXECUTED SQL');
                                    console.log(results);
                                    if(successCB)
                                        successCB(results);
                                    return resolve(results);
                                }, (err) => {
                                    console.log('DB.js -----ERROR EXECUTED SQL');
                                    console.log(err);
                                    if(errorCB)
                                        errorCB(err);
                                    return reject(err);
                                });
            });
        });
        
        //return this.db.executeSql(sql, options, successCB, errorCB);
    }
}