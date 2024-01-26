import React, { Component } from 'react';
import { AppRegistry, TextInput,View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class UselessTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (

            <TextInput
                editable = {true}
                maxLength = {500}
                multiline = {true}
                placeholder="Novo comentário"
                style={{height: 150,borderColor: '#aa5766',borderWidth: 0.5,width:100+'%',textAlignVertical: "top",backgroundColor: 'rgba(222,222,222,0.3)',borderRadius:3}}
                onChangeText={(text) => this.setState({descricao})}
                value={this.state.descricao}
            />

        );
    }
}