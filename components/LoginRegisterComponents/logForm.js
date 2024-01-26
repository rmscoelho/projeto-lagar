import React, {Component} from 'react';
import {AppRegistry, TextInput, Text, StyleSheet} from 'react-native';

export default class LogForm extends Component {
    constructor(props) {
        super(props);
        this.state = {text: 'email'};
    }

    render() {
        return (
                <TextInput
                    style={estilos.caixaInput}
                    placeholder= {this.props.tipo}
                    onChangeText={(text) => this.setState({text})}
                    secureTextEntry={this.props.passe}
                />
        );
    }
}
const estilos = StyleSheet.create({
    caixaInput: {
        width: 100 + '%',
        color: 'black',
        borderWidth: 0
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});