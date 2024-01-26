import React, {Component} from 'react';
import {GoogleSignin} from "react-native-google-signin";
import {AccessToken} from "react-native-fbsdk";
import firebase from "react-native-firebase";

const chamarApiGoogle = () => {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '399755679720-67gtr6h3irffniqr5bnlvb12ieucbg09.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
};

export {chamarApiGoogle};

const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('resultado Booleano: ' + isSignedIn);
    if (!isSignedIn){
        //console.log('entrou onde nao devia');
        isSignedInFacebook();
        this.props.navigation.navigate('Login')
    }
    else{
        //this.getCurrentUser().finally(this.props.navigation.navigate('Home'));
        this.props.navigation.navigate('Login')
    }
};
export {isSignedIn};

const isSignedInFacebook = async () => {
    // get the access token
    const data = await AccessToken.getCurrentAccessToken();
    console.log('entrou na cena do facebook');
    if (!data) {
        console.log('nao tem data no');
        // handle this however suites the flow of your app
        this.props.navigation.navigate('Login');
    }else{
        console.log('afinal tem o data no facebook');
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        //-------------------------------------------------------------------------------------------//
        //------------------------EXPERIENCIA---------------------------------------------------------------------//
        console.log('confirma na BD:' );
        const id = credential;
        console.log('id ou not: '+ JSON.stringify(credential, null, 3));
        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        console.log('ver o firebaseUserCredential: ' + JSON.stringify(firebaseUserCredential.user.uid, null, 3));
        const id2= firebaseUserCredential.user.uid;
        const idk = firebase.database().ref().child('users').child(id2);
        let yolo = '';
        idk.on('value', snap => {
            const ceninha = JSON.stringify(snap.val(), null, 3);
            console.log('consegui converter?: ' + ceninha);
            yolo = ceninha;
        });
        console.log('yolo: ' + yolo);
        //-------------------------------------------------------------------------------------------//
        /*if (yolo=== '') {
          firebase
              .database()
              .ref('users/' + firebaseUserCredential.user.uid)
              .set({
                email: firebaseUserCredential.user.email,
                profile_picture: firebaseUserCredential.additionalUserInfo.profile.picture,
                name: firebaseUserCredential.user.displayName,
                idPhotos: true,
                fotos: true,
                likes: 4,
                comentariosFotosAmigos: true,
                comentariosFotos: true,
                following: true,
                followers: true,
                adega: true,
                whislist: true,
                reviews: true,
                helpfulReviews: true,
                notificacoes: true,
                comentariosNotificacoes: true,
              });
        }else
          console.log('ja estás na BD SORRY');*/
        //-------------------------------------------------------------------------------------------//
        //-------------------------------------------------------------------------------------------//
        this.props.navigation.navigate('Home');
    }

};
export {isSignedInFacebook};

const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    //console.log(JSON.stringify(currentUser));
    //console.log('caralho');
    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(currentUser.idToken, currentUser.accessToken);
    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    //console.log(JSON.stringify(firebaseUserCredential.user.uid));
    const id = firebaseUserCredential.user.uid;
    const idk = firebase.database().ref().child('users').child(id).child('name');
    idk.on('value', snap => {
        const ceninha = JSON.stringify(snap.val(), null, 3);
        console.log('consegui converter?: ' + ceninha);
    });

    this.setState({currentUser});
    this.setState({id});
};
export {getCurrentUser};

const getCurrentUserFacebook = async () => {};
export {getCurrentUserFacebook};


