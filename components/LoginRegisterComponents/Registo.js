import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Logo from "../../icons/user-cog-solid.svg";
import LockIcon from "../../icons/lock-solid.svg";
import LogForm from "./logForm";
import BtnForm from "./btnForm";

export default class Registo extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{
                backgroundColor: '#E4DADB',
                flex: 1, alignItems: 'center', alignContent: 'center'
            }}>
                <Image style={{resizeMode: 'contain', height: 20 + '%', width: 95 + '%'}}
                       source={require('../../icons/lagar.png')}/>
                <View style={styles.caixaLogIn}>
                    <Logo width={80} height={80} color={'#BEBEBE'}/>
                    <Text sytle={styles.textoCaixaLogIn}>Ainda não tem conta? Registe-se</Text>
                    <View style={styles.infoLogIn}>
                        <View style={styles.searchSection}>
                            <Logo style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>
                            <LogForm tipo='Email' passe={false}/>
                        </View>
                        <View style={styles.searchSection}>
                            <LockIcon style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>
                            <LogForm tipo='Password' passe={true}/>
                        </View>
                        <View style={styles.searchSection}>
                            <LockIcon style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>
                            <LogForm tipo='Repetir password' passe={true}/>
                        </View>
                        <BtnForm funcao={() => {
                        }} estiloAplicar={styles.customBtnBGNo} estiloTexto={styles.customBtnTextSocial}
                                 btnText={'REGISTAR'}/>
                    </View>
                </View>
            </View>
        );
    }
}
const faceIcon = 'FaceIcon';

const cenas = true;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4DADB',
        flex: 1
    },
    caixaLogIn: {
        paddingBottom: 8,
        width: 95 + '%',
        borderRadius: 3,
        borderWidth: 0,
        alignItems: 'center'
    },
    infoLogIn: {
        width: 80 + '%',
        marginTop: 10
    },
    textoCaixaLogIn: {
        color: '#BEBEBE',
        fontWeight: '900',
        marginTop: 50
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        width: 100 + '%',
        borderWidth: 0,
        borderRadius: 3,
        marginBottom: 8,
    },
    icon: {
        padding: 10,
        margin: 5
    },
    btnIcon: {
        padding: 10,
        margin: 5,
        alignSelf: 'center'
    },
    caixaInput: {
        height: 40,
        width: 80 + '%',
        borderWidth: 0,
        borderRadius: 3,
        color: '#F7F4F4'
    },

    customBtnTextSocial: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        color: "#fff",
        padding:5,
    },

    /* Here, style the background of your button */
    customBtnBGSocial: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 8,
        flexDirection: 'row',
        width: 100 + '%',
        backgroundColor: "#aa5766",
        paddingVertical: 5,
        borderRadius: 3,
    },
    alinharCentro: {
        alignSelf: 'center'
    },
    customBtnBG: {
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: "#BEBEBE",
        paddingVertical: 5,
        borderRadius: 3,
    },
    customBtnBGNo: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 15,
        flexDirection: 'row',
        width: 50 + '%',
        backgroundColor: "#aa5766",
        paddingVertical: 5,
        borderRadius: 3,
    }
});
