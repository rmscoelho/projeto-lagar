import React from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import styles_gen from "../components/Styles_gen.js";
import Styles from "../components/ProfileComponents/Styles.js";
import MenuButton from "../components/MenuButton";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Menu, {MenuDivider, MenuItem, Position} from "react-native-enhanced-popup-menu";
//SVG
import Arrow_back from "../icons/profile_assets/arrow_left.svg";
import Subscription from "../icons/profile_assets/subscribe.svg";
import Consumed_icon from "../icons/profile_assets/consumed.svg";

import Reviews from "../components/ProfileComponents/profile/Reviews.js";

import firebase from "react-native-firebase";
import {connect} from "react-redux";
import store from "../store";
import styles from "../components/ProfileComponents/Styles";
import {showUser, showWine, whereAmI} from "../store/actions";

const db = firebase.firestore();

let foto = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
let rankingUser = '';
let nome = '';
let following = '';
let followers = '';
let wishlistCount = '';
let adegaCount = '';
let reviewsCount = '';
let todosVinho = [];
let todosUser = [];
let nomeVinho = '';
let fotoVinho = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
let vinhoID = '';
let loggedUser = '';
let loggedID = '';
let vinhosConsumidos = [];
let navigation = '';

let userID = '';
let wineID = '';

let jaClicouAdega = false;
let jaClicouConsumido = false;
let jaDaFollow = false;

//WISHLIST
let jaDeuVinhotinto = false;
let jaDeuVinhobranco = false;
let jaDeuEspumante = false;
let jaDeuMoscatel = false;
let jaDeuRose = false;
let jaDeuVerde = false;
let jaDeuPorto = false;

//ADEGA
let AdegajaDeuVinhotinto = false;
let AdegajaDeuVinhobranco = false;
let AdegajaDeuEspumante = false;
let AdegajaDeuMoscatel = false;
let AdegajaDeuRose = false;
let AdegajaDeuVerde = false;
let AdegajaDeuPorto = false;
let samePerson = false;

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
            subscribe_btn: false,
            refresh: false,
            carregouVisitedUser: false,
            carregouUsers: false,
            carregouAdega: false,
            focusedScreen: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.seeVisitedUser !== this.props.seeVisitedUser) {
            this.setState({carregouVisitedUser: true});
            samePerson = true;

            if (prevProps.seeVisitedUser.name !== this.props.seeVisitedUser.name) {
                this.chamaVinhos();
            }
        }
        console.log('ele faz update msm q esteja noutra pagina??')
    }

    componentDidMount() {
        store.dispatch(whereAmI('Profile'));
        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () =>
            this.setState({focusedScreen: false})
        );
        this.chamaVinhos();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                loggedUser = user._user.displayName;
                loggedID = user._user.uid;
            }
        });

    }

    componentWillUnmount(): void {
        this.setState({
            screen: 0,
            subscribe_btn: false,
            refresh: false,
            carregouVisitedUser: false,
            carregouUsers: false,
            carregouAdega: false
        })
    }

    chamaVinhos = () => {
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("vinhos").get()
            .then((docSnapshot) => {

                docSnapshot.docs.forEach(function (sandwich, index) {

                    todosVinho.push(sandwich._data);

                });

                this.chamaUsers();
            })
    };

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

    goToWine(wineID, navigation) {

        db.collection('vinhos').doc(wineID).onSnapshot(function (doc) {
            store.dispatch(showWine(doc.data()));
        });
        navigation.navigate('WineInfo')
    }

    addAgega(wineID, userID) {

        vinhosAdega = this.props.seeVisitedUser.vinhosAdega;

        if (vinhosAdega.includes(wineID)) {
            Alert.alert('Já tem este vinho na Adega!');
            //this.setState({carregouAdega: true})

        } else {
            db.collection('users').doc(userID).update(
                {
                    vinhosAdega: firebase.firestore.FieldValue.arrayUnion(wineID)
                }
            ).then(db.collection('users').doc(userID).update(
                {
                    vinhosWish: firebase.firestore.FieldValue.arrayRemove(wineID)
                }
            )).then(
                Alert.alert('Vinho adicionado à tua Adega!'),
            ).finally(
                jaClicouAdega = true,
                //this.setState({refresh: true})
            )
        }

    }

    wineDelete(wineID, userID) {

        vinhosWishlist = this.props.seeVisitedUser.vinhosWish;

        db.collection('users').doc(userID).update(
            {
                vinhosWish: firebase.firestore.FieldValue.arrayRemove(wineID)
            }
        ).then(
            Alert.alert('Vinho removido da Wishlist!'),
        ).finally(
            console.log('lel')
            //this.setState({refresh: true})
        )

    }

    wineDeleteAdega(wineID, userID) {

        vinhosAdega = this.props.seeVisitedUser.vinhosAdega;

        db.collection('users').doc(userID).update(
            {
                vinhosAdega: firebase.firestore.FieldValue.arrayRemove(wineID)
            }
        ).then(
            Alert.alert('Vinho removido da Adega!'),
        ).finally(
            console.log('lel')
            //this.setState({refresh: true})
        )

    }

    addConsumido(wineID, userID) {

        vinhosCons = this.props.seeVisitedUser.vinhosConsumidos;

        if (vinhosCons.includes(wineID)) {
            Alert.alert('Este vinho já foi consumido!');
            //this.setState({refresh: true})

        } else {
            db.collection('users').doc(userID).update(
                {
                    vinhosConsumidos: firebase.firestore.FieldValue.arrayUnion(wineID)
                }
            ).then(
                Alert.alert('Vinho adicionado à lista de consumidos!'),
            ).finally(
                jaClicouConsumido = true,
                // this.setState({refresh: true})
            )
        }
    }

    render() {
        let boraLa = this.props.pageVisited[this.props.pageVisited.length - 2];
        console.log('boraLA: ', boraLa);
        const {focusedScreen} = this.state;

        foto = this.props.seeVisitedUser.photo;

        nome = this.props.seeVisitedUser.name;
        rankingUser = this.props.seeVisitedUser.rank;

        following = this.props.seeVisitedUser.aSeguir;
        followers = this.props.seeVisitedUser.seguindolhe;

        navigation = this.props.navigation;

        function hope() {

            if (following !== undefined) {
                following = following.length;
                if (followers !== undefined) {
                    followers = followers.length;
                }
            }
        };

        const addSub = (userID, loggedID) => {

            following = this.props.user.aSeguir;
            followers = this.props.seeVisitedUser.seguindolhe;

            if ((following.includes(userID) && followers.includes(loggedID)) || jaDaFollow) {
                db.collection('users').doc(userID).update(
                    {
                        seguindolhe: firebase.firestore.FieldValue.arrayRemove(loggedID)
                    }).then(db.collection('users').doc(loggedID).update(
                    {
                        aSeguir: firebase.firestore.FieldValue.arrayRemove(userID)
                    })).finally(jaDaFollow = false)
            } else {
                db.collection('users').doc(userID).update(
                    {
                        seguindolhe: firebase.firestore.FieldValue.arrayUnion(loggedID)
                    }).then(db.collection('users').doc(loggedID).update(
                    {
                        aSeguir: firebase.firestore.FieldValue.arrayUnion(userID)
                    })).finally(jaDaFollow = true)
            }


        };

        const subOrNot = (userID, loggedID) => {

            following = this.props.user.aSeguir;
            followers = this.props.seeVisitedUser.seguindolhe;

            if ((following.includes(userID) && followers.includes(loggedID)) || jaDaFollow) {
                return (
                    <Subscription style={styles.subscription}/>
                );
            } else {
                return (
                    <Subscription style={styles.not_subscription}/>
                )
            }
        };

        const handeSubIcon = () => {
            if (jaDaFollow === true) {
                this.setState({subscribe_btn: true})
            } else if (jaDaFollow === false) {
                this.setState({subscribe_btn: false})
            }
        };

        const goToFollowers = (userID, navigation) => {
            db.collection('users').doc(userID).get()
                .then(docSnapshot => {
                    store.dispatch(showUser(docSnapshot.data()));
                }).then(() => {
                    samePerson = false;
                    this.setState({
                        screen: 0,
                        subscribe_btn: false,
                        refresh: false,
                        carregouVisitedUser: false,
                        carregouUsers: false,
                        carregouAdega: false
                    })
                }
            )
                .then(
                    navigation.navigate('Followers')
                )

        };

        const goToFollowing = (userID, navigation) => {
            db.collection('users').doc(userID).get()
                .then(docSnapshot => {
                    store.dispatch(showUser(docSnapshot.data()));
                }).then(() => {
                    samePerson = false;
                    this.setState({
                        screen: 0,
                        subscribe_btn: false,
                        refresh: false,
                        carregouVisitedUser: false,
                        carregouUsers: false,
                        carregouAdega: false
                    })
                }
            )
                .then(
                    navigation.navigate('Following')
                )

        };

        const Header = ({
                            fotoProps = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', nomeProps, rankingUserProps,
                            followersProps, followingProps, loggedNameProps
                        }) => {
            return (
                <View style={{flexDirection: "row", marginBottom: 7}}>
                    <Image
                        style={styles.profile_pic}
                        source={{uri: fotoProps}}
                    />

                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.username}>{nomeProps}</Text>
                            <Text style={styles.rankingUser}>{rankingUserProps}</Text>
                        </View>

                        <View style={styles.subspace}>
                            <TouchableOpacity onPress={() => {
                                goToFollowers(userID, navigation);
                            }} style={styles.header_items}>
                                <Text style={styles.subscribe_num}>{followersProps}</Text>
                                <Text style={styles.subscribe}>Seguidores</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                goToFollowing(userID, navigation);
                            }} style={styles.header_items}>
                                <Text style={styles.subscribe_num}>{followingProps}</Text>
                                <Text style={styles.subscribe}>A Seguir</Text>
                            </TouchableOpacity>

                            <View style={styles.header_items}>

                                <SubscribeBtn loggedProps={loggedNameProps} userProps={nomeProps}/>

                            </View>
                        </View>
                    </View>
                </View>
            )
        };

        const SubscribeBtn = (loggedProps, userProps) => ({
            render() {
                if ((loggedProps.loggedProps) !== (loggedProps.userProps)) {

                    return (<TouchableOpacity onPress={() => {
                        addSub(userID, loggedID);
                        handeSubIcon();

                    }} style={styles.follow_btn}>
                        {subOrNot(userID, loggedID)}
                        <Text style={styles.subscribe}>Seguindo</Text>
                    </TouchableOpacity>)
                } else {
                    return (
                        <Text> </Text>
                    )
                }
            }
        });

        const {goBack} = this.props.navigation;
        return (
            <View style={styles_gen.container}>
                {hope()}
                <MenuButton navigation={this.props.navigation}/>
                <ScrollView>
                    {this.state.carregouVisitedUser && this.state.carregouUsers && focusedScreen || samePerson ? (

                            <View style={styles_gen.content}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('Feed')
                                }}>
                                    <Arrow_back style={styles_gen.arrow}/>
                                </TouchableOpacity>

                                <Header fotoProps={foto} nomeProps={nome} rankingUserProps={rankingUser}
                                        followersProps={followers} followingProps={following} loggedNameProps={loggedUser}/>

                                {this.renderTab()}

                            </View>)
                        : (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#E4DADB',
                                paddingTop: hp("50%")
                            }}>
                                <Text style={{
                                    color: "#aa5766",
                                    fontSize: 30,
                                }}>A decidir o que vou beber</Text>
                                <ActivityIndicator size="large" color="#aa5766"/>
                            </View>
                        )}
                </ScrollView>
            </View>
        );

    };

    renderTab() {

        wishlistCount = this.props.seeVisitedUser.vinhosWish.length;
        adegaCount = this.props.seeVisitedUser.vinhosAdega.length;
        reviewsCount = this.props.seeVisitedUser.reviews.length;
        navigation = this.props.navigation;
        userID = this.props.seeVisitedUser.userUid;


//--------------Wishlist---------------------------------------------------------------------------

        const whoAmI = () => {
            if (this.props.seeVisitedUser.name === loggedUser) {
                return (
                    <View>
                        <MenuItem onPress={() => {

                            this.addAgega(wineID, userID);

                        }}>Adicionar à Adega</MenuItem>
                        <MenuItem onPress={() => {

                            this.wineDelete(wineID, userID);

                        }}>Apagar</MenuItem></View>
                )
            } else return <Text> </Text>
        };

        const WishLoop = () => this.props.seeVisitedUser.vinhosWish.map((loop) => {

            const Titles = todosVinho.find(a => a.vinhoUid === loop);

            if (Titles) {
                const {tipoVinho, vinhoUid} = Titles;

                if (tipoVinho === "Tinto" && !jaDeuVinhotinto) {
                    jaDeuVinhotinto = true;

                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Vinho Tinto</Text>
                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <Tinto/>
                        </View>
                    </View>)

                }

                if (tipoVinho === "Branco" && !jaDeuVinhobranco) {
                    jaDeuVinhobranco = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Vinho Branco</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <Branco/>
                        </View>
                    </View>)

                }

                if (tipoVinho === "Espumante" && !jaDeuEspumante) {
                    jaDeuEspumante = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Espumante</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <Espumante/>
                        </View>
                    </View>)

                }

                if (tipoVinho === "Moscatel" && !jaDeuMoscatel) {
                    jaDeuMoscatel = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Moscatel</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <Moscatel/>
                        </View>
                    </View>)

                }

                if (tipoVinho === "Rose" && !jaDeuRose) {
                    jaDeuRose = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Rosé</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <Rose/>
                        </View>
                    </View>)

                }

                if (tipoVinho === "Verde" && !jaDeuVerde) {
                    jaDeuVerde = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Verde</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <Verde/>
                        </View>
                    </View>)

                }

                if (tipoVinho === "Porto" && !jaDeuPorto) {
                    jaDeuPorto = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Vinho do Porto</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <Porto/>
                        </View>
                    </View>)

                }

            }

        });

        const Tinto = () => this.props.seeVisitedUser.vinhosWish.map((id) => {


            const vinho = todosVinho.find(v => v.vinhoUid === id);

            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Tinto':

                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmI()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_l}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const Moscatel = () => this.props.seeVisitedUser.vinhosWish.map((id) => {

            let vinho = todosVinho.find(v => v.vinhoUid === id);
            /* let vinho = todosVinho.forEach(function (id) {
                 if(id===)
             });*/

            if (vinho) {

                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Moscatel':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmI()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_l}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const Verde = () => this.props.seeVisitedUser.vinhosWish.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Verde':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmI()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_l}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const Espumante = () => this.props.seeVisitedUser.vinhosWish.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Espumante':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmI()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_l}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const Rose = () => this.props.seeVisitedUser.vinhosWish.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Rose':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmI()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_l}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const Branco = () => this.props.seeVisitedUser.vinhosWish.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Branco':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmI()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_l}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const Porto = () => this.props.seeVisitedUser.vinhosWish.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Porto':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmI()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_l}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });
//---------------------------------------------------------------------------------------------

//--------------Adega---------------------------------------------------------------------------

        const whoAmIAdega = () => {

            if (this.props.seeVisitedUser.name === loggedUser) {
                return (
                    <View>
                        <MenuItem onPress={() => {
                            this.addConsumido(wineID, userID);
                        }}>Vinho Consumido</MenuItem>
                        <MenuItem onPress={() => {
                            this.wineDeleteAdega(wineID, userID);

                        }}>Apagar</MenuItem></View>
                )
            } else return <Text> </Text>
        };

        const DrinkIt = (wineidProps) => {

            return this.props.seeVisitedUser.vinhosConsumidos.map((item, key) => {

                if (item === wineidProps.wineidProps) {
                    return (
                        <Consumed_icon key={item}
                                       style={{
                                           color: "#A7505F",
                                           height: wp('6%'),
                                           width: wp('3%'),
                                           maxHeight: hp("6%"),
                                           marginBottom: hp("2%"),
                                           marginTop: hp('1%'),
                                           marginLeft: 0
                                       }}/>
                    );
                }
            });

        };

        const AdegaLoop = () => this.props.seeVisitedUser.vinhosAdega.map((loop) => {

            const Titles = todosVinho.find(a => a.vinhoUid === loop);

            if (Titles) {
                const {tipoVinho, vinhoUid} = Titles;

                if (tipoVinho === "Tinto" && !AdegajaDeuVinhotinto) {
                    AdegajaDeuVinhotinto = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Vinho Tinto</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <TintoAdega/>
                        </View>
                    </View>)

                } else if (tipoVinho === "Branco" && !AdegajaDeuVinhobranco) {
                    AdegajaDeuVinhobranco = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Vinho Branco</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <BrancoAdega/>
                        </View>
                    </View>)

                } else if (tipoVinho === "Espumante" && !AdegajaDeuEspumante) {
                    AdegajaDeuEspumante = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Espumante</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <EspumanteAdega/>
                        </View>
                    </View>)

                } else if (tipoVinho === "Moscatel" && !AdegajaDeuMoscatel) {
                    AdegajaDeuMoscatel = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Moscatel</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <MoscatelAdega/>
                        </View>
                    </View>)

                } else if (tipoVinho === "Rose" && !AdegajaDeuRose) {
                    AdegajaDeuRose = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Rosé</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <RoseAdega/>
                        </View>
                    </View>)

                } else if (tipoVinho === "Verde" && !AdegajaDeuVerde) {
                    AdegajaDeuVerde = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Verde</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <VerdeAdega/>
                        </View>
                    </View>)

                } else if (tipoVinho === "Porto" && !AdegajaDeuPorto) {
                    AdegajaDeuPorto = true;
                    return (<View key={vinhoUid} style={{height: "auto"}}>
                        <View>
                            <View style={styles.expand_content}>
                                <Text style={styles.wine_title}>Vinho do Porto</Text>

                            </View>
                        </View>

                        <View style={styles.profile_content}>
                            <PortoAdega/>
                        </View>
                    </View>)
                }

            }

        });

        const TintoAdega = () => this.props.seeVisitedUser.vinhosAdega.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Tinto':

                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmIAdega()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>

                                <View style={styles.textbox_c}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>

                                    <DrinkIt wineidProps={vinhoUid}/>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const MoscatelAdega = () => this.props.seeVisitedUser.vinhosAdega.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Moscatel':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmIAdega()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_c}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                    <DrinkIt wineidProps={vinhoUid}/>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const VerdeAdega = () => this.props.seeVisitedUser.vinhosAdega.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Verde':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmIAdega()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_c}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                    <DrinkIt wineidProps={vinhoUid}/>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const EspumanteAdega = () => this.props.seeVisitedUser.vinhosAdega.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Espumante':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmIAdega()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_c}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                    <DrinkIt wineidProps={vinhoUid}/>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const RoseAdega = () => this.props.seeVisitedUser.vinhosAdega.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Rose':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmIAdega()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_c}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                    <DrinkIt wineidProps={vinhoUid}/>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const BrancoAdega = () => this.props.seeVisitedUser.vinhosAdega.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Branco':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmIAdega()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_c}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                    <DrinkIt wineidProps={vinhoUid}/>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });

        const PortoAdega = () => this.props.seeVisitedUser.vinhosAdega.map((id) => {
            const vinho = todosVinho.find(v => v.vinhoUid === id);
            if (vinho) {
                const {nome, fotoVinho, tipoVinho, vinhoUid} = vinho;
                switch (tipoVinho) {
                    case 'Porto':
                        let textRef = React.createRef();
                        let menuRef = null;

                        const setMenuRef = ref => menuRef = ref;
                        const hideMenu = () => menuRef.hide();
                        const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_LEFT);

                        return (
                            <View key={vinhoUid}>

                                <ImageBackground
                                    style={styles.wines_pic_r}
                                    source={{uri: fotoVinho}}
                                    imageStyle={{
                                        borderColor: "#808080",
                                        borderWidth: 0.3
                                    }}

                                >

                                    <Text ref={textRef} style={{height: 0, fontSize: 0}}> </Text>
                                    <TouchableOpacity
                                        title=" "
                                        onPress={() => {
                                            wineID = vinhoUid;
                                            showMenu();
                                        }}

                                        style={{
                                            width: wp("29%"),
                                            height: wp("29%"),
                                        }}
                                    />

                                    <Menu
                                        ref={setMenuRef}
                                    >
                                        <MenuItem
                                            onPress={() => {
                                                hideMenu();
                                                this.goToWine(wineID, navigation);
                                            }}>Ver vinho</MenuItem>

                                        {whoAmIAdega()}
                                        <MenuDivider/>
                                        <MenuItem onPress={hideMenu}>Cancelar</MenuItem>
                                    </Menu>

                                </ImageBackground>
                                <View style={styles.textbox_c}>

                                    <Text style={styles.wines_txt}>
                                        {nome}
                                    </Text>
                                    <DrinkIt wineidProps={vinhoUid}/>
                                </View>
                            </View>
                        );
                }
            }
            return null;
        });
//---------------------------------------------------------------------------------------------

        if (this.state.screen == 0) {

            jaDeuVinhotinto = false;
            jaDeuVinhobranco = false;
            jaDeuEspumante = false;
            jaDeuMoscatel = false;
            jaDeuRose = false;
            jaDeuVerde = false;
            jaDeuPorto = false;

            return (
                <View>
                    <View style={Styles.profile_navigation}>
                        <TouchableOpacity
                            style={Styles.selected}
                            onPress={() => this.setState({screen: 0})}
                        >
                            <Text style={Styles.profile_btn_txt}>Wishlist</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.profile_btn}
                            onPress={() => this.setState({screen: 1})}
                        >
                            <Text style={Styles.profile_btn_txt}>Adega</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.profile_btn}
                            onPress={() => this.setState({screen: 2})}
                        >
                            <Text style={Styles.profile_btn_txt}>Reviews</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 5, flexDirection: "row", alignItems: "center", marginBottom: hp("1%")}}>
                        <Text style={styles.profile_title_txt}>Wishlist</Text>
                        <Text style={{
                            fontSize: wp("5%"),
                            color: "#A7505F",
                            fontWeight: "bold",
                            marginLeft: wp("1%"),
                            marginBottom: hp("1%")
                        }}>({wishlistCount})</Text>
                    </View>
                    <View>

                        {/*---------------------vinhos--------------------------------*/}
                        <View>
                            <WishLoop/>
                        </View>

                    </View>

                </View>
            );
        } else if (this.state.screen == 1) {

            AdegajaDeuVinhotinto = false;
            AdegajaDeuVinhobranco = false;
            AdegajaDeuEspumante = false;
            AdegajaDeuMoscatel = false;
            AdegajaDeuRose = false;
            AdegajaDeuVerde = false;
            AdegajaDeuPorto = false;

            return (
                <View>
                    <View style={Styles.profile_navigation}>
                        <TouchableOpacity
                            style={Styles.profile_btn}
                            onPress={() => this.setState({screen: 0})}
                        >
                            <Text style={Styles.profile_btn_txt}>Wishlist</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.selected}
                            onPress={() => this.setState({screen: 1})}
                        >
                            <Text style={Styles.profile_btn_txt}>Adega</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.profile_btn}
                            onPress={() => this.setState({screen: 2})}
                        >
                            <Text style={Styles.profile_btn_txt}>Reviews</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{paddingTop: 5, flexDirection: "row", alignItems: "center", marginBottom: hp("1%")}}>
                        <Text style={styles.profile_title_txt}>Adega</Text>
                        <Text style={{
                            fontSize: wp("5%"),
                            color: "#A7505F",
                            fontWeight: "bold",
                            marginLeft: wp("1%"),
                            marginBottom: hp("1%")
                        }}>({adegaCount})</Text>
                    </View>

                    {/*---------------------vinhos--------------------------------*/}
                    <View>
                        <AdegaLoop/>
                    </View>
                </View>
            );
        } else if (this.state.screen == 2) {
            return (
                <View>
                    <View style={Styles.profile_navigation}>
                        <TouchableOpacity
                            style={Styles.profile_btn}
                            onPress={() => this.setState({screen: 0})}
                        >
                            <Text style={Styles.profile_btn_txt}>Wishlist</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.profile_btn}
                            onPress={() => this.setState({screen: 1})}
                        >
                            <Text style={Styles.profile_btn_txt}>Adega</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.selected}
                            onPress={() => this.setState({screen: 2})}
                        >
                            <Text style={Styles.profile_btn_txt}>Reviews</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{paddingTop: 5, flexDirection: "row", alignItems: "center", marginBottom: hp("1%")}}>
                        <Text style={styles.profile_title_txt}>Reviews</Text>
                        <Text style={{
                            fontSize: wp("5%"),
                            color: "#A7505F",
                            fontWeight: "bold",
                            marginLeft: wp("1%"),
                            marginBottom: hp("1%")
                        }}>({reviewsCount})</Text>
                    </View>

                    <ScrollView>
                        {
                            <FlatList data={this.props.seeVisitedUser.reviews}
                                      renderItem={this.renderReviews}
                                      keyExtractor={(item, index) => item.vinhoUid + item.data}
                            />
                        }
                    </ScrollView>
                </View>
            );
        } else {
            return alert("holy shit baby");
        }
    }

    renderReviews(item) {
        todosVinho.forEach(function (ele) {
            if (ele.vinhoUid === item.item.vinhoUid) {
                nomeVinho = ele.nome;
                fotoVinho = ele.fotoVinho;
                vinhoID = ele.vinhoUid;
            }
        });

        return (
            <View>
                <Reviews ratingProps={item.item.rating} likeProps={item.item.helpful.length}
                         textoProps={item.item.texto} nomeVinhoProps={nomeVinho} fotoVinhoProps={fotoVinho}
                         dataProps={item.item.data} vinhoUidProps={vinhoID} navigation={navigation}/>
            </View>
        )

    }
}

function mapStateToProps(state) {
    return {
        seeVisitedUser: state.seeVisitedUser,
        user: state.user,
        pageVisited: state.pageVisited
    }
}

export default connect(mapStateToProps, null)(ProfileScreen);