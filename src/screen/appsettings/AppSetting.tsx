import React, { Component } from "react";
import InterestRateSetup from '../interestRateSetup/InterestRateSetup';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
let Stack = createStackNavigator();
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class AppSettingNavigatorScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Stack.Navigator initialRouteName="AppSetting" screenOptions={{
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
                <Stack.Screen name="AppSetting" component={AppSetting} options={{title: 'App Settings'}}/>
                <Stack.Screen name="InterestRateSetup" component={InterestRateSetup} options={{title: "Interest Rates"}}/>
            </Stack.Navigator>
        )
    }
}

class AppSetting extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <FeatherIcon.Button
                        name="percent"
                        onPress={()=>this.props.navigation.navigate('InterestRateSetup')}
                        backgroundColor="#007398"
                    >
                        Interest Rates
                    </FeatherIcon.Button>
                </View>
            </View>
        )
    }
}