import React, { Component } from 'react';
import { TextInput } from 'react-native';
import {connect} from "react-redux";


class InputTextMail extends Component {
    constructor(props) {
        super(props);
        this.state = { text2: this.props.user.email };
    }

    render() {
        return (
            <TextInput  style={{marginLeft: 10, fontSize: 18, color: 'black', padding:0}}
                        onChangeText={(text2) => this.setState({text2})}
                        value={this.state.text2}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}



export default connect(mapStateToProps,null) (InputTextMail)