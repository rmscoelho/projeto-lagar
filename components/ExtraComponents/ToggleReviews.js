import React, {Component} from 'react';
import {Switch,Alert} from 'react-native';


export default class ToggleReviews extends Component{

    constructor(){

        super();

        this.state ={

            SwitchOnValueHolder :  true

        }
    }

    ShowAlert = (value) =>{

        this.setState({

            SwitchOnValueHolder: value
        });

        if(value === true)
        {

            //Perform any task here which you want to execute on Switch ON event.
            Alert.alert("Switch is On.");
        }
        else{

            //Perform any task here which you want to execute on Switch OFF event.
            Alert.alert("Switch is Off.");
        }

    };
    render (){
        return(
            <Switch
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                onValueChange={(value) => this.ShowAlert(value)}
                value={this.state.SwitchOnValueHolder}
                trackColor={{true: '#aa5766', false: 'E0E0E0'}}
                thumbColor="#EEEEEE"
            />
        )
    }
}