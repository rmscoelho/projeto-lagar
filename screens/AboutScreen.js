import React, {Component} from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import MenuButton from "../components/MenuButton";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

import Arrow_back from "../icons/geral/arrow_left.svg";

import styles_gen from "../components/Styles_gen";

export default class AboutScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.viewview}>
                <MenuButton navigation={this.props.navigation}/>
                <View style={styles_gen.content_arrow}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                            <Arrow_back style={styles_gen.arrow}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content_first}>
                    <View style={styles.content}>
                        <Image
                            source={require("../icons/extra_assets/logo1.png")}
                            style={{width: 100, height: 100, marginTop: 20}}
                        />
                        <View style={{width: 95 + "%"}}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "black",
                                    padding: 5,
                                    marginTop: 5,
                                    paddingBottom: 10
                                }}
                            >
                                A Lagar proporciona, a toda comunidade vinícola e seus seguidores, uma experiência
                                singular pelo mundo
                                da enologia simplificando o acesso a toda a informação sobre vinhos portugueses aos seus
                                utilizadores.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
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
        alignItems: "center"
    },
    content: {
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
