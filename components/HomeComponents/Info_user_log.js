import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import store from "../../store";
import {showUser} from "../../store/actions";
import firebase from "react-native-firebase";

const db = firebase.firestore();


function chamarPessoa(userUidPost, navigationPost) {
    db.collection('users').doc(userUidPost).onSnapshot(function (doc) {
        store.dispatch(showUser(doc.data()));
    });
    navigationPost.navigate('Profile')
    /*db.collection('vinhos').doc(vinhoUidProps).get()
        .then(docSnapshot => {
            store.dispatch(showWine(docSnapshot.data()));
            console.log(docSnapshot.data())

        }).then(
        navigation.navigate('WineInfo')
    )*/
}

const Info_user_log = ({nomeAutorPost, autorFotoPost, dataPost, userUidPost, navigationPost}) => ({
    render() {
        const horas = dataPost.toDate().toString().slice(16, 21);
        let mesNum = '';
        const mes = dataPost.toDate().toString().slice(4, 7);
        const dia = dataPost.toDate().toString().slice(8, 10);
        const ano = dataPost.toDate().toString().slice(11, 15);
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
            <View style={styles.viewgeral_info_user}>
                <TouchableOpacity onPress={() => {
                    chamarPessoa(userUidPost, navigationPost)
                }}>
                    <Image
                        source={{uri: autorFotoPost}}
                        style={styles.foto_perfil}
                    />
                </TouchableOpacity>
                <View style={styles.dados}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                chamarPessoa(userUidPost, navigationPost)
                            }}
                        ><Text style={styles.nome}>{nomeAutorPost}</Text></TouchableOpacity>
                    </View>

                    <Text style={styles.extra}>{dia + '-' + mesNum + '-' + ano + ' ' + horas}</Text>
                </View>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    foto_perfil: {
        flexDirection: "row",
        alignItems: "center",
        width: 80,
        height: 80,
        borderRadius: 3
    },
    viewgeral_info_user: {
        flexDirection: "row",
        width: 100 + "%"
    },
    dados: {
        alignItems: "flex-start",
        width: 100 + "%"
    },
    nome: {
        fontSize: 20,
        paddingLeft: 4
    },
    extra: {
        fontSize: 13,
        paddingLeft: 4
    }
});

export default Info_user_log;