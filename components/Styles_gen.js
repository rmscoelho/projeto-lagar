/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles_gen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5DBDC"
  },
  content: {
    width: wp("95%"),
    height: "auto",
    minHeight: hp("70%"),
    backgroundColor: "#F9F9F9",
    margin: wp("2.5%"),
    marginTop: hp("10%"),
    marginBottom: 5,
    borderRadius: 3,
    paddingBottom: hp("1%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,

    elevation: 4
  },
  arrow: {
    color: "#A8A8A8",
    marginTop: 5,
     marginLeft: wp("1.5%"),
    width: wp("5%"),
    height: hp("5%")
  },
    arrow_back: {
        color: "#A8A8A8",
        width: 24,
        height: 24
    },
    content_arrow: {
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
  }
});

export default styles_gen;
