import React, {Component} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Logo from "../icons/user-circle.svg";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import LockIcon from "../icons/lock-solid.svg";
import {CaixaTexto} from "../components/Comum/CaixaTexto";
import firebase from 'react-native-firebase';
import store from "../store/index";
import {addUser} from "../store/actions/index";

const db = firebase.firestore();

export default class Registo extends Component {
    state = {email: '', password: '', errorMessage: null, name: ''};


    handleSignUp = (prop) => {
        console.log(prop)
        if (this.state.email !== "" && this.state.password !== "") {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                if (user != null) {
                    return db.collection('users').doc(firebase.auth()._user.uid).set({
                        name: this.state.name,
                        photo: 'https://www.landfood.ubc.ca/files/2018/03/Profile_avatar_placeholder_large.png',
                        email: firebase.auth()._user.email,
                        notificacoes: [],
                        rank: 0,
                        reviews: [],
                        vinhosConsumidos: [],
                        aSeguir: [],
                        seguindolhe: [],
                        vinhosAdega: [],
                        vinhosWish: [],
                        userUid: firebase.auth()._user.uid
                    }).then(() => this.meterNoRedux(user))
                }
            }).catch(error => this.setState({errorMessage: error.message}))
        } else {
            Alert.alert("Preencha os campos todos")
        }

    };

    meterNoRedux(user
    ) {
        db.collection('users').doc(firebase.auth()._user.uid).get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    store.dispatch(addUser(docSnapshot._data));
                    this.props.navigation.navigate(user ? 'Feed' : 'Login');
                }
            })
    }


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
                        <Text sytle={styles.textoCaixaLogIn}>Ainda não tem conta? Registe-se</Text>
                        <View style={styles.infoLogIn}>
                            <CaixaTexto
                                icone={<Logo style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>}
                                tipo='Nome'
                                value={this.state.name}
                                onChangeText={text => this.setState({name: text})}
                            />
                            <CaixaTexto
                                icone={<Logo style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>}
                                tipo='Email'
                                value={this.state.email}
                                onChangeText={text => this.setState({email: text})}
                            />
                            <CaixaTexto
                                icone={<LockIcon style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>}
                                tipo='Password'
                                seguranca
                                value={this.state.password}
                                onChangeText={text => this.setState({password: text})}
                            />
                            <TouchableOpacity
                                style={styles.customBtnBGNo}
                                onPress={() => this.handleSignUp(this.state.name)}>
                                <Text style={styles.customBtnTextSocial}>REGISTAR</Text>
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
