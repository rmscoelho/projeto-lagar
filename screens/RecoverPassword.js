import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AppRegistry, Alert} from 'react-native';
import Logo from "../icons/user-circle.svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import LockIcon from "../icons/lock-solid.svg";
import {CaixaTexto} from "../components/Comum/CaixaTexto";
import firebase from 'react-native-firebase';
const db = firebase.firestore();
import store from "../store/index";
import {addUser} from "../store/actions/index";
import {addName} from "../store/actions/index";

export default class RecoverPassword extends Component {
    state = {email: '', };
    forgotPassword = (yourEmail) => {
        if(this.state.email!==''){
            firebase.auth().sendPasswordResetEmail(yourEmail)
                .then(function () {
                    Alert.alert('Vá ao seu mail!')
                }).catch(function (e) {
                console.log(e)
            })
        }else{
            Alert.alert('Preencha o campo de email!')
        }

    };


    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{
                    backgroundColor: '#E4DADB',
                    flex: 1, alignItems: 'center', alignContent: 'center', width: wp('100%'), height: hp('100%')
                }}>

                    {this.state.errorMessage && <Text style={{color: 'red'}}> {this.state.errorMessage}</Text>}

                    <Image style={{resizeMode: 'contain', height: 20 + '%', width: 95 + '%'}}
                           source={require('../icons/lagar.png')}/>
                    <View style={styles.caixaLogIn}>
                        <Logo width={80} height={80} color={'white'}/>
                        <Text sytle={styles.textoCaixaLogIn}>Esqueceu-se da palavra passe?</Text>
                        <View style={styles.infoLogIn}>
                            <CaixaTexto
                                icone={<Logo style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>}
                                tipo='Email'
                                value={this.state.email}
                                onChangeText={text => this.setState({email: text})}
                            />
                            <TouchableOpacity
                                style={styles.customBtnBGNo}
                                onPress={() => this.forgotPassword(this.state.email)}>
                                <Text style={styles.customBtnTextSocial}>ENVIAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
                                              style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 15, color: "#aa5766"}}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


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
        padding: 5,
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
