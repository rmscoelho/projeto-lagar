import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import Logo from "../icons/user-circle.svg";
import LockIcon from "../icons/lock-solid.svg";
import LogForm from "../components/LoginRegisterComponents/logForm";
import BtnForm from "../components/LoginRegisterComponents/btnForm";
import BtnFormSocial from "../components/LoginRegisterComponents/btnFormSocial";
import FaceIcon from "../icons/facebook.svg";
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Google from '../icons/search.svg'
import {CaixaTexto} from "../components/Comum/CaixaTexto";
import firebase from "react-native-firebase";

export default class LoginScreen extends Component {
    state = {email: '', password: '', errorMessage: null};

    handleLogin = () => {
        console.log('handleLogin');
        const {email, password} = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Feed'))
            .catch(error => this.setState({errorMessage: error.message}))
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.errorMessage && <Text style={{color: 'red'}}> {this.state.errorMessage}</Text>}

                <View style={{alignItems: 'center', alignContent: 'center', height: 700}}>
                    <Image style={{resizeMode: 'contain', height: 20 + '%', width: 95 + '%'}}
                           source={require('../icons/lagar.png')}/>
                    <View style={styles.caixaLogIn}>
                        <Logo width={80} height={80} color={'#FFF'}/>
                        <Text sytle={styles.textoCaixaLogIn}>Já tem conta? Inicie sessão para entrar</Text>
                        <View style={styles.infoLogIn}>
                            <CaixaTexto
                                icone={<Logo style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>}
                                tipo='Email'
                                value={this.state.email}
                                onChangeText={text => this.setState({email: text})}
                            />
                            <CaixaTexto
                                icone={<LockIcon style={styles.icon} width={20} height={20} color={'#BEBEBE'}/>}
                                tipo='Password'
                                seguranca
                                value={this.state.password}
                                onChangeText={text => this.setState({password: text})}
                            />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('RecoverPassword')}>
                                <Text style={{alignSelf: 'center', color: '#aa5766', fontSize: 12, marginBottom: 8}}>Esqueceu-se
                                    da sua
                                    palavra-passe?</Text>
                            </TouchableOpacity>
                            <BtnForm funcao={this.handleLogin}
                                     estiloAplicar={styles.customBtnBGNo} estiloTexto={styles.customBtnTextSocial}
                                     btnText={'ENTRAR'}/>
                            <View style={{alignSelf: 'center', textAlign: 'center', marginBottom: 5, marginTop: 10}}>
                                <Text sytle={styles.textoCaixaLogIn}>Entrar com:</Text>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                alignSelf: 'center',
                                width: 100 + '%',
                                marginBottom: 12
                            }}>

                                <View  style={{paddingRight:20}}>
                                <BtnFormSocial
                                    tipoSocial={<FaceIcon style={styles.btnIcon} width={48} height={48}
                                                          color={'#ffffff'}/>}
                                    chamaFuncao={() => {
                                        facebookLogin()
                                    }}
                                />
                                </View>
                                <View>
                                <TouchableOpacity onPress={() => googleLogin()}>
                                <Google
                                    style={{width: 48, height: 48}}
                                    />
                                </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Register')}
                            ><Text style={{
                                alignSelf: 'center',
                                color: '#aa5766',
                                fontSize: 14,
                                marginTop: 15,
                                marginBottom: 10
                            }}>Não
                                tem
                                conta? Registe-se!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E4DADB',
        flex: 1
    },
    caixaLogIn: {
        paddingBottom: 8,
        width: 95 + '%',
        borderRadius: 3,
        borderWidth: 0,
        alignItems: 'center'
    },
    infoLogIn: {
        width: 80 + '%',
        marginTop: 10
    },
    textoCaixaLogIn: {
        color: '#BEBEBE',
        fontWeight: '900',
        marginTop: 50
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        width: 100 + '%',
        borderWidth: 0,
        borderRadius: 3,
        marginBottom: 8,
    },
    icon: {
        padding: 10,
        margin: 5
    },
    btnIcon: {
        padding: 10,
        margin: 5,
        alignSelf: 'center',
    },
    caixaInput: {
        height: 40,
        width: 80 + '%',
        borderWidth: 0,
        borderRadius: 3,
        color: '#F7F4F4'
    },

    customBtnTextSocial: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        color: "#fff",
        padding: 5,
    },

    /* Here, style the background of your button */
    customBtnBGSocial: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 8,
        flexDirection: 'row',
        width: 100 + '%',
        backgroundColor: "#aa5766",
        paddingVertical: 5,
        borderRadius: 3,
    },
    alinharCentro: {
        alignSelf: 'center'
    },
    customBtnBG: {
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: "#BEBEBE",
        paddingVertical: 5,
        borderRadius: 3,
    },
    customBtnBGNo: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 15,
        flexDirection: 'row',
        width: 50 + '%',
        backgroundColor: "#aa5766",
        paddingVertical: 5,
        borderRadius: 3,
    }
});


let vamosVer = true;

// Calling the following function will open the FB login dialogue:
async function facebookLogin() {

    let verSeTemContaFacebook = '';
    try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            vamosVer = false;
            // handle this however suites the flow of your app
            throw new Error('User cancelled request');
        }

        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            vamosVer = false;
            // handle this however suites the flow of your app
            throw new Error('Something went wrong obtaining the users access token');
        }

        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);


        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

        console.log('Login com credencial: ' + JSON.stringify(firebaseUserCredential.user.toJSON()));

        console.log('uid do facebook: ' + firebaseUserCredential.user.uid);
        verSeTemContaFacebook = firebaseUserCredential.user.uid;
        let username = 'nooop';
        vamosVer = true;
        //-------------------------------------------------------------------------------------------//
        /*const idk = firebase.database().ref().child('users').child(firebaseUserCredential.user.uid);
        console.log('o link ou o que é:' + idk);
        idk.on('value', snapshot => {
            username = JSON.stringify(snapshot.val() && snapshot.val().uid);
            console.log('dentro da idk: ' + JSON.stringify(snapshot.val()));

        });*/

        //-----------------------------------------------------------//
        //-----------------------------------------------------------//
        return firebaseUserCredential;
        //-----------------------------------------------------------//
        //-----------------------------------------------------------//
    } catch (e) {
        console.log(e);
        vamosVer = false;
    } finally {

    }
}


async function googleLogin() {
    try {
        // add any configuration settings here:
        await GoogleSignin.configure({
            scopes: [], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '399755679720-67gtr6h3irffniqr5bnlvb12ieucbg09.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
            accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });

        const data = await GoogleSignin.signIn();

        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));


        vamosVer = true;
        return firebaseUserCredential;
    } catch (e) {
        vamosVer = false;
        console.log(e);
    }

}


