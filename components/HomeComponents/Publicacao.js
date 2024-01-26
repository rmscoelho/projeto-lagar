import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import Info_user_log from "../HomeComponents/Info_user_log";
import Interacao from "../HomeComponents/Interacao";
import Wine from "../../icons/home_assets/wine-bottle.svg";
import {showWine} from "../../store/actions/index";
import firebase from 'react-native-firebase';
import store from "../../store/index";


const db = firebase.firestore();

function chamarVinho(vinhoUidProps, navigation) {
    db.collection('vinhos').doc(vinhoUidProps).onSnapshot(function (doc) {
        store.dispatch(showWine(doc.data()))
    });
    navigation.navigate('WineInfo');
}


const Publicacao = ({userUidProps, navigation, vinhoUidProps, nomeAutorProps, fotoAutorProps, dataPostProps, nomeVinhoProps = 'vinhoDoBom', fotoVinhoProps = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', descricaoProps, likesProps, deuLikeProps, postUidProps, darUmLikeProps, comentariosTamanhoProps}) => (
    <View style={{width: 95 + "%", paddingBottom: 10}}>
        <Info_user_log navigationPost={navigation} nomeAutorPost={nomeAutorProps} autorFotoPost={fotoAutorProps}
                       dataPost={dataPostProps}
                       userUidPost={userUidProps}/>
        <View style={styles.hr}/>
        <Text style={styles.descricaoStyle}>
            {" "}
            {descricaoProps}
        </Text>
        <TouchableOpacity onPress={() => {
            chamarVinho(vinhoUidProps, navigation)
        }}>
            <View style={{flexDirection: "row"}}>
                <Wine width={20} height={20}/>
                <Text style={styles.vinho}> {nomeVinhoProps}</Text>
            </View>
        </TouchableOpacity>

        <Image
            source={{uri: fotoVinhoProps}}
            style={styles.imagem_vinho}
        />
        <Interacao postUidPost={postUidProps} darumLikePost={darUmLikeProps} numLikePost={likesProps}
                   deuLikePost={deuLikeProps} comentariosTamanhoPost={comentariosTamanhoProps}/>
        <View style={styles.hr}/>
    </View>
);

const styles = StyleSheet.create({
    descricaoStyle: {
        fontSize: 16,
        color: "black",
        paddingTop: 10
    },
    vinho: {
        fontSize: 16,
        color: "#A65168"
    },
    hr: {
        borderBottomColor: "#8D8D8D",
        borderBottomWidth: 0.8,
        width: 100 + "%",
        paddingTop: 15
    },
    imagem_vinho: {
        marginTop: 10,
        width: 100 + "%",
        height: hp("45%")
    }
});
export default Publicacao;