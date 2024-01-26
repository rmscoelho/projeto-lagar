/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import styles_gen from "../components/Styles_gen.js";
import styles_cam from "../components/CameraComponents/Styles_cam.js";
import {RNCamera} from "react-native-camera";
import MenuButton from "../components/MenuButton";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
//SVG
import Camara_icon from "../icons/wineinfo_assets/wine-bottle-solid.svg";
import store from "../store";
import {showWine, whereAmI} from "../store/actions";
import {connect} from "react-redux";
import firebase from "react-native-firebase";
import {withNavigation} from 'react-navigation';

const db = firebase.firestore();

let todosCodigos = [];
let vinhoUid = '';

class CamaraScreen extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];

        this.state = {
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
                barcodeFinderVisible: true
            },
            vinhoEncontrado: true,
            styleButtonSearch: {
                width: wp("20%"),
                height: wp("20%"),
                borderRadius: 100 / 2,
                backgroundColor: "#A8A8A8",
                justifyContent: "center",
                alignItems: "center"
            },
            styleTextSearch: false,
            refrescado: false
        };
    }

    componentWillMount() {
        store.dispatch(whereAmI('Camara'));
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () =>
            this.setState({focusedScreen: false})
        );
        this.chamaCodigos();
    }

    chamarVinho = (vinhoUidProps, navigation) => {
        db.collection('vinhos').doc(vinhoUidProps).onSnapshot(function (doc) {
            store.dispatch(showWine(doc.data()))
        });
        this.props.navigation.navigate('WineInfo');
        this.colocarTdAZeros();
        /*  db.collection('vinhos').doc(vinhoUidProps).get()
              .then(docSnapshot => {
                  store.dispatch(showWine(docSnapshot.data()));
                  console.log(docSnapshot.data())

              }).then(
              this.props.navigation.navigate('WineInfo')
          );
          this.colocarTdAZeros();*/
    };

    chamaCodigos = () => {
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("vinhos").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosCodigos.push(sandwich._data);
                });
            });
        this.setState({refrescado: true})
    };

    colocarTdAZeros = () => {
        this.setState({
            vinhoEncontrado: true,
            styleButtonSearch: {
                width: wp("20%"),
                height: wp("20%"),
                borderRadius: 100 / 2,
                backgroundColor: "#A8A8A8",
                justifyContent: "center",
                alignItems: "center"
            },
            styleTextSearch: false,
            refrescado: true
        });
        vinhoUid = '';
        this.camera = null;
        this.barcodeCodes = [];
    };

    onBarCodeRead(scanResult) {
        //console.warn(scanResult.type);
        //console.log(typeof scanResult.type);    //é string
        //console.warn(scanResult.data);
        if (scanResult.data != null) {
            todosCodigos.forEach(function (elemento) {
                if (elemento.codigoBarras === scanResult.data) {
                    vinhoUid = elemento.vinhoUid;
                    //console.warn(elemento.nome)
                }
            });
            if (!this.barcodeCodes.includes(scanResult.data)) {
                this.barcodeCodes.push(scanResult.data);
                this.setState({
                    styleTextSearch: true, styleButtonSearch: {
                        width: wp("20%"),
                        height: wp("20%"),
                        borderRadius: 100 / 2,
                        backgroundColor: "#A65168",
                        justifyContent: "center",
                        alignItems: "center"
                    }, vinhoEncontrado: false
                })

                //console.warn('onBarCodeRead call');
            }
        }
        return;
    }

    render() {
        const {hasCameraPermission, focusedScreen} = this.state;
        // let boraLa = this.props.pageVisited[this.props.pageVisited.length - 2];
        return (
            <ScrollView style={styles_gen.container}>
                <MenuButton navigation={this.props.navigation}/>
                {focusedScreen ? (
                    <View style={{
                        width: wp("95%"),
                        height: "auto",
                        minHeight: hp("70%"),
                        backgroundColor: "#F9F9F9",
                        margin: wp("2.5%"),
                        marginTop: hp("10%"),
                        marginBottom: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3,
                        paddingBottom: hp("1%"),
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3
                        },
                        shadowOpacity: 0.35,
                        shadowRadius: 3,

                        elevation: 4
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            {/*<View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(boraLa)}>
                                <Arrow_back style={styles_gen.arrow}/>
                            </TouchableOpacity>
                        </View>*/}
                            <View style={{
                                height: hp("7%"),
                                flexDirection: "row",
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center'
                            }
                            }>
                                <Camara_icon style={styles_cam.camara_icon}/>
                                <Text style={styles_cam.camara_title_txt}>Captura de Código de Barras</Text>
                            </View>
                        </View>

                        <View style={styles_cam.camara_space}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.preview}
                                captureAudio={false}
                                barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                                barcodeFinderWidth={280}
                                barcodeFinderHeight={220}
                                barcodeFinderBorderColor="white"
                                barcodeFinderBorderWidth={2}
                                defaultTouchToFocus
                                flashMode={this.state.camera.flashMode}
                                mirrorImage={false}
                                onBarCodeRead={this.onBarCodeRead.bind(this)}
                                onFocusChanged={() => {
                                }}
                                onZoomChanged={() => {
                                }}
                                permissionDialogTitle={'Permission to use camera'}
                                permissionDialogMessage={'We need your permission to use your camera phone'}
                                type={this.state.camera.type}
                                onGoogleVisionBarcodesDetected={({barcodes}) => {
                                    console.log(barcodes);
                                }}
                            />
                        </View>

                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: hp("1%")
                            }}
                        >
                            {}
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    fontSize: wp("4%"),
                                    color: "#000",
                                    display: this.state.styleTextSearch ? 'flex' : 'none'
                                }}>Ver resultado da
                                    pesquisa</Text>
                                <TouchableOpacity
                                    style={this.state.styleButtonSearch}
                                    onPress={() => {
                                        this.chamarVinho(vinhoUid)
                                    }}
                                    disabled={this.state.vinhoEncontrado}
                                >
                                    <Camara_icon style={styles_cam.camara_capture}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>A tirar a rolha</Text>
                        <ActivityIndicator size="large" color="#aa5766"/>
                    </View>
                )}
            </ScrollView>
        );
    }

    takePicture = async function () {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        overflow: "hidden"
    }, container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4DADB',
    },
    text: {
        color: "#aa5766",
        fontSize: 30,
    },
});

function mapStateToProps(state) {
    return {
        vinho: state.vinho,
        pageVisited: state.pageVisited,

    }
}

export default withNavigation(connect(mapStateToProps, null)(CamaraScreen))