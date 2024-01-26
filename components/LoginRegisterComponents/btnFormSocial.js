import React, {Component} from 'react';
import {AppRegistry, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class LogForm extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.chamaFuncao}
            >
                {this.props.tipoSocial}
            </TouchableOpacity>
        );
    }
}