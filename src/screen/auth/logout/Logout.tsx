import React, { Component } from "react";
import { View, Text, TouchableHighlightBase } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from 'react-navigation';
interface PropsType {
    refresh: Function,
    loadBaedOnAuth?: Function
}

export default class Logout extends Component<PropsType, {}> {
    constructor(props) {
        super(props);
        this.removeFromStorage = this.removeFromStorage.bind(this);
    }
    async componentDidMount() {
        await this.removeFromStorage();
    }
    async removeFromStorage() {
        console.log("Removing the item....");
        await AsyncStorage.removeItem('USER_KEY');
        this.props.refresh();
        this.props.navigation.resetRoot({routeName: 'Home'});
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [this.props.navigation.navigate({ routeName: 'Home' })],
        // });
        // this.props.navigation.dispatch(resetAction);

        //this.props.navigation.resetRoot('Home');
    }
    render() {
        return (
            <View>
                <Text> Logging you out...</Text>
            </View>
        )
    }
}