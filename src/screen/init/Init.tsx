import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';

//import { NavigationContainer, StackActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// const Stack = createStackNavigator();

import { View, Text } from 'react-native';
import AuthScreen from '../auth/AuthScreen';
import SmartComponent from '../SmartComponent';
import { connect } from 'react-redux';
import GsDatabase from '../../database/db';
import { setDBReference } from '../../actions/database';
class Initialising extends Component {
    childCompProps: any;
    state = {
        isLoggedInUser: false,
        firstTimeVisit: true
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoggedInUser: false,
            firstTimeVisit: true
        }
        //this.bindMethods();
        this.childCompProps = {
            screenName: 'Home'
        }
        this.props.setDBReference();

    }
    // bindMethods() {
    //     this.refresh = this.refresh.bind(this);
    //     this.loadBaedOnAuth = this.loadBaedOnAuth.bind(this);
    // }

    // refresh() {
    //     this.loadBaedOnAuth();
    // }
    componentDidMount() {
        //this.loadBaedOnAuth();
        this.setState({firstTimeVisit: false});
    }
    //componentWillReceiveProps(newProps) {
        // if(newProps.auth) {
        //     if(newProps.auth.isAuthenticated && !this.state.isLoggedInUser)
        //         this.setState({firstTimeVisit: false, user: {}, isLoggedInUser: true});
        //     else if(!newProps.auth.isAuthenticated && this.state.isLoggedInUser)
        //         this.setState({firstTimeVisit: false, user: null, isLoggedInUser: false});
        // }
    //}
    // async loadBaedOnAuth() {
    //     if(this.props.auth.isAuthenticated)
    //         this.setState({firstTimeVisit: false, user: {}, isLoggedInUser: true});
    //     else
    //         this.setState({firstTimeVisit: false, user: null, isLoggedInUser: false});
    // }
    render() {
        return (
            this.state.firstTimeVisit ? (<View><Text>Loading...</Text></View>) : (
                this.props.auth.isAuthenticated ? (
                    <SmartComponent {...this.childCompProps} routeTo = {"Home"}/>
                ) : (
                    <AuthScreen/>
                )
            )
            
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps, {setDBReference})(Initialising)