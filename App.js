import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './screens/HomeScreen_helia';
import DrawerNavigator from './navigation/DrawerNavigation';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import firebase from "react-native-firebase";
import navigation from 'react-navigation';
import {AccessToken} from "react-native-fbsdk";
import store from "./store/index";
import { addArticle } from "./store/actions/index";
import { Provider } from "react-redux";


export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <DrawerNavigator/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 30,
    },
});

