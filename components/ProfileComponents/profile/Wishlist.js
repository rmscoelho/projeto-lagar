import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from "react-native";
import See_more from "../../../icons/profile_assets/see_more.svg";

import styles from "../Styles.js";

import {connect} from "react-redux";
import firebase from 'react-native-firebase';

const db = firebase.firestore();

const Wishlist = ({nomeVinhoWishProps, fotoVinhoWishProps = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}) => (
    <View>
        <Image
            style={styles.wines_pic_l}
            source={{uri: fotoVinhoWishProps}}
        />
        <View style={styles.textbox_l}>
            <Text style={styles.wines_txt}>
                {nomeVinhoWishProps}
            </Text>
        </View>
    </View>
);

export default Wishlist;
