import {connect} from 'react-redux';
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';
import store from "../store/index";
import {addUser} from "../store/actions/index";

const db = firebase.firestore();


class LoadingScreen extends Component {
    componentWillMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                db.collection('users').doc(firebase.auth()._user.uid).get()
                    .then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            store.dispatch(addUser(docSnapshot._data));
                        } else {
                            db.collection('users').doc(firebase.auth()._user.uid).set({
                                name: firebase.auth()._user.displayName,
                                photo: firebase.auth()._user.photoURL,
                                email: firebase.auth()._user.email,
                                notificacoes: [],
                                rank: 0,
                                reviews: [],
                                aSeguir: [],
                                seguindolhe: [],
                                vinhosAdega: [],
                                vinhosWish: [],
                                userUid: firebase.auth()._user.uid,
                                vinhosConsumidos: [],
                            }).then(() => this.meterNoRedux())
                        }
                    })
            }
            this.props.navigation.navigate(user ? 'Feed' : 'Login');
        });

    }

    meterNoRedux() {
        db.collection('users').doc(firebase.auth()._user.uid).get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    store.dispatch(addUser(docSnapshot._data));

                    this.props.navigation.navigate(user ? 'Feed' : 'Login');
                }
            })
    }


    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.text}>A encher pipas</Text>
                <ActivityIndicator size="large" color="#aa5766"/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
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
        name: state.name,
    }
}

export default connect(mapStateToProps, null)(LoadingScreen)