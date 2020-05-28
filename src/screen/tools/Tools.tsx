import React, { Component } from 'react';
import { Button, View } from 'react-native';
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
                          <Button
                            onPress={() => this.props.navigation.toggleDrawer()}
                            title="Info"
                            color="#fff"
                          />
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
            <View>
                <Button
                    onPress={() => this.props.navigation.navigate('Calculator')}
                    title="Go to Calculator"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('Timer')}
                    title="Go to Timer"
                />
            </View>
        );
    }
}