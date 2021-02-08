import React, { Component } from 'react';
import { Text, Button, View, FlatList, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Calculator from '../tools/calculator/Calculator';
import InterestScreen from '../interest/InterestScreen';
// import InterestScreen from '../tools/calculator/Calculator';
const Stack = createStackNavigator();

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                    title: 'Girvi Assistant ', 
                    headerStyle: {

                    },
                    headerLeft: () => (
                    <MaterialIcon.Button
                        name = "format-list-bulleted"
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{backgroundColor: "#fff"}}
                        color="#e9711c"
                        >
                    </MaterialIcon.Button>
                )}}/>
                <Stack.Screen name="Calculator" component={InterestScreen} options={{title: "Interest Calculator"}}/>
            </Stack.Navigator>
        )
    }
}
class HomeScreen extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 20}}>
                <View style={{flex: 11/12}}>
                    <View style={{flex: 3/12}}>
                        <View style={{flex: 1/2, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontStyle: "italic", margin: 20, marginTop: 10, fontSize: 25}}> 
                                Welcome to Girvi Assistant.
                            </Text>
                        </View>
                        <View style={{flex: 1/2, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 70, height: 70}} source={require("../../images/logo.png")}/>
                        </View>
                    </View>
                    <View style={{flex: 8/12, borderWidth: 1, borderColor: 'orange', marginLeft: 20, marginRight: 20, paddingTop: 10, marginTop: 20}}>
                        <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 15}}>
                            <Text>Tools List</Text>
                        </View>
                        <View style={{ marginLeft: 7, marginRight: 7}}>
                            <SimpleLineIcon.Button
                                name="calculator"
                                onPress={()=>this.props.navigation.navigate('Calculator')}
                                backgroundColor="#007398"
                                style={{padding: 15}}
                            >
                                Interest Calc
                            </SimpleLineIcon.Button>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1/12, borderColor: 'lightgrey', borderWidth:1, paddingTop: 10}}>
                    {/* <Text style={{textAlign: 'center'}}> */}
                        <Text style={{textAlign: 'center'}}>For Feedback </Text>
                        <Text style={{textAlign: 'center'}}>Call: +91 81485 88004</Text>
                    {/* </Text> */}
                </View>
            </View>
        )
    }
}
