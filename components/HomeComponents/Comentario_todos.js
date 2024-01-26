import React from "react";
import Heart from "../../icons/home_assets/heart.svg";
import { Text, View, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Plus from "../../icons/home_assets/plus.svg";
import styles_home from "../HomeComponents/Styles_home";

export default class Comentario extends React.Component {
  render() {
    return (
      <View style={styles_home.viewgeral_comentario}>
        <Image
          source={require("../../icons/geral/placeholder.png")}
          style={styles_home.placeholder}
        />
        <View style={styles_home.view_dados}>
          <View>
            <Text style={{ fontSize: 17 }}>Mary Serry</Text>
            <Text style={{ fontSize: 10, color: "black" }}>
              19-10-2018 23:02
            </Text>
          </View>
          <View style={styles_home.view_coment}>
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <View style={{ alignItems: "flex-start", width: wp("60%") }}>
                <Text style={{ color: "black" }}>Ewwwwww vinho tinto!</Text>
              </View>
              <View style={styles_home.view_heart}>
                <Heart style={styles_home.heart} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
