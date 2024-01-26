/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import Styles from "..Styles.js";

//SVG
import Arrow_back from "../../../icons/profile_assets/arrow_left.svg";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import Star_full from "../../../icons/profile_assets/star_full.svg";
import Star_empty from "../../../icons/profile_assets/star_empty.svg";
import Like_btn from "../../../icons/profile_assets/like_btn.svg";
import See_more from "../../../icons/profile_assets/see_more.svg";

type Props = {};
export default class Reviews_full extends Component<Props> {
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={Styles.container}>
        <MenuButton navigation={this.props.navigation} />
        <ScrollView>
          <View style={Styles.content}>
            <TouchableOpacity onPress={() => goBack()}>
              <Arrow_back style={Styles.arrow} />
            </TouchableOpacity>

            <View style={{ justifyContent: "space-evenly", paddingTop: 5 }}>
              <Text style={styles.profile_title_txt}>Reviews (0)</Text>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Tinto</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Branco</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Literalmente Água</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ justifyContent: "space-evenly", paddingTop: 5 }}>
              <Text style={styles.profile_title_txt}>Reviews (0)</Text>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Tinto</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Branco</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Literalmente Água</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ justifyContent: "space-evenly", paddingTop: 5 }}>
              <Text style={styles.profile_title_txt}>Reviews (0)</Text>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Tinto</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Branco</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Literalmente Água</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ justifyContent: "space-evenly", paddingTop: 5 }}>
              <Text style={styles.profile_title_txt}>Reviews (0)</Text>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Tinto</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Vinho Branco</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ height: "auto", marginBottom: hp("2%") }}>
              <TouchableOpacity>
                <View style={styles.expand_content}>
                  <Text style={styles.wine_title}>Literalmente Água</Text>
                  <See_more style={styles.expand_btn} />
                </View>
              </TouchableOpacity>

              <View style={styles.profile_content}>
                <Image
                  style={styles.reviews_pic}
                  source={require("../../../icons/profile_assets/placeholder.png")}
                />
                <View style={styles.reviews_txt}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: wp("4%")
                    }}
                  >
                    <View style={styles.reviews_txt_l}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        Meandro 2015
                      </Text>
                      <Text style={{ color: "#000", fontSize: wp("3%") }}>
                        15-01-2019 18:05
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#000", fontSize: wp("4%") }}>
                        0
                      </Text>
                      <TouchableOpacity>
                        <Like_btn style={styles.like_btn} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      marginLeft: wp("4%")
                    }}
                  >
                    <Text>
                      "Apesar de não ser das minhas regiões preferidas, gostei
                      bastante do vinho"
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_full style={styles.stars_full} />
                      <Star_empty style={styles.stars_empty} />
                      <Star_empty style={styles.stars_empty} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
