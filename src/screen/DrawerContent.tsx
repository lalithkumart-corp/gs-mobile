import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Avatar, Title, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { doLogout } from '../actions/auth';
class GsDrawerContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <DrawerContentScrollView {...this.props}>
                    <View><Text>Content inside DCSV</Text></View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon name="account-balance" size={size} color={color}></Icon>
                            )}
                            label="Home"
                            onPress={() => {this.props.navigation.navigate('Home')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon name="notifications-none" size={size} color={color}></Icon>
                            )}
                            label="Notification"
                            onPress={() => {this.props.navigation.navigate('Notifications')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <EntypoIcon name="tools" size={size} color={color}></EntypoIcon>
                            )}
                            label="Tools"
                            onPress={() => {this.props.navigation.navigate('Tools')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <EntypoIcon name="tools" size={size} color={color}></EntypoIcon>
                            )}
                            label="Demo"
                            onPress={() => {this.props.navigation.navigate('Demo')}}
                        />
                    </Drawer.Section>
                </DrawerContentScrollView>

                {/* <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon name="exit-to-app" size={size} color={color}></Icon>
                            )}
                        label = "Sign Out"
                        onPress = {() => {this.props.doLogout()}}
                    />
                </Drawer.Section> */}
            </View>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {doLogout})(GsDrawerContent);
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
    }
})