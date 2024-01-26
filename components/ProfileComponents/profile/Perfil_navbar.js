/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "../Styles.js";
let verificar;
const Perfil_navbar = () => (
  <View style={styles.profile_navigation}>
    <TouchableOpacity style={styles.selected} verificar= {0}>
      <Text style={styles.profile_btn_txt}>Wishlist</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.profile_btn} >
      <Text style={styles.profile_btn_txt}>Adega</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.profile_btn}>
      <Text style={styles.profile_btn_txt}>Reviews</Text>
    </TouchableOpacity>
  </View>
);

export default Perfil_navbar;
