import React, {Component} from 'react';
import {AppRegistry, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class LogForm extends Component {
    render() {
        return (
            <TouchableOpacity
                style={this.props.estiloAplicar}
                onPress={this.props.funcao}>
                <Text style={this.props.estiloTexto}>{this.props.btnText}</Text>
            </TouchableOpacity>
        );
    }
}