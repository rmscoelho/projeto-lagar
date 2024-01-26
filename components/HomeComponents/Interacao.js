import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Comment from "../../icons/home_assets/comment.svg";

const Interacao = ({numLikePost, deuLikePost, darumLikePost, postUidPost, comentariosTamanhoPost}) => (
    <View style={styles.view_interacao}>
        {console.log('o q é isto: ', darumLikePost)}
        <View style={{flexDirection: "row"}}>
            <Comment style={styles.comment_int}/>
            <Text style={{marginLeft: 3, fontSize: 17}}>{comentariosTamanhoPost}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    view_interacao: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 10
    },
    heart_int: {width: 25, height: 25, color: "#A65168"},
    comment_int: {
        width: 24,
        height: 24,
        color: "#8D8D8D"
    }
});

export default Interacao;