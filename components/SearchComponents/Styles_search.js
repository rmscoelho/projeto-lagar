import React from "react";
import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const styles_search = StyleSheet.create({
    title: {
        height: hp("7%"),
        flexDirection: "row",
        marginLeft: wp("1.5%"),
        justifyContent: "center",
        alignItems: "center"
    },
    title_small: {
        height: hp("5%"),
        flexDirection: "row",
        marginLeft: wp("1.5%"),
        marginTop: hp("1.5%"),
        justifyContent: "center",
        alignItems: "center"
    },
    search_icon: {
        color: "#A7505F",
        width: wp("7%"),
        height: wp("7%"),
        marginLeft: wp("1.5%"),
        marginRight: wp("1.5%")
    },
    search_title_txt: {
        fontSize: wp("7%"),
        color: "#000",
        fontWeight: "bold"
    },
    search_icon_small: {
        color: "#A7505F",
        width: wp("5.5%"),
        height: wp("5.5%"),
        marginLeft: wp("1.5%"),
        marginRight: wp("1.5%")
    },
    search_title_txt_small: {
        fontSize: wp("5.5%"),
        color: "#000",
        fontWeight: "bold"
    },
    search_content: {
        marginLeft: wp("1.5%")
    },
    search_options: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: hp('1.5%')
    },
    collapse_header: {
        flexDirection: "row",
        alignItems: "center"
    },
    subtitle: {
        height: hp("5%"),
        width: wp("65%"),
        flexDirection: "row",
        marginLeft: wp("1.5%"),
        marginBottom: wp("1.5%"),
        alignItems: "center"
    },
    subtitle_icon: {
        color: "#000",
        width: wp("5%"),
        height: wp("5%"),
        marginRight: wp("1.5%")
    },
    search_subtitle_txt: {
        fontSize: wp("5%"),
        color: "#000"
    },
    food: {
        borderRadius: 3,
        borderColor: "#A2A2A2",
        borderWidth: 1,
        width: wp("15%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    food_selected: {
        borderRadius: 3,
        borderColor: "#F9F9F9",
        borderWidth: 1,
        backgroundColor: "#D99FA9",
        width: wp("15%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    food_cat: {
        width: wp("12%"),
        height: wp("8%"),
        color: "#D99FA9"
    },
    food_cat_selected: {
        width: wp("12%"),
        height: wp("8%"),
        color: "#F9F9F9"
    },
    food_cat_txt: {
        fontSize: wp("3.5%"),
        color: "#272727"
    },
    more_icon: {
        color: "#000",
        width: wp("5%"),
        height: wp("5%"),
        alignSelf: "flex-end"
    },
    type: {
        borderRadius: 3,
        borderColor: "#A2A2A2",
        borderWidth: 1,
        width: wp("16%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    type_selected: {
        borderRadius: 3,
        borderColor: "#F9F9F9",
        borderWidth: 1,
        backgroundColor: "#D99FA9",
        width: wp("16%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    type_txt: {
        fontSize: wp("3.5%"),
        color: "#D99FA9"
    },
    type_txt_selected: {
        fontSize: wp("3.5%"),
        color: "#F9F9F9"
    },
    casta: {
        borderRadius: 3,
        borderColor: "#A2A2A2",
        borderWidth: 1,
        width: wp("16%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    casta_selected: {
        borderRadius: 3,
        borderColor: "#F9F9F9",
        borderWidth: 1,
        backgroundColor: "#D99FA9",
        width: wp("16%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    casta_txt: {
        fontSize: wp("3%"),
        color: "#D99FA9"
    },
    casta_txt_selected: {
        fontSize: wp("3%"),
        color: "#F9F9F9"
    },
    regiao: {
        borderRadius: 3,
        borderColor: "#A2A2A2",
        borderWidth: 1,
        width: wp("16%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    regiao_selected: {
        borderRadius: 3,
        borderColor: "#F9F9F9",
        borderWidth: 1,
        backgroundColor: "#D99FA9",
        width: wp("16%"),
        height: wp("10%"),
        justifyContent: "center",
        alignItems: "center"
    },
    regiao_txt: {
        fontSize: wp("3%"),
        color: "#D99FA9"
    },
    regiao_txt_selected: {
        fontSize: wp("3%"),
        color: "#F9F9F9"
    },
    btn_clear: {
        borderRadius: 3,
        borderColor: "#A7505F",
        borderWidth: 2,
        width: wp("40%"),
        height: hp("8%"),
        justifyContent: "center",
        alignItems: "center"
    },
    btn_clear_txt: {
        fontSize: wp("4%"),
        color: "#000"
    },
    btn_go: {
        borderRadius: 3,
        width: wp("40%"),
        height: hp("8%"),
        backgroundColor: "#A7505F",
        justifyContent: "center",
        alignItems: "center"
    },
    btn_go_txt: {
        fontSize: wp("4%"),
        color: "#fff"
    }
});

export default styles_search;
