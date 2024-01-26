import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import MenuButton from "../components/MenuButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Arrow_back from "../icons/geral/arrow_left.svg";

import styles_gen from "../components/Styles_gen";

export default class MudarPass extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <ScrollView style={styles.viewview}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles_gen.content_arrow}>
          <View>
            <TouchableOpacity onPress={() => goBack()}>
              <Arrow_back style={styles_gen.arrow} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content_first}>
          <View style={styles.content}>
            <Text>IOLA</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewview: {
    flex: 1,
    backgroundColor: "#E5DBDC"
  },
  content_first: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  content: {
    marginTop: hp("10%"),
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
  }
});
