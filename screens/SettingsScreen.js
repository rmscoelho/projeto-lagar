import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MenuButton from "../components/MenuButton";
import SettingsIcon from "../icons/extra_assets/settings.svg";
import User from "../icons/extra_assets/user-circle.svg";
import Arrow from "../icons/extra_assets/chevron-right-solid.svg";
import Info from "../icons/extra_assets/info-circle-solid.svg";
import Help from "../icons/extra_assets/question-circle-solid.svg";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export default class SettingsScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const {goBack} = this.props.navigation;
        return (
            <ScrollView style={styles.viewview}>
                <MenuButton navigation={this.props.navigation}/>

                <View style={styles.content_first}>
                    <View style={styles.content}>
                        <View style={{paddingTop: 20}}>
                            <SettingsIcon width={80} height={80} color={"#A7505F"}/>
                        </View>
                        <View style={styles.ViewPrin}>
                            <Text style={styles.TextDef}>Definições de Conta</Text>
                        </View>
                        <View style={styles.hr}/>
                        <View style={styles.ViewDefInfo}>
                            <TouchableOpacity
                                style={{flexDirection: "row", alignItems: "center"}}
                                onPress={() => {
                                    this.props.navigation.navigate("ProfileSettings");
                                }}
                            >
                                <View
                                    style={{flexDirection: "row", justifyContent: "flex-start"}}
                                >
                                    <User width={25} height={25} color={"#A7505F"}/>
                                    <Text
                                        style={{marginLeft: 10, fontSize: 18, color: "black"}}
                                    >
                                        Editar Informações de Conta
                                    </Text>
                                </View>
                                <View style={styles.Arrow}>
                                    <Arrow width={18} height={18} color={"#A7505F"}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hr}/>

                        <View style={styles.ViewPrin}>
                            <Text style={styles.TextDef}>Suporte</Text>
                        </View>
                        <View style={styles.hr}/>
                        <View style={styles.ViewDefInfo}>
                            <TouchableOpacity
                                style={{flexDirection: "row", alignItems: "center"}}
                                onPress={() => {
                                    this.props.navigation.navigate("About");
                                }}
                            >
                                <View
                                    style={{flexDirection: "row", justifyContent: "flex-start"}}
                                >
                                    <Info width={25} height={25} color={"#A7505F"}/>
                                    <Text
                                        style={{marginLeft: 10, fontSize: 18, color: "black"}}
                                    >
                                        Sobre
                                    </Text>
                                </View>
                                <View style={styles.Arrow}>
                                    <Arrow width={18} height={18} color={"#A7505F"}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.ViewSec}
                                onPress={() => {
                                    this.props.navigation.navigate("HelpContacts");
                                }}
                            >
                                <View
                                    style={{flexDirection: "row", justifyContent: "flex-start"}}
                                >
                                    <Help width={25} height={25} color={"#A7505F"}/>
                                    <Text
                                        style={{marginLeft: 10, fontSize: 18, color: "black"}}
                                    >
                                        Ajuda e Contactos
                                    </Text>
                                </View>
                                <View style={styles.Arrow}>
                                    <Arrow width={18} height={18} color={"#A7505F"}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    viewview: {
        flex: 1,
        backgroundColor: "#E5DBDC",
    },
    hr: {
        borderBottomColor: "#8D8D8D",
        borderBottomWidth: 0.8,
        width: 100 + "%"
    },
    content_first: {
        alignContent: "center",
        alignItems: "center",
        marginTop: hp("10%"),
    },
    content: {

        width: 95 + "%",
        minHeight: hp("52%"),
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
    ViewPrin: {
        flexDirection: "row",
        paddingTop: 20,
        marginRight: "auto",
        marginLeft: 10
    },
    TextDef: {
        fontWeight: "bold",
        fontSize: 18,
        color: "black"
    },
    ViewDefInfo: {
        paddingTop: 10,
        paddingBottom: 15,
        marginRight: "auto",
        marginLeft: 10,
        width: 95 + "%"
    },
    Arrow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginLeft: "auto"
    },
    ViewSec: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    Toggle: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginLeft: "auto"
    }
});
