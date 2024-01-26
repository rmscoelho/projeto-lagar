import React from "react";
import {Text, View, StyleSheet, TouchableOpacity,Alert,Linking} from "react-native";
import Heart from "../../icons/events_assets/heart.svg";
import Comment from "../../icons/events_assets/comment.svg";
import Share from "../../icons/events_assets/share.svg";
import {LoginButton, ShareDialog} from 'react-native-fbsdk';
import Globe from "../../icons/events_assets/globe-solid.svg"

import styles_events from "../EventsComponents/Styles_events";

export default class Interacao extends React.Component {

    constructor(props) {
        super(props);

        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://www.facebook.com/',
            contentDescription: 'Publicação nova!'
        };

        this.state = {
            shareLinkContent: shareLinkContent,
        };
    }


    shareLinkWithShareDialog() {
        const tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.state.shareLinkContent);
                }
            }
        ).then(
            function (result) {
                if (result.isCancelled) {
                    Alert.alert('Cancelou a publicação!');
                } else {
                    Alert.alert('Publicado! ');
                }
            },
        );
    }

    render() {
        return (
            <View style={{ flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",alignItems:'center',
                paddingTop: 14}}>
                <View  style={{flexDirection: "row",
                    justifyContent: "flex-end",alignItems:'center',}}>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() =>Linking.openURL(this.props.siteUrl)
                    }>
                            <Globe width={23} height={23} color={'#aa5766'}/>
                        <Text style={{fontSize:17,color:'#aa5766'}}>  Saber mais</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row",
                    justifyContent: "flex-end",alignItems:'center',}} >
                <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={this.shareLinkWithShareDialog.bind(this)}>
                    <Text style={{fontSize:17,color:'#aa5766'}}>Partilhar  </Text>
                    <View style={{flexDirection: "row"}}>
                        <Share width={23} height={23}/>
                    </View>

                </TouchableOpacity>
                </View>

            </View>
        );
    }
}
