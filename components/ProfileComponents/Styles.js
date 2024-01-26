/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5DBDC"
    },
    content: {
        width: wp("95%"),
        height: "auto",
        minHeight: hp("85%"),
        backgroundColor: "#F9F9F9",
        margin: wp("3%"),
        marginTop: hp("10%"),
        marginBottom: hp("1%"),
        paddingBottom: hp("2%"),
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.35,
        shadowRadius: 3,

        elevation: 4,
    },
    arrow: {
        color: "#A8A8A8",
        marginTop: 5,
        marginLeft: wp("1.5%"),
        width: wp("5%"),
        height: hp("5%")
    },
    profile_pic: {
        width: wp("18%"),
        height: wp("18%"),
        marginLeft: wp("1.5%")
    },
    profile_navigation: {
        borderTopWidth: 0.8,
        borderTopColor: "#808080",
        borderBottomWidth: 0.8,
        borderBottomColor: "#808080",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 5,
        justifyContent: "space-between"
    },
    profile_content: {
        flexDirection: "row",
        paddingBottom: hp("1%"),
    },
    profile_title_txt: {
        fontSize: wp("6%"),
        color: "#A7505F",
        fontWeight: "bold",
        marginLeft: wp("2%"),
        marginBottom: hp("1%")
    },

    // wine pics---------------

    wines_pic_l: {
        marginLeft: wp("2%"),
        width: wp("29%"),
        height: wp("29%"),
        borderRadius: 3,
        borderColor: "#808080",
        borderWidth: 0.3
    },
    wines_pic_c: {
        marginLeft: wp("2%"),
        width: wp("29%"),
        height: wp("29%"),
        borderRadius: 3,
    },
    wines_pic_r: {
        marginLeft: wp("2%"),
        width: wp("29%"),
        height: wp("29%"),
        borderRadius: 3,
    },
    //-------------------------

    // wine textbox------------

    textbox_l: {
        marginTop: hp('1%'),
        marginLeft: wp("2%"),
        width: wp("29%"),
        maxHeight: hp("10%"),
        marginBottom: hp("2%"),
    },
    textbox_c: {
        marginTop: hp('1%'),
        marginLeft: wp("2%"),
        width: wp('26%'),
        maxHeight: hp("10%"),
        marginBottom: hp("2%"),
        flexDirection: 'row'
    },
    textbox_r: {
        marginRight: wp("2%"),
        width: wp("29%"),
        maxHeight: hp("10%"),
        marginBottom: hp("2%")
    },

    // wine text---------------

    wine_title: {
        fontSize: wp("4.5%"),
        color: "#2C2C2C",
        fontWeight: "bold",
        marginRight: wp("1.5%")
    },

    expand_content: {
        padding: 10,
        flexDirection: "row",
        height: hp("5%"),
        alignItems: "center"
    },

    expand_btn: {
        height: wp("4%"),
        width: wp("4%"),
        color: "#A7505F"
    },

    wines_txt: {
        color: "#707070",
        fontSize: wp("3.5%"),
        textAlign: "center",
        width: "auto",
        maxWidth: wp("29%")
    },

    //-------------------------

    username: {
        fontSize: 18,
        marginLeft: 10,
        color: "#000"
    },
    rankingUser: {
        fontSize: 19,
        paddingBottom: 5,
        color: "#000",
        textAlign: "left",
        alignItems: "center",
        alignContent: "center",
        marginLeft: wp("4%")
    },
    subscribe_num: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#A7505F"
    },
    subscribe: {
        fontSize: 15,
        color: "#A7505F"
    },

    subspace: {
        flexDirection: "row",
        marginTop: wp("1%"),
        width: wp("73%")
    },

    header_items: {
        alignItems: "center",
        flex: 1
    },

    follow_btn: {
        alignItems: "center"
    },

    subscription: {
        color: "#A7505F",
        width: hp("2.9%"),
        height: hp("2.9%")
    },
    not_subscription: {
        color: "#E5E3E3",
        width: hp("3%"),
        height: hp("3.2%")
    },

    profile_btn: {
        height: hp("6%"),
        justifyContent: "space-evenly",
        flex: 1
    },
    profile_btn_txt: {
        color: "#A7505F",
        fontSize: wp("5%"),
        textAlign: "center"
    },

    selected: {
        height: hp("6%"),
        justifyContent: "space-evenly",
        backgroundColor: "#E5E3E3",
        flex: 1
    },
    reviews_pic: {
        marginLeft: wp("2%"),
        width: wp("25%"),
        height: wp("25%"),
        borderRadius: 3,
        borderColor: "#808080",
        borderWidth: 0.3
    },
    reviews_txt: {
        height: 'auto',
        width: wp("70%")
    },
    reviews_txt_l: {
        height: 'auto',
        width: wp("45%"),
        marginRight: wp("4%"),
        marginBottom: hp("1%")
    },
    like_btn: {
        height: wp("5%"),
        width: wp("7%"),
        color: "#E5DBDC",
        marginLeft: wp("1%")
    },

    stars_full: {
        height: wp("5%"),
        width: wp("5%"),
        color: "#E1D200"
    },
    stars_empty: {
        height: wp("5%"),
        width: wp("5%"),
        color: "#959595"
    }
});

export default styles;
