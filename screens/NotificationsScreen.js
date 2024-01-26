import React, {Component} from "react";
import {ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MenuButton from "../components/MenuButton";

import styles_gen from "../components/Styles_gen.js";
import styles_alert from "../components/NotificationComponents/Styles_alert.js";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import Hr from "react-native-hr";
import {connect} from "react-redux";
import firebase from 'react-native-firebase';
import Arrow_back from "../icons/geral/arrow_left.svg";
import {showWine, whereAmI} from "../store/actions/index";
import store from "../store/index";
import {showUser} from "../store/actions";
import {colorNames} from "react-native-svg/lib/extract/extractColor";

const db = firebase.firestore();

let todasNot = [];
let todosUser = [];
let pessoaComentouNome = '';
let pessoaComentouFoto = '';
let notificacoes = [];
let comen = [];
let pessoaMandou = '';
let jaClicou: false;
let todosVinhos = [];
let nomeVinho = '';
let vinhoNot = [];
let idVinho = '';
let nomeAntigo = '';

class NotificationsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            carregouVisitedUser: false,
            focusedScreen: false,
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            nomeAntigo = this.props.user.name;
            this.setState({carregouVisitedUser: true});
            console.log('vamos ver quantas vezes ele ve que é uma notificação diferente!!!')
        }
        console.log('--------------------------------')
        console.log(':::::::::states:::::::')
        console.log('--------------------------------')
        console.log('refresh: ', this.state.refresh)
        console.log('--------------------------------')
        console.log('carregouVisitedUser: ', this.state.carregouVisitedUser);
        console.log('--------------------------------')
        console.log('focusedScreen: ', this.state.focusedScreen);
        console.log('--------------------------------')
        console.log('--------------------------------')
        console.log('--------------------------------')
    }

    componentWillMount() {
        store.dispatch(whereAmI('Notifications'));
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener('willFocus', () => {
                this.chamaNotificacoes();
                this.setState({focusedScreen: true})
            }
        );
        navigation.addListener('willBlur', () => {
                this.setState({focusedScreen: false, refresh: false, carregouVisitedUser: true});
                todasNot.length = 0;
                todosUser.length = 0;
                todosVinhos.length = 0;
            }
        );
    }


    chamaNotificacoes = () => {
        console.log('chega ao chamaNotificacoes')
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("users").doc(this.props.user.userUid).get()
            .then((docSnapshot) => {
                todasNot.push(docSnapshot._data);
            });
        console.log('todas NOT: ', todasNot);
        this.chamaUsers();
        //---------------------------------------------------------------------------------------------------------------//
    };

    chamaUsers = () => {
        console.log('chega ao chamaUsers')
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("users").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosUser.push(sandwich._data);
                });
                this.chamaVinhos()
            })

    };

    chamaVinhos = () => {
        console.log('chega ao chamaVinhos')
        db.collection("vinhos").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosVinhos.push(sandwich._data);
                });
            })
            .then(() => {
                this.setState({refresh: true})
            })
    };

    renderPisto = ({item}) => {
        console.log('o item tem o que afinal??: ', item);

        function date(prop) {
            console.log(prop)
            const horas = prop.toDate().toString().slice(16, 21);
            let mesNum = '';
            const mes = prop.toDate().toString().slice(4, 7);
            const dia = prop.toDate().toString().slice(8, 10);
            const ano = prop.toDate().toString().slice(11, 15);
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
            console.log(dia + '-' + mesNum + '-' + ano + ' ' + horas)
            return dia + '-' + mesNum + '-' + ano + ' ' + horas
        }


        notificacoes.length = 0;
        comen = [];

        item.notificacoes.forEach(function (elemento) {

            todosUser.forEach((pessoa) => {
                if (pessoa.userUid === elemento.userUid && pessoa.nome !== null && pessoa.photo !== null) {
                    pessoaComentouNome = pessoa.name;
                    pessoaComentouFoto = pessoa.photo;
                    pessoaMandou = pessoa.userUid
                }
            });

            todosVinhos.forEach((vinho) => {
                if (vinho.vinhoUid === elemento.vinhoUid) {
                    nomeVinho = vinho.nome
                    idVinho = vinho.vinhoUid
                }
            });

            notificacoes.push({
                nome: pessoaComentouNome,
                foto: pessoaComentouFoto,
                idPessoa: pessoaMandou,
                nomeVinho: nomeVinho,
                idVinho: idVinho,
                data: date(elemento.data)
            });
            console.log('notificacoes : ', notificacoes);

            let notificacoes1 = notificacoes.reverse()

            comen = notificacoes1.map(function (poop, key) {
                return (
                    <View style={styles_alert.content_alert}>
                        <View>
                            <View style={styles_alert.header_alert}>
                                <TouchableOpacity onPress={() => sendID(poop.idPessoa)}>
                                    <View>
                                        <Image
                                            style={styles_alert.user_img}
                                            source={{uri: poop.foto}}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'column',
                                    paddingLeft: wp('3%'),
                                    paddingBottom: wp('2%'),
                                }}>
                                    <View style={styles_alert.header_txt_box}>
                                        <View >
                                            <Text style={styles_alert.person_name}>{poop.nome}</Text>
                                            <View style={{flexDirection: 'row',width: 80+'%'}}>
                                                <Text style={{
                                                    color: "#000",
                                                }}>{elemento.texto}</Text>
                                                <TouchableOpacity
                                                    onPress={() => chamaVinho(poop.idVinho)}>
                                                    <Text style={{
                                                        color: "#aa5766",
                                                        fontSize: wp("3.8%"),paddingLeft:wp('0.2%')
                                                    }}> {poop.nomeVinho}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: wp('2%')}}>
                                <Hr
                                    lineStyle={{
                                        backgroundColor: "#A2A2A2"
                                    }}
                                />
                            </View>
                            <View style={styles_alert.comment_alert}>
                                <View style={styles_alert.comment_txt_box}>
                                    <Text style={styles_alert.comment_date}>{poop.data}</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                )

            })
        });


        const sendID = (userUid) => {
            db.collection('users').doc(userUid).get()
                .then(docSnapshot => {
                    store.dispatch(showUser(docSnapshot.data()));
                }).then(
                this.props.navigation.navigate('Profile'),
            );
        };

        chamaVinho = (vinhoUidProps) => {
            db.collection('vinhos').doc(vinhoUidProps).onSnapshot(function (doc) {
                store.dispatch(showWine(doc.data()));
            });
            this.props.navigation.navigate('WineInfo')
        }


        return (
            comen
        )


    };

    render() {

        const {focusedScreen} = this.state;


        //   console.log("visited:", this.state.carregouVisitedUser);
        // console.log("refresh:", this.state.refresh);
        // console.log("focused:", this.state.focusedScreen);

        return (
            <ScrollView style={styles_gen.container}>
                <MenuButton navigation={this.props.navigation}/>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles_alert.content_arrow}>
                        <Text style={{fontSize: 18, color: '#aa5766', fontWeight: '500', padding: 5}}>Sugestões de
                            Vinhos</Text>
                    </View>
                </View>
                {/*--------------NOT*/}
                {this.state.refresh && this.state.carregouVisitedUser && this.state.focusedScreen ? (
                    <FlatList data={todasNot}
                              renderItem={this.renderPisto}
                              keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>A pisar as uvas</Text>
                        <ActivityIndicator size="large" color="#aa5766"/>
                    </View>
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4DADB',
        paddingTop: hp("40%")
    },
    text: {
        color: "#aa5766",
        fontSize: 30,
    },
});

function mapStateToProps(state) {
    return {
        seeVisitedUser: state.seeVisitedUser,
        user: state.user,
        vinho: state.vinho,
        pageVisited: state.pageVisited
    }
}


export default connect(mapStateToProps, null)(NotificationsScreen)