import React, { Component } from 'react';
import { Text, Button, View, FlatList, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Calculator from '../tools/calculator/Calculator';
const Stack = createStackNavigator();

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Home Screen', headerLeft: () => (
                    <MaterialIcon.Button
                        name = "format-list-bulleted"
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{backgroundColor: "#fff"}}
                        color="#e9711c"
                        >
                    </MaterialIcon.Button>
                )}}/>
                <Stack.Screen name="Calculator" component={Calculator} options={{title: "Calculator Screen"}}/>
            </Stack.Navigator>
        )
    }
}
class HomeScreen extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <SimpleLineIcon.Button
                        name="calculator"
                        onPress={()=>this.props.navigation.navigate('Calculator')}
                        backgroundColor="#007398"
                    >
                        Calculator
                    </SimpleLineIcon.Button>
                </View>
            </View>
        )
    }
}
