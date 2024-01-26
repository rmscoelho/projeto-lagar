/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import See_more from "../../../icons/profile_assets/see_more.svg";

import styles from "../Styles.js";

const Adega = () => (
  <View>
    <View style={{ justifyContent: "space-evenly", paddingTop: 5 }}>
      <Text style={styles.profile_title_txt}>Adega (0)</Text>
    </View>

    <View style={{ height: "auto" }}>
      <TouchableOpacity>
        <View style={styles.expand_content}>
          <Text style={styles.wine_title}>Vinho Tinto</Text>
          <See_more style={styles.expand_btn} />
        </View>
      </TouchableOpacity>
      <View style={styles.profile_content}>
        <Image
          style={styles.wines_pic_l}
          source={require("../../../icons/profile_assets/placeholder.png")}
        />

        <Image
          style={styles.wines_pic_c}
          source={require("../../../icons/profile_assets/placeholder.png")}
        />

        <Image
          style={styles.wines_pic_r}
          source={require("../../../icons/profile_assets/placeholder.png")}
        />
      </View>

      <View style={styles.profile_content}>
        <View style={styles.textbox_l}>
          <Text style={styles.wines_txt}>
            The quick brown fox jumps over the lazy dog
          </Text>
        </View>

        <View style={styles.textbox_c}>
          <Text style={styles.wines_txt}>
            Quinta do Cardo Grande Escolha 2011
          </Text>
        </View>

        <View style={styles.textbox_r}>
          <Text style={styles.wines_txt}>
            Quinta do Cardo Grande Escolha 2011
          </Text>
        </View>
      </View>
    </View>

    <View style={{ height: "auto" }}>
      <TouchableOpacity>
        <View style={styles.expand_content}>
          <Text style={styles.wine_title}>Vinho Tinto</Text>
          <See_more style={styles.expand_btn} />
        </View>
      </TouchableOpacity>
      <View style={styles.profile_content}>
        <Image
          style={styles.wines_pic_l}
          source={require("../../../icons/profile_assets/placeholder.png")}
        />

        <Image
          style={styles.wines_pic_c}
          source={require("../../../icons/profile_assets/placeholder.png")}
        />

        <Image
          style={styles.wines_pic_r}
          source={require("../../../icons/profile_assets/placeholder.png")}
        />
      </View>

      <View style={styles.profile_content}>
        <View style={styles.textbox_l}>
          <Text style={styles.wines_txt}>
            The quick brown fox jumps over the lazy dog
          </Text>
        </View>

        <View style={styles.textbox_c}>
          <Text style={styles.wines_txt}>
            Quinta do Cardo Grande Escolha 2011
          </Text>
        </View>

        <View style={styles.textbox_r}>
          <Text style={styles.wines_txt}>
            Quinta do Cardo Grande Escolha 2011
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default Adega;
