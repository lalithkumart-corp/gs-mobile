import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Calculator from '../tools/calculator/Calculator';
import InterestRateSetup from '../interestRateSetup/InterestRateSetup';

export default class InterestScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Interest />
        )
        // return (
        //     <Stack.Navigator initialRouteName="InterestScreen" screenOptions={{
        //         headerStyle: {
        //             backgroundColor: 'white',
        //         },
        //         headerTintColor: '#ccac00',
        //         headerTitleStyle: {
        //             fontWeight: 'bold',
        //         }
        //     }}>
        //         <Stack.Screen name="InterestScreen" component={Interest} options={{title: 'Interest Calculator', headerLeft: () => (
        //             <SimpleLineIcons.Button
        //                 name = "calculator"
        //                 style={{backgroundColor: "#fff", paddingLeft: 20}}
        //                 color="#ccac00"
        //                 size={30}
        //                 >
        //             </SimpleLineIcons.Button>
        //         )}}/>
        //     </Stack.Navigator>
        // )
    }
}

class Interest extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <Tab.Navigator>
                <Tab.Screen name="Calculator" component={Calculator} options={{
                    title: 'Calculator', 
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="calculator" color={color} size={size} />
                    )}
                } 
                />
                <Tab.Screen name="Setup" component={InterestRateSetup} options={{
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="settings" size={size} color={color}/>
                    )}
                }/>
            </Tab.Navigator>
        )
    }
}