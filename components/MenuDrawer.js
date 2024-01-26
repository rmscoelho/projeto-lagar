import React, {Component} from "react";
import {BackHandler, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SignoutIcon from "../icons/sign-out-alt-solid.svg";
import HomeIcon from "../icons/wine-glass-alt-solid.svg";
import ScanIcon from "../icons/camera-solid.svg";
import EventsIcon from "../icons/events_assets/calendar-alt-solid.svg";
import SearchIcon from "../icons/search-solid.svg";
import IconUser from "../icons/user-circle.svg";
import SettingsIcon from "../icons/extra_assets/settings.svg";
import IconNotifications from "../icons/barrel.svg";
import {connect} from "react-redux";
import firebase from "react-native-firebase";
import store from "../store";
import {addUser, showUser} from "../store/actions";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


const db = firebase.firestore();

let foto = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
let rankingUser = '';
let nome = '';
let userUid = '';
let navigation = '';


class MenuDrawer extends Component {
    state = {
        refresh: false
    };

    componentWillMount() {
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user && prevProps.user.photo !== this.props.user.photo) {
            this.setState({refresh: true})
        }
    }

    componentDidMount() {

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Feed');
        return true;
    };

    navLink(nav, text, icone) {
        switch (icone) {
            case "HomeIcon":
                iconDadoo = <HomeIcon width={26} height={26} color={"gray"}/>;
                break;

            case "ScanIcon":
                iconDadoo = <ScanIcon width={24} height={24} color={"gray"}/>;
                break;

            case "EventsIcon":
                iconDadoo = <EventsIcon width={24} height={24} color={"gray"}/>;
                break;

            case "SearchIcon":
                iconDadoo = <SearchIcon width={24} height={24} color={"gray"}/>;
                break;

            case "IconUser":
                iconDadoo = <IconUser width={24} height={24} color={"gray"}/>;
                break;
            case "SettingsIcon":
                iconDadoo = <SettingsIcon width={24} height={24} color={"gray"}/>;
                break;

            default:
                <Text/>;
                break;
        }
        return (
            <TouchableOpacity
                style={{
                    height: 60,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => {
                    this.props.navigation.navigate(nav, {'moreMore': true});
                }}
            >
                {iconDadoo}
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>

        );
    }

    render() {
        {
            if (this.state.refresh === true) {
                userUid = this.props.user.userUid;
                foto = this.props.user.photo;
                rankingUser = this.props.user.rank;
                nome = this.props.user.name;
                navigation = this.props.navigation;

            }
        }


        const sendID = (userUid, navigation) => {
            db.collection('users').doc(userUid).onSnapshot(function (doc) {
                store.dispatch(showUser(doc.data()));
            });
            navigation.navigate('Profile')
            /* db.collection('users').doc(userUid).get()
                .then(docSnapshot => {
                    store.dispatch(showUser(docSnapshot.data()));
                }).then(
                navigation.navigate('Profile'),
            );*/
        };

        const goNotifications = (userUid, navigation) => {
            db.collection('users').doc(userUid).onSnapshot(function (doc) {
                store.dispatch(addUser(doc.data()));
            });
            navigation.navigate('Notifications')
            /* db.collection('users').doc(userUid).get()
                .then(docSnapshot => {
                    store.dispatch(showUser(docSnapshot.data()));
                }).then(
                navigation.navigate('Profile'),
            );*/
        };

        return (
            <ScrollView>
                {this.state.refresh ? (
                    <View style={styles.container}>
                        <View style={styles.topLinks}>
                            <View style={styles.profile}>
                                <TouchableOpacity onPress={() => {
                                    sendID(userUid, navigation);

                                }} style={{alignItems: 'center', flexDirection: 'row'}}>
                                    <View style={styles.imgView}>
                                        <Image
                                            style={styles.img}
                                            source={{uri: foto}}
                                        />
                                    </View>

                                    <View style={styles.profileText}>
                                        <Text style={styles.name}>{nome}</Text>
                                        <Text
                                            style={{
                                                fontSize: 19,
                                                paddingBottom: 5,
                                                color: "white",
                                                textAlign: "left",
                                                alignItems: "center",
                                                alignContent: "center",
                                            }}
                                        >{rankingUser}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        goNotifications(userUid, navigation);
                                    }}
                                    style={{
                                        alignSelf: "flex-end",
                                        justifyContent: "center",
                                        paddingRight: wp('2%'),
                                    }}
                                >
                                    <View style={{justifyContent: "center", alignItems: "center", width:8+'%', flexDirection:'row', alignSelf:'flex-end', paddingRight:wp('2%')}}>
                                        <IconNotifications
                                            style={{marginLeft: 5, marginBottom: 10}}
                                            width={30}
                                            height={30}
                                            fill={"white"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bottomLinks}>
                            {this.navLink("Feed", "Feed", "HomeIcon")}
                            {this.navLink("Camara", "Scan", "ScanIcon")}
                            {this.navLink("Events", "Eventos", "EventsIcon")}
                            {this.navLink("Search", "Pesquisa", "SearchIcon")}
                            {this.navLink("Settings", "Definições", "SettingsIcon")}
                        </View>
                        <View style={styles.topLinks2}>
                            <View style={styles.profile2}>
                                <View style={{alignItems: 'center'}}>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            backgroundColor: '#aa5766',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            firebase.auth().signOut()
                                        }}
                                    >
                                        <View style={{justifyContent: 'center'}}>

                                            <SignoutIcon
                                                style={{marginLeft: 18}}
                                                width={25}
                                                height={25}
                                                color={"#FFF"}
                                            />
                                        </View>
                                        <View style={{justifyContent: 'center'}}>
                                            <Text style={{marginLeft: 4, fontSize: 18, color: "white"}}>
                                                Terminar Sessão
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                    </View>
                ) : (
                    <Text>Não há user ainda</Text>
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#aa5766",
        height: hp('100%')
    },
    topLinks: {
        height: 120,
        backgroundColor: "#aa5766",
        justifyContent: "center"
    },
    topLinks2: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: hp('10%'),
        backgroundColor: "#aa5766",
        justifyContent: "center",
        alignItems: 'center'

    },
    bottomLinks: {
        paddingLeft: 18,
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 15 + '%',
    },
    link: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 2,
        margin: 5,
        textAlign: "left"
    },
    profile: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        paddingTop: 25,
    },
    profile2: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'flex-start',

    },
    imgView: {
        paddingLeft: 20,
        paddingRight: 20
    },
    imgView2: {
        paddingLeft: 20,
        paddingRight: 20
    },
    img: {
        height: 70,
        width: 70,
        borderRadius: 3
    },
    profileText: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        width:45+'%',
        paddingRight:5
    },
    name: {
        fontSize: 20,
        paddingBottom: 5,
        color: "white",
        textAlign: "left"
    },
    icons: {
        flexDirection: "row",
        alignItems: "center"
    },
    footer: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#aa5766"
    },
    description: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16
    },
    version: {
        flex: 1,
        textAlign: "right",
        marginRight: 20,
        color: "gray"
    },
    bottomSair: {
        flexDirection: "row",
        alignItems: "center"
    }
});

function mapStateToProps(state) {

    return {
        seeVisitedUser: state.seeVisitedUser,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(MenuDrawer);