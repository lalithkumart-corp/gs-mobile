import React, { Component } from "react";
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { doLogin } from '../../actions/auth';
import { bindActionCreators } from 'redux';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.bindMethods();
    }
    bindMethods() {
        this.signInClick = this.signInClick.bind(this);
    }
    signInClick() {
        // await AsyncStorage.setItem('USER_KEY', 'lalith');
        // let cl = await AsyncStorage.getItem('USER_KEY');
        // console.log(cl);
        // console.log('=====REFRESH TRIGGERD FROM SIGNIN page');
        // this.props.refresh();
        console.log('SIGN In CLicked...');
        debugger;
        this.props.doLogin({userName: 'sample'});
    }
    render() {
        return (
            <View>
                <Text>
                    SINGIN Page
                </Text>
                <Button
                    //onPress={() => this.signInClick()}
                    onPress={this.signInClick}
                    title="Sign In"
                />
            </View>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
  });
  
const ActionCreators = Object.assign(
    {},
    doLogin,
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});
  
export default connect(mapStateToProps, {doLogin})(SignIn)