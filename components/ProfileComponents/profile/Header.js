import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

//SVG
import Subscription from "../../../icons/profile_assets/subscribe.svg";

import styles from "../Styles.js";
import ViewMoreText from "react-native-view-more-text";


const Header = ({
                    fotoProps = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', nomeProps, rankingUserProps,
                    followersProps, followingProps, loggedNameProps
                }) => (
    <View style={{flexDirection: "row", marginBottom: 7}}>
        <Image
            style={styles.profile_pic}
            source={{uri: fotoProps}}
        />

        <View>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.username}>{nomeProps}</Text>
                <Text style={styles.rankingUser}>{rankingUserProps}</Text>
            </View>

            <View style={styles.subspace}>
                <View style={styles.header_items}>
                    <Text style={styles.subscribe_num}>{followersProps}</Text>
                    <Text style={styles.subscribe}>Seguidores</Text>
                </View>
                <View style={styles.header_items}>
                    <Text style={styles.subscribe_num}>{followingProps}</Text>
                    <Text style={styles.subscribe}>A seguir</Text>
                </View>

                <View style={styles.header_items}>

                    <SubscribeBtn loggedProps={loggedNameProps} userProps={nomeProps}/>

                </View>
            </View>
        </View>
    </View>
);


const SubscribeBtn = (loggedProps, userProps) => ({

    render() {

        if ((loggedProps.loggedProps) !== (loggedProps.userProps)) {

            return (<TouchableOpacity style={styles.follow_btn}>
                <Subscription style={styles.subscription}/>
                <Text style={styles.subscribe}>Seguindo</Text>
            </TouchableOpacity>)

        } else {
            return (
                <Text> </Text>
            )

        }

    }


});

export default Header;
