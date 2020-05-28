import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
export default class Calculator extends Component{
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> CALCULATOR Screen </Text>
                <Button
                    onPress={() =>  NavigationActions.navigate({routeName: 'Timer', params: {}})}
                    title="Go to Timer screen"
                />
            </View>
        )
    }
}