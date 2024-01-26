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

const styles_home = StyleSheet.create({
  scrollv: {
    flex: 1,
    paddingTop: hp("10%"),
    marginBottom: hp("0.5%")
  },
  content_first: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: hp("3%")
  },
  content: {
    paddingTop: 10,
    width: 95 + "%",
    height: "auto",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,

    elevation: 4,
    marginBottom: 30
  },

  coment_princ: {
    fontSize: 18,
    textAlign: "left",
    paddingTop: 10
  },
  view_botao: {
    width:20+'%',
    paddingTop: 10,
    paddingBottom: 10
  },
  //--------COMENTARIOS--------------------
  placeholder: {
    flexDirection: "row",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 3,
    marginLeft: 5
  },
  viewgeral_comentario: {
    flexDirection: "row",
    width: 95 + "%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#E5E3E3",
    marginTop: 10,
    borderRadius: 3,
    padding: 3
  },
  view_dados: {
    flexDirection: "column",
    paddingLeft: 5
  },
  view_coment: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "space-between",
    width: wp("100%")
  },
  view_heart: {
    width: wp("10%"),
    alignItems: "flex-end",
    paddingRight: 5,
    justifyContent: "center"
  },
  heart: {
    width: 22,
    height: 22,
    color: "#A65168"
  }
});

export default styles_home;
