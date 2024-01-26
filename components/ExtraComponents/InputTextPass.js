import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default class InputTextPass extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
    }

    render() {
        return (
            <TextInput secureTextEntry={true}  style={{marginLeft: 10, fontSize: 18, color: 'black', padding:0}}
                        value={this.state.text}
            />
        );
    }
}