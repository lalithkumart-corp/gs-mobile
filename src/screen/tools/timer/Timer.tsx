import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';

export default class Timer extends Component{
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>TIMER screen</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Calculator')}
                    title="Go to Calculator"
                />
            </View>
        )
    }
}