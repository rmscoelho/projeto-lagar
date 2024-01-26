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

const styles_alert = StyleSheet.create({
  content_arrow: {
    justifyContent:'center',
    alignItems:'center',
    width: wp("95%"),
    height: "auto",
    backgroundColor: "#F9F9F9",
    margin: wp("2.5%"),
    marginTop: hp("10%"),
    marginBottom: 5,
    borderRadius: 3,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,

    elevation: 4
  },
  content_alert: {
    width: wp("95%"),
    height: hp("15%"),
    backgroundColor: "#F9F9F9",
    margin: wp("2.5%"),
    marginTop: hp("1.5%"),
    marginBottom: 5,
    borderRadius: 3,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,

    elevation: 4
  },
  //----------HEADER-----------------
  header_alert: {
    width:95 + '%',
    flexDirection: "row",
    height: hp("8%"),
    marginTop: wp("1.5%")
  },
  user_img: {
    height: wp("12%"),
    width: wp("12%"),
    marginLeft: wp("1.5%"),
  },
  header_txt_box: {
    flexDirection: "column",
    width: wp("66%"),
    marginRight: wp("2%"),
    alignItems: "flex-start"
  },
  person_name: {
    color: "#000",
    fontSize: wp("4%"),
    fontWeight: "bold"
  },
  other_txt: {
    color: "#000",
    fontSize: wp("3.5%")
  },
  wine_txt: {
    color: "#A7505F",
    fontSize: wp("4.5%"),
    width: wp("66%")
  },
  icons: {
    height: wp("6%"),
    width: wp("6%"),
    color: "#A7505F"
  },
  //---------------CONTENT--------------------
  comment_alert: {
    flexDirection: "row",
    height: hp("10.5%"),
    marginTop: wp("1.5%")
  },
  comment_txt_box: {
    width: wp("75%"),
    marginLeft: wp("1.5%")
  },
  comment_txt: {
    color: "#000",
    fontSize: wp("3.5%"),
    marginBottom: wp("1.5%")
  },
  comment_date: {
    color: "#959595",
    fontSize: wp("3%"),
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  wine_img: {
    height: wp("15%"),
    width: wp("15%"),
    marginLeft: wp("2%")
  }
});

export default styles_alert;
