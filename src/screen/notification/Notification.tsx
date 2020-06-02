import React, { Component } from 'react';
import { Text, Button, View } from 'react-native';

export default class NotificationScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>NOTIFICATION SCREEN (in-progress)</Text>
                <Button onPress={() => this.props.navigation.goBack()} title="Go back" />
            </View>
        )
    }
}