import React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList, WebView, Linking, ActivityIndicator,
} from "react-native";
import MenuButton from "../components/MenuButton";

import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import More from "../icons/events_assets/more.svg";
import Info_evento from "../components/EventsComponents/Info_evento";
import Interacao_eventos from "../components/EventsComponents/Interacao_eventos";
import Arrow_back from "../icons/geral/arrow_left.svg";

import styles_gen from "../components/Styles_gen";
import styles_events from "../components/EventsComponents/Styles_events";
import firebase from 'react-native-firebase';

const db = firebase.firestore();


let todosEventos = [];


export default class EventsScreen extends React.Component {


    static navigationOptions = {
        header: null
    };

    state = {
        refresh: false,

    };

    componentDidMount() {
        this.chamaEventos();
    }

    chamaEventos = () => {
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("eventos").orderBy("Data", "desc").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosEventos.push(sandwich._data);
                });
            }).then(() => {
            this.setState({refresh: true})
        })

        //---------------------------------------------------------------------------------------------------------------//
    };





    renderPisto = ({item}) => {


        return (
            <View style={styles_events.scrollv}>
                <View style={styles_events.content_first}>
                    <View style={styles_events.content}>
                        <View style={{width: 95 + "%", paddingBottom: 13}}>
                            <Info_evento nomeProps={item.nomeEvento} dataProps={item.Data}
                                         localProps={item.localEvento}/>
                            <Text style={styles_events.descricao_evento}>
                                {item.descricaoEvento}
                            </Text>
                            <Image
                                source={{uri: item.fotoEvento}}
                                style={styles_events.imagem_evento}
                            />
                            <View style={styles_events.hr}/>
                            <Interacao_eventos likesProps={item.likes} siteUrl={item.siteUrl}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {


        return (
            <View style={styles_gen.container}>
                <MenuButton navigation={this.props.navigation}/>
                {this.state.refresh ? (
                    <ScrollView>
                        {
                            <FlatList data={todosEventos}
                                      renderItem={this.renderPisto}
                                      keyExtractor={(item, index) => item.eventosUid}
                            />
                        }
                    </ScrollView>
                ) :(
                    <View style={styles.container}>
                        <Text style={styles.text}>A provar o vinho</Text>
                        <ActivityIndicator size="large" color="#aa5766"/>
                    </View>
                )}

            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4DADB',
    },
    text: {
        color: "#aa5766",
        fontSize: 30,
    },
});


