import React, { Component } from 'react';
import { Text, Button, View, FlatList, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import GsDatabase from '../../database/db';

export default class Demo extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        // this.db = new GsDatabase();
        // let tt = await this.db.init();
        // console.log('HOME>TSX: tt: ', tt);
        // try {
        //     //await this.db.executeSql(`INSERT INTO user (name) VALUES ("RAJ")`);
        //     let res = await this.db.executeSql(`SELECT * FROM user`, []);
        //     console.log('DEMO.tsx ===== SQL result');
        //     for(let i=0; i< res.rows.length; i++) {
        //         console.log('DEMO.tsx ======SQL RECORD NAME = ', res.rows.item(i).name);
        //     }
        // } catch(e) {
        //     console.log('DEMO.TSX==== catch block...');
        //     console.log(e);
        // }
    }
    render() {
        return (
            <Stack.Navigator initialRouteName="DemoScreen" screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerLeft: () => (
                    <Button
                        onPress={() => this.props.navigation.toggleDrawer()}
                        title="Info"
                        color="#fff"
                    />
                )
            }}>
                <Stack.Screen name="DemoScreen" component={DemoScreen} options={{title: 'Demo Screen'}}/>
            </Stack.Navigator>
        )
    }
}
class DemoScreen extends Component{
    db: GsDatabase;
    constructor(props) {
        super(props);
        this.state = {
            userNameVal: "",
            userList: []
        }
        this.onUserNameChange = this.onUserNameChange.bind(this);
    }
    async componentDidMount() {
        this.db = new GsDatabase();
        let tt = await this.db.init();
        this.fetchAndRenderUsersList();
    }
    onUserNameChange(txt) {
        this.setState({userNameVal: txt});
    }
    async insertIntoDB() {
        try {
            let res = await this.db.executeSql(`INSERT INTO user (name) VALUES (?)`, [this.state.userNameVal]);
            this.fetchAndRenderUsersList();
        } catch(e) {
            console.log('DEMO.tsx ==== ', e );
        }
    }
    async fetchAndRenderUsersList() {
        try {
            let res = await this.db.executeSql(`SELECT * FROM user`, []);
            let newState = {...this.state};
            newState.userList = [];
            for(let i=0; i< res.rows.length; i++) {
                console.log('DEMO.tsx ======SQL RECORD NAME = ', res.rows.item(i).name);
                newState.userList.push(res.rows.item(i).name);
            }
            this.setState(newState);
        } catch(e) {
            console.log('DEMO.tsx=====142 ', e);
        }
    }

    getList() {
        let theDom = [];
        for(let i=0; i< this.state.userList.length; i++) {
            theDom.push(<Text>{this.state.userList[i]}</Text>);
        }
        return theDom;
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>DEMO SCREEN</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to Notifications screen"
                />

                <TextInput onChangeText={text => this.onUserNameChange(text)} value={this.state.userNameVal} style = {styles.input} placeholder="user name" autoFocus={true}/>
                {/* <TextInput
                    label='UserName'
                    value={this.state.userNameVal}
                    onChangeText={text => this.onUserNameChange( text )}
                /> */}
                <Button onPress={()=>this.insertIntoDB()} title="Insert into DB" style={styles.submitButton}/>
                {/* <FlatList 
                    dataSource={this.state.userList}
                    renderRow={(rowData) => <Text>{rowData}</Text>}
                /> */}
                <View style={{flex: 7}}>
                    {this.getList()}
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
        flex: 1,
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
 })