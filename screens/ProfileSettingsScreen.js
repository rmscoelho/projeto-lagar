import React, {Component} from "react";
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

import Arrow from "../icons/extra_assets/chevron-right-solid.svg";
import UserLock from "../icons/extra_assets/user-lock-solid.svg";
import InputText from "../components/ExtraComponents/InputText";
import InputTextMail from "../components/ExtraComponents/InputTextMail";
import InputTextPass from "../components/ExtraComponents/InputTextPass";
import Camera from "../icons/extra_assets/camera-solid.svg";
import Mail from "../icons/extra_assets/envelope-regular.svg";
import Lock from "../icons/extra_assets/lock-solid.svg";
import ImagePicker from "react-native-image-picker";
import Toggle from "../icons/extra_assets/toggle-on-solid.svg";
import IdIcon from "../icons/extra_assets/portrait-solid.svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import ToggleWishlist from "../components/ExtraComponents/ToggleWishlist";
import ToggleAdega from "../components/ExtraComponents/ToggleAdega";
import ToggleReviews from "../components/ExtraComponents/ToggleReviews";

import Arrow_back from "../icons/geral/arrow_left.svg";

import styles_gen from "../components/Styles_gen";

import firebase from 'react-native-firebase';

const db = firebase.firestore();
import {connect} from "react-redux";

const options = {
    title: "Selecionar Foto",
    takePhotoButtonTitle: "Tirar foto com a câmara",
    chooseFromLibraryButtonTitle: "Escolher foto da galeria"
};

class ProfileSettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: this.props.user.photo,
            text: this.props.user.name,
            text2: this.props.user.email
        };

    }

    componentDidMount() {
        console.log(this.props.user.photo);
    }

    static navigationOptions = {
        header: null
    };

    pickPhoto = () => {
        ImagePicker.showImagePicker(options, response => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                let source = response.uri;

                this.setState({
                    avatarSource: source
                });
            }
        });
    };

    render() {

        const guardarDados = () => {
            let id = this.props.user.userUid;
            db.collection('users').doc(id).update({
                name: this.state.text,
                email: this.props.user.email,
                photo: this.state.avatarSource,
            }).then(
                this.props.navigation.navigate('Settings')
            )
        };


        const {goBack} = this.props.navigation;
        return (
            <ScrollView style={styles.viewview}>
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
                        <View style={{paddingTop: 10, paddingBottom: 10}}>
                            <View style={{flexDirection: "row", alignItems: "flex-end"}}>
                                <Image style={styles.Avatar} source={{uri: this.state.avatarSource}}/>
                                <TouchableOpacity onPress={this.pickPhoto}>
                                    <Camera color={"gray"} width={20} height={20}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={{color: "black", fontSize: 18}}>{this.props.user.name}</Text>
                        </View>
                        <View style={styles.hr}/>
                        <View style={styles.ViewDefInfo}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <IdIcon width={25} height={25} color={"#A7505F"}/>
                                <TextInput style={{marginLeft: 10, fontSize: 18, color: 'black', padding: 0}}
                                           onChangeText={(text) => this.setState({text})}
                                           value={this.state.text}
                                />
                            </View>
                        </View>
                        <View style={styles.hr}/>
                        <View style={styles.ViewDefInfo}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Mail width={25} height={25} color={"#A7505F"}/>
                                <TextInput style={{marginLeft: 10, fontSize: 18, color: 'black', padding: 0}}
                                           onChangeText={(text2) => this.setState({text2})}
                                           value={this.state.text2}
                                />
                            </View>
                        </View>
                        <View style={styles.hr}/>
                        <View>
                            <TouchableOpacity onPress={() => guardarDados()} style={styles.BtnSave}>
                                <Text style={styles.TxtBtn}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}


export default connect(mapStateToProps, null)(ProfileSettingsScreen)

const styles = StyleSheet.create({
    viewview: {
        flex: 1,
        backgroundColor: "#E5DBDC"
    },
    hr: {
        borderBottomColor: "#8D8D8D",
        borderBottomWidth: 0.8,
        width: 100 + "%"
    },
    content_first: {
        alignContent: "center",
        alignItems: "center",
        marginBottom: 10
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
    },
    ViewPrin: {
        flexDirection: "row",
        paddingTop: 10,
        marginRight: "auto",
        marginLeft: 10,
        paddingBottom: 10,
        alignItems: "center"
    },
    Toggle: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginLeft: "auto"
    },
    Arrow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginLeft: "auto"
    },
    ViewDefInfo: {
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: "auto",
        marginLeft: 10,
        width: 95 + "%"
    },
    TxtBtn: {
        color: "white",
        fontSize: 18,
        padding: 5,
        textAlign: "center",
        alignItems: "center"
    },
    TxtInfo: {
        marginLeft: 10,
        fontSize: 18,
        color: "black",
        padding: 0
    },
    Avatar: {
        width: 100,
        height: 100,
        borderRadius: 3,
        marginRight: 3
    },
    BtnSave: {
        backgroundColor: "#aa5766",
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3
    }
});
