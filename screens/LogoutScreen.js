import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MenuButton from "../components/MenuButton";
import Arrow_back from "../icons/geral/arrow_left.svg";

import styles_gen from "../components/Styles_gen";

export default class LogoutScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles_gen.content_arrow}>
          <View>
            <TouchableOpacity onPress={() => goBack()}>
              <Arrow_back style={styles_gen.arrow} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.text}>Logout</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  text: {
    fontSize: 30
  }
});
