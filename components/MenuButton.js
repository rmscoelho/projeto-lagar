import React, {Component} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import MenuIcon from "../icons/bars-solid.svg";

export default class MenuButton extends Component {
    render() {
        return (
            <View style={styles.header}>
                <MenuIcon
                    style={styles.menuButtonPosition}
                    width={30}
                    height={30}
                    color={"#FFF"}
                    onPress={() => this.props.navigation.toggleDrawer()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        zIndex: 1000000000000,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#aa5766",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.09,
        justifyContent: "center"
    },
    menuButtonPosition: {
        zIndex: 10,
        position: "absolute",
        left: 10
    }
});
