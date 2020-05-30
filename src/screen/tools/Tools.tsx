import React, { Component } from 'react';
import { Text, Button, View, TouchableHighlight } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import Calculator from './calculator/Calculator';
import Timer from './timer/Timer';
const Stack = createStackNavigator();

export default class Tools extends Component{
    render() {
        return (
            <Stack.Navigator initialRouteName="ToolsScreen">
                <Stack.Screen name="ToolsScreen" component={ToolsScreen} options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                      headerLeft: () => (
                        <MaterialIcon.Button
                            name = "format-list-bulleted"
                            onPress={() => this.props.navigation.toggleDrawer()}
                            style={{color: "white", backgroundColor: "#f4511e"}}
                            >
                        </MaterialIcon.Button>
                        ),
                    title: 'Tools List Screen'}}/>
                <Stack.Screen name="Calculator" component={Calculator} options={{title: "Calculator Screen"}}/>
                <Stack.Screen name="Timer" component={Timer} options={{title: "Timer Screen"}}/>
            </Stack.Navigator>
        )
    }
}

class ToolsScreen extends Component {
    render() {
        return (
            <TouchableHighlight>
                <View>
                    {/* <Button
                        onPress={() => this.props.navigation.navigate('Calculator')}
                        title="Go to Calculator"
                        
                    />
                    <Button
                        onPress={() => this.props.navigation.navigate('Timer')}
                        title="Go to Timer"
                    /> */}
                    <View>
                        <SimpleLineIcon.Button
                            name="calculator"
                            onPress={()=>this.props.navigation.navigate('Calculator')}
                        >
                            Calculator
                        </SimpleLineIcon.Button>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}