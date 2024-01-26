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

const styles_cam = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5DBDC"
  },
  content: {
    width: wp("95%"),
    height: "auto",
    minHeight: hp("90%"),
    backgroundColor: "#F9F9F9",
    margin: wp("3%"),
    marginTop: hp("10%"),
    marginBottom: 5,
    borderRadius: 3,
    paddingBottom: 25
  },
  arrow: {
    color: "#A8A8A8",
    marginTop: 5,
    marginLeft: wp("1.5%"),
    width: wp("5%"),
    height: hp("5%")
  },
  title: {
    height: hp("7%"),
    flexDirection: "row",
    marginLeft: wp("1.5%"),
    justifyContent: "center",
    alignItems: "center"
  },
  camara_icon: {
    color: "#A7505F",
    width: wp("7%"),
    height: wp("7%"),
    marginRight: wp("1.5%")
  },
  camara_title_txt: {
    fontSize: wp("6%"),
    color: "#000",
    fontWeight: "bold"
  },
  capturas_anteriores_btn: {
    flexDirection: "row",
    backgroundColor: "#E5E3E3",
    borderRadius: 3,
    marginLeft: wp("1.5%"),
    width: wp("45%"),
    height: hp("4%"),
    alignItems: "center",
    justifyContent: "center"
  },
  capturas_anteriores_icon: {
    color: "#000",
    width: wp("4%"),
    height: wp("4%"),
    marginRight: wp("1.5%")
  },
  capturas_anteriores_txt: {
    fontSize: wp("4%"),
    color: "#000"
  },

  camara_space: {
    marginTop: hp("1%"),
    width: wp("95%"),
    height: hp("60%")
  },
  capture: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: 100 / 2,
    backgroundColor: "#A7505F",
    justifyContent: "center",
    alignItems: "center"
  },
  camara_capture: {
    color: "#fff",
    width: wp("10%"),
    height: wp("10%"),
    marginLeft: wp("1.5%"),
    marginRight: wp("1.5%")
  }
});

export default styles_cam;
