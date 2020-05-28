import React, { Component } from 'react';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import PendingOrders from './pendingOrders/PendingOrders';
import ShippedOrders from './shipped/ShippedOrders';

export default class Orders extends Component{
    render() {
        return (
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = '';
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}>
                <Tab.Screen name="Home" component={PendingOrders} />
                <Tab.Screen name="Settings" component={ShippedOrders} />
            </Tab.Navigator>
        )
    }
}
