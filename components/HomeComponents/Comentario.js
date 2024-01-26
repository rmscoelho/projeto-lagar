import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import styles_home from "../HomeComponents/Styles_home";
import store from "../../store";
import {showUser} from "../../store/actions";
import firebase from "react-native-firebase";
import {withNavigation} from "react-navigation";

const db = firebase.firestore();
const Comentario = ({keyProp, nomePessoaComentouProps, fotoPessoaComentouProps = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', textoPessoaComentouProps, dataPessoaComentouProps, idPessoaComentouProps, navigationProp}) => ({
        render() {
            const sendID = (userUid, navigationProp) => {
                console.log('user id: ', userUid);
                db.collection('users').doc(userUid).get()
                    .then(docSnapshot => {
                        store.dispatch(showUser(docSnapshot.data()));
                        console.log(userUid);
                    }).then(
                    this.props.navigation.navigate('Profile'),
                );
            };
            const horas = dataPessoaComentouProps.toDate().toString().slice(16, 21);
            let mesNum = '';
            const mes = dataPessoaComentouProps.toDate().toString().slice(4, 7);
            const dia = dataPessoaComentouProps.toDate().toString().slice(8, 10);
            const ano = dataPessoaComentouProps.toDate().toString().slice(11, 15);
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

                <View key={keyProp.toString()} style={styles_home.viewgeral_comentario}>
                    <TouchableOpacity onPress={() => {
                        sendID(idPessoaComentouProps, navigationProp)
                    }}>
                        <Image
                            source={{uri: fotoPessoaComentouProps}}
                            style={styles_home.placeholder}
                        />
                    </TouchableOpacity>
                    <View style={styles_home.view_dados}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    sendID(idPessoaComentouProps, navigationProp)
                                }}
                            >
                                <Text style={{fontSize: 17}}>{nomePessoaComentouProps}</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 10, color: "black"}}>
                                {dia + '-' + mesNum + '-' + ano + ' ' + horas}
                            </Text>
                        </View>
                        <View style={styles_home.view_coment}>
                            <View style={{flexDirection: "row", alignContent: "center"}}>
                                <View style={{alignItems: "flex-start", width: wp("60%")}}>
                                    <Text style={{color: "black"}}>{textoPessoaComentouProps}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }

)


export default withNavigation(Comentario);