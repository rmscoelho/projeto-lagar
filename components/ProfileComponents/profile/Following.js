import React from "react";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Styles from "../Styles.js";
import MenuButton from "../../MenuButton";
//SVG
import Arrow_back from "../../../icons/profile_assets/arrow_left.svg";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import firebase from "react-native-firebase";
import {connect} from "react-redux";
import store from "../../../store/index";
import {showUser} from "../../../store/actions";

const db = firebase.firestore();


let foto = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
let nome = '';
let following = '';
let followers = '';
let todosUser = [];
let navigation = '';
let userID = '';


class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            carregouUsers: false,
        };
    }


    componentDidUpdate(prevProps) {
        if (prevProps.seeVisitedUser !== this.props.seeVisitedUser) {
            this.setState({refresh: true})
        }
    }


    componentDidMount() {
        this.chamaUsers();
    }

    chamaUsers = () => {
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("users").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosUser.push(sandwich._data);
                });
            })
            .then(() => {
                this.setState({carregouUsers: true})
            })
    };


    render() {

        /* foto = this.props.seeVisitedUser.photo;
         nome = this.props.seeVisitedUser.name;*/
        following = this.props.seeVisitedUser.aSeguir;
        // followers = this.props.seeVisitedUser.seguindolhe;


        const hope = () => {

            if (following !== undefined) {
                following = following.length;
            }

        };


        const {goBack} = this.props.navigation;
        {
            hope()
        }
        return (
            <View style={Styles.container}>
                <MenuButton navigation={this.props.navigation}/>
                <ScrollView>
                    {this.state.carregouUsers && this.state.refresh ? (
                        <View style={Styles.content}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Feed')}>
                                <Arrow_back style={Styles.arrow}/>
                            </TouchableOpacity>

                            <View style={{justifyContent: "space-evenly", paddingTop: 5}}>
                                <Text style={Styles.profile_title_txt}>A seguir ({following})</Text>
                            </View>

                            <View>

                                {
                                    <FlatList data={this.props.seeVisitedUser.aSeguir}
                                              renderItem={this.renderFollowing}
                                              keyExtractor={(item, index) => item}
                                    />

                                }
                            </View>

                        </View>
                    ) : (
                        <Text>Não há user ainda</Text>

                    )}
                </ScrollView>
            </View>
        );
    }

    sendID = (userUid, navigation) => {
        db.collection('users').doc(userUid).get()
            .then(docSnapshot => {
                store.dispatch(showUser(docSnapshot.data()));
                console.log(userUid);
            }).then(
            navigation.navigate('Profile'),
        );
    };

    renderFollowing = ({item}) => {
        let pessoaASeguirNome = '';
        let pessoaASeguirFoto = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
        let pessoaASeguirId = '';
        console.log('item: ', item);
        /*   userID = this.props.seeVisitedUser.userUid;

             peepz = '';
             picta = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';*/

        todosUser.forEach(function (e) {
            if (e.userUid === item) {
                pessoaASeguirNome = e.name;
                pessoaASeguirFoto = e.photo;
                pessoaASeguirId = e.userUid
            }
        });


        return (
            <View style={{height: "auto", margin: hp("2%"), flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        this.sendID(pessoaASeguirId, this.props.navigation);
                    }}
                    style={{flexDirection: 'row', width: wp('80%')}}>
                    <Image
                        style={{height: hp('5%'), width: hp('5%')}}
                        source={{uri: pessoaASeguirFoto}}
                    />
                    <Text style={{
                        fontSize: wp('6%'),
                        marginLeft: wp('2%'),
                        marginRight: wp('2%'),
                        color: "#000"
                    }}>{pessoaASeguirNome}</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

function mapStateToProps(state) {
    return {
        seeVisitedUser: state.seeVisitedUser,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Following);
