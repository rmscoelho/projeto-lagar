import React, { Component } from 'react';
import { TextInput } from 'react-native';
import {connect} from "react-redux";


class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = { text: this.props.user.name };
    }

    render() {
        return (
            <TextInput  style={{marginLeft: 10, fontSize: 18, color: 'black', padding:0}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
    }
}



export default connect(mapStateToProps,null) (InputText)
