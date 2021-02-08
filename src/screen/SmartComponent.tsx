import React, { Component } from "react";
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import GsDrawerContent from './DrawerContent';
import HomeScreen from './home/Home';
import NotificationScreen from './notification/Notification';
import Tools from './tools/Tools';
import Orders from './orders/Orders';
import Logout from './auth/logout/Logout';
import GsDatabase from '../database/db';
import Demo from "./demo/Demo";
import AppSetting from './appsettings/AppSetting';
import InterestScreen from "./interest/InterestScreen";
import InterestScreen2 from "./interest/InterestScreen2";
interface PropsType {
    refresh: Function,
    screenName?: string
}
export default class SmartComponent extends Component<PropsType, {}> {
    db: GsDatabase;
    constructor(props) {
        super(props);
        this.db = new GsDatabase();
        this.db.init();
    }

    render() {
        return (
            <Drawer.Navigator initialRouteName={"Home"} drawerContent={props => <GsDrawerContent {...props}/> }>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Notifications" component={NotificationScreen} />
                <Drawer.Screen name="AppSetting" component={AppSetting} />
                <Drawer.Screen name="Tools" component={Tools} />
                {/* <Drawer.Screen name="Interest" component={InterestScreen} /> */}
                <Drawer.Screen name="InterestCalculator" component={InterestScreen2} />
                {/* <Drawer.Screen name="Orders" component={Orders} />*/}
                <Drawer.Screen name="Demo" component={Demo} />
                
            </Drawer.Navigator>
        )
    }
}