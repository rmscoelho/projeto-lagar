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

const styles_events = StyleSheet.create({
  scrollv: {
      flex: 1,
      paddingTop: hp("10%"),
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

    elevation: 4
  },
  descricao_evento: {
    flexDirection: "row",
    fontSize: 16,
    color: "black",
    paddingTop: 10
  },
  hr: {
    borderBottomColor: "#8D8D8D",
    borderBottomWidth: 0.8,
    width: 100 + "%",
    paddingTop: 10,
  },
  imagem_evento: {
    marginTop: 10,
    width: 100 + "%",
    height: hp("35%")
  },
  coment_princ: {
    fontSize: 18,
    textAlign: "left",
    paddingTop: 5
  },
  view_botao_eventos: {
    paddingTop: 10,
    paddingBottom: 10
  },
  foto_realizador: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
    borderRadius: 3
  },
  viewgeral_info_evento: {
    flexDirection: "row",
    width: 100 + "%"
  },
  dados: {
    alignItems: "flex-start",
    width: 100 + "%"
  },
  nome: {

    color:'#aa5766',
    fontSize: 20,

  },
  extra: {
    paddingTop:15,
    fontSize: 15,
    paddingLeft: 4
  },

  heart_int: { width: 25, height: 25, color: "#A65168" },
  comment_int: {
    width: 24,
    height: 24,
    color: "#8D8D8D"
  }
});

export default styles_events;
