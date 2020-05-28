import React, { Component } from 'react';
import { Text, Button, View, FlatList, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import GsDatabase from '../../database/db';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
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
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Home Screen'}}/>
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
                <Text>HOME SCREEN</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to Notifications screen"
                />
            </View>
        )
    }
}
