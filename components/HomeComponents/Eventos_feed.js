import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import More from "../../icons/home_assets/more.svg";
import Info_evento from "../EventsComponents/Info_evento";
import Interacao_eventos from "../EventsComponents/Interacao_eventos";
import Moremore2 from "./Moremore2";

import styles_events from "../EventsComponents/Styles_events";

export default class Eventos_feed extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles_events.content}>
        <View style={{ width: 95 + "%" }}>
          <Info_evento />
          <View style={styles_events.hr} />
          <Text style={styles_events.descricao_evento}>
            {" "}
            A 5 minutos de Beja, a Herdade da Figueirinha situa-se no coração do
            Alentejo. Com 300 hectares de vinha e olival, dispõe de solos de
            excelente qualidade, e de uma óptima exposição solar para a produção
            de vinho e azeite. No centro do terreno agrícola erguem-se os
            edifícios que acolhem a Adega e Lagar.” A Herdade da Figueirinha,
            adquirida em 1998 pelo Comendador Leonel Cameirinha, e hoje sob a
            gestão do neto Filipe Cameirinha Ramos, une três gerações em torno
            da terra, da agricultura e da paixão pela cultura do vinho e do
            azeite. “A promessa da terra conquistou o coração e a vontade de um
            avô e neto. Dois homens, uma só paixão: a cultura do vinho e do
            azeite naquele pedaço de chão.
          </Text>
          <Image
            source={require("../../images/EventImg/evento1.jpg")}
            style={styles_events.imagem_evento}
          />
          <Interacao_eventos />
          <View style={styles_events.hr} />
        </View>
        <View style={styles_events.view_botao_eventos}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Moremore2")}
          >
            <More width={25} height={25} fill="#A65168" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
