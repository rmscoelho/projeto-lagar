/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles_wine = StyleSheet.create({
    profile_pic: {
        position:'relative',
        width: wp("42%"),
        height: wp("42%"),
        paddingRight:wp("1.5%"),
        justifyContent: 'center',
        alignItems: 'center',
    },
    rating: {
        width: wp("50%"),
        marginLeft: wp("1.5%")
    },
    subtitle: {
        fontSize: 16,
        color: "#000",
        marginLeft: wp("1.5%")
    },
    subtitle_t: {
        fontSize: wp("4%"),
        color: "#aa5766",
        marginLeft: wp("1.5%"),
        fontWeight:'bold',
        textAlignVertical: 'top'
    },
    subtitle_icon: {
        color: "#000",
        width: wp("5%"),
        height: wp("5%"),
        marginRight: wp("1%"),
        marginLeft: wp("1.5%")

    },
    stars_full: {
        height: wp("6%"),
        width: wp("6%"),
        color: "#E1D200",
        marginBottom: hp("2%"),
        marginLeft: wp("1.5%")
    },
    stars_notfull: {
        height: wp("6%"),
        width: wp("6%"),
        color: "lightgray",
        marginBottom: hp("2%"),
        marginLeft: wp("1.5%")
    },
    stars_empty: {
        height: wp("6%"),
        width: wp("6%"),
        color: "black",
        marginBottom: hp("2%")
    },
    wine_txt_box: {
        width: wp("85%"),
        marginLeft: wp("1.5%"),
        marginTop: hp("1%"),
        marginBottom: hp("3%"),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    wine_txt: {
        fontSize: wp("3.5%"),
        color: "black",
    },
    wine_txt_preco: {
        fontSize: wp("3.5%"),
        color: "#aa5766",
        marginLeft: wp("1.5%")
    },
    title: {
        marginTop: hp("2%"),
        height: hp("3%"),
        alignSelf:'center',
        marginBottom:10

    },
    wine_title_txt: {
        fontSize: wp("5%"),
        color: "black",
        fontWeight: "bold",

    },
    collapse_header: {
        flexDirection: "row",
        alignItems: "center",

    },
    type: {
        width: wp("25%"),
        height: wp("8%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
    type_txt: {
        marginLeft: 1,
        fontSize: wp("3.5%"),
        color: "#707070"
    },
    type_info: {
        width: wp("23.75%"),
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: hp("1.5%")
    },
    type_info_2: {
        width: wp("50%"),
        height: "auto",
    },
    info_icon: {
        color: "black",
        width: wp("5%"),
        height: wp("5%"),
        marginRight: wp("1%")
    },
    more_icon: {
        marginRight:-10,
        color: "#aa5766",
        width: wp("5%"),
        height: wp("5%"),
        alignSelf: "flex-end"
    },
    //--------REVIEWS
    profile_content: {
        padding: wp("1%"),
        marginBottom: hp("1%"),
        borderRadius: 3,
        backgroundColor: "#E5E3E3",
        width: wp("92%"),
        height: "auto",
        marginLeft: wp("1.5%")
    },
    reviews_pic: {
        marginLeft: wp("0.5%"),
        marginRight: wp("2%"),
        width: wp("15%"),
        height: wp("15%")
    },
    reviews_txt: {
        height: "auto",
        width: wp("70%")
    },
    reviews_txt_l: {
        height: hp("6%"),
        width: wp("75%"),
        marginBottom: hp("1%"),
        flexDirection: "row"
    },
    like_btn: {
        height: wp("7%"),
        width: wp("10%"),
        color: "darkgray",
        marginLeft: wp("1%")
    },
    stars_review_full: {
        height: wp("5%"),
        width: wp("5%"),
        color: "#E1D200"
    },
    stars_review_empty: {
        height: wp("5%"),
        width: wp("5%"),
        color: "silver"
    }
});

export default styles_wine;
