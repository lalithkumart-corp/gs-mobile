import React, { Component } from "react";
import { View, Text} from 'react-native';
interface PropTypes {
    headerText?: string,
    position?: string
}
export default class MyPopup extends Component<PropTypes, {}> {
    constructor(props) {
        super(props);
        this.state = {
            headerText: this.props.headerText || "Header",
            position: this.props.position || "center",
            closeOnTouchOutside: true
        }
    }
    render() {
        return (
            <View style={{flex: 1, position: "absolute"}}>
                <View style={{flex: 1}}>
                    <View style={{height: 20}}><Text>{this.state.headerText}</Text></View>
                    {this.props.children}
                    <View style={{height: 20}}><Text>FOOTER</Text></View>
                </View>
            </View>
        )
    }
}