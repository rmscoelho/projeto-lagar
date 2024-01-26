import React from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

import styles_events from "../EventsComponents/Styles_events";

const Info_evento = ({nomeProps,dataProps,localProps}) => ({
    render() {
        const horas = dataProps.toDate().toString().slice(16, 21);
        let mesNum = '';
        const mes = dataProps.toDate().toString().slice(4, 7);
        const dia = dataProps.toDate().toString().slice(8, 10);
        const ano = dataProps.toDate().toString().slice(11, 15);
        switch (mes) {
            case 'Jan':
                mesNum = '01';
                break;
            case 'Feb':
                mesNum = '02';
                break;
            case 'Mar':
                mesNum = '03';
                break;
            case 'Apr':
                mesNum = '04';
                break;
            case 'May':
                mesNum = '05';
                break;
            case 'Jun':
                mesNum = '06';
                break;
            case 'Jul':
                mesNum = '07';
                break;
            case 'Aug':
                mesNum = '08';
                break;
            case 'Sep':
                mesNum = '09';
                break;
            case 'Oct':
                mesNum = '10';
                break;
            case 'Nov':
                mesNum = '11';
                break;
            case 'Dec':
                mesNum = '12';
                break;
            default:
                console.log('Sorry, we are out of ' + mes + '.');
        }
        return (
            <View style={styles_events.viewgeral_info_evento}>
                <View style={styles_events.dados}>
                    <View style={{ textAlign:'center',
                        justifyContent:'center',
                        alignItems:'center',
                        width:95 + "%",
                    }}>
                    <Text style={styles_events.nome}>{nomeProps}</Text>
                    </View>
                    <View style={styles_events.hr} />
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{ paddingTop:15,
                        fontSize: 18,color:'black',fontWeight:'500',
                        paddingLeft: 4}}>Data:</Text><Text style={styles_events.extra}>{dia + '-' + mesNum + '-' + ano + ' ' + horas}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{ paddingTop:15,
                            fontSize: 18,color:'black',fontWeight:'500',
                            paddingLeft: 4}}>Local:</Text><Text style={styles_events.extra}>{localProps}</Text>
                    </View>
                </View>
            </View>
        );
    }
});

export default Info_evento;

