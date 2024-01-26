import React, {Component} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Facebook from '../icons/facebook-f-brands.svg';
import Arrow from '../icons/chevron-right-solid.svg';
import HomeIcon from '../icons/wine-glass-alt-solid.svg';
import User from '../icons/user-friends-solid.svg';
import Close from '../icons/delete.svg';
import Barrel from '../icons/wineinfo_assets/barrel.svg';
import Wishlist from '../icons/wineinfo_assets/wishlist.svg'
import More from "../icons/wineinfo_assets/plus-circle-solid.svg";
import styles_gen from "../components/Styles_gen.js";
import Arrow_back from "../icons/profile_assets/arrow_left.svg";
import {connect} from "react-redux";
import Send from '../icons/send.svg';
import Search_Icon from '../icons/search-solid.svg';
import {ShareDialog} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';


let suggestions = [];
let jaClicouWish = false;
let jaClicouAdega = false;
const db = firebase.firestore();
let poop = '';
nomes = []

class ModalShare extends Component {


    static navigationOptions = {
        header: null,
    };
    state = {
        modalVisible: false,
    };

    constructor(props) {
        super(props);

        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'www.google.com',
            contentDescription: 'Vinho:' + this.props.vinho.nome + '!'
        };
        this.state = {
            refresh: false,
            option: 0,
            text: "",
            amigos: [],
            janela: 0,
            nomepesquisado: [],
            text2: "",
            fotos: [],
            shareLinkContent: shareLinkContent,
            aparecer: 1,
            sugestaoo: [],
            nomes: [],

        };

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        if (this.props.user.aSeguir !== undefined) {

            this.props.user.aSeguir.map((prop, key) => {
                db.collection('users').doc(prop).get().then(docSnapshot => {
                    this.state.amigos.push(docSnapshot._data);
                    console.log(this.state.amigos)
                }).then(
                    this.state.amigos.forEach(function (prop) {
                        nomes.push({"nome": prop.name, "id": prop.userUid, "photo": prop.photo})
                    })
                )

            });

        }


    }


    shareLinkWithShareDialog() {
        const tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.state.shareLinkContent);
                }
            }
        ).then(
            function (result) {
                if (result.isCancelled) {
                    Alert.alert('Cancelou a publicação!');
                } else {
                    Alert.alert('Publicado! ');
                }
            },
        );
    }


    render() {


        return (
            <View style={{position: 'absolute', zIndex: 10000, left: wp('3%'), top: wp('35%')}}>
                <TouchableOpacity style={{}}
                                  onPress={() => {
                                      this.setModalVisible(true);
                                      this.setState({option: 1})
                                  }}>
                    <More style={{color: '#aa5766', width: wp('6%'), height: wp('6%')}}/>
                </TouchableOpacity>
                {this.renderModal()}
            </View>
        )
    }

    renderModal() {


        console.log(this.state.refresh);

        const adicionarAdega = () => {
            vinhosAdega = this.props.user.vinhosAdega;
            console.log(vinhosAdega);

            if (vinhosAdega.includes(this.props.vinho.vinhoUid)) {
                Alert.alert('Já tem este vinho na Adega!');
                this.setState({refresh: true})

            } else {
                db.collection('users').doc(this.props.user.userUid).update(
                    {
                        vinhosAdega: firebase.firestore.FieldValue.arrayUnion(this.props.vinho.vinhoUid)
                    }
                ).then(
                    Alert.alert('Vinho adicionado à tua Adega!'),
                ).finally(
                    jaClicouAdega = true,
                    this.setState({refresh: true})
                )
            }
        };

        const adicionarWishlist = () => {

            vinhosWishlit = this.props.user.vinhosWish;
            console.log(vinhosWishlit);


            if (vinhosWishlit.includes(this.props.vinho.vinhoUid)) {
                Alert.alert('Já tem este vinho na wishlist!');
                this.setState({refresh: true})

            } else {
                db.collection('users').doc(this.props.user.userUid).update(
                    {
                        vinhosWish: firebase.firestore.FieldValue.arrayUnion(this.props.vinho.vinhoUid)
                    }
                ).finally(
                    jaClicouWish = true,
                    Alert.alert('Vinho adicionado à tua Wishlist!'),
                    this.setState({refresh: true})
                )
            }
        };


        const publicarFeed = (prop) => {

            function makeid(length) {
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }

            const id = makeid(20);
            if (this.props.user.userUid !== undefined) {
                db.collection('postfeed').doc(id).set({
                    comentarios: [],
                    data: firebase.firestore.Timestamp.fromDate(new Date()),
                    descricao: prop,
                    fotoUrl: this.props.propsfoto,
                    likes: [],
                    userFoto: this.props.user.photo,
                    userNome: this.props.user.name,
                    userUid: this.props.user.userUid,
                    vinhoUid: this.props.propsid,
                    postUid: id,
                }).then(
                    Alert.alert(
                        'Publicação feita!',
                    )
                ).finally(
                    this.setState({
                        text2: ""
                    })
                )
            } else {
                Alert.alert(
                    'Tem de iniciar sessão para partilhar!',
                )
            }

        };

        if (this.state.option == 1) {

            const textInput = () => {
                return (
                    <TextInput
                        editable={true}
                        maxLength={500}
                        multiline={true}
                        placeholder="Novo comentário"
                        style={{
                            height: 150,
                            borderColor: '#aa5766',
                            borderWidth: 0.5,
                            width: 100 + '%',
                            textAlignVertical: "top",
                            backgroundColor: 'rgba(222,222,222,0.3)',
                            borderRadius: 3
                        }}
                        onChangeText={(text2) => this.setState({text2: text2})}
                        value={this.state.text2}
                    />
                )
            }

            return (

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <ScrollView style={{flex: 1}}>
                        <View style={{
                            alignContent: 'center',
                            alignItems: 'center', marginTop: hp('10%')
                        }}>

                            <View style={{
                                justifyContent: 'center',
                                alignContent: 'center', alignItems: 'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowRadius: 3,
                                elevation: 4,
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                padding: 20,
                                height: 'auto',
                                width: 95 + '%', borderRadius: 3,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    marginLeft: 'auto',

                                }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({janela: 0, text: "",});
                                        this.setModalVisible(!this.state.modalVisible);

                                    }}>
                                        <Close width={20} height={20} fill={'#aa5766'}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{
                                        paddingBottom: 10,
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>Partilhar Vinho</Text>
                                </View>
                                <View style={styles.hr}/>
                                <View style={styles.ViewDefInfo}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={() => adicionarAdega()}>
                                            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                <Barrel width={25} height={25} fill={'#A7505F'}/>
                                                <Text style={{marginLeft: 10, fontSize: 18, color: 'black',}}>Adicionar
                                                    à Adega</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Arrow}>
                                            <Arrow width={18} height={18} color={'#A7505F'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.hr}/>
                                <View style={styles.ViewDefInfo}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={() => adicionarWishlist()}>
                                            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                <Wishlist width={25} height={25} fill={'#A7505F'}/>
                                                <Text style={{marginLeft: 10, fontSize: 18, color: 'black',}}>Adicionar
                                                    à Wishlist</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Arrow}>
                                            <Arrow width={18} height={18} color={'#A7505F'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.hr}/>
                                <View style={styles.ViewDefInfo}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={this.shareLinkWithShareDialog.bind(this)}>
                                            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                <Facebook width={25} height={25} color={'#A7505F'}/>
                                                <Text style={{marginLeft: 10, fontSize: 18, color: 'black',}}>Partilhar
                                                    no
                                                    Facebook</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Arrow}>
                                            <Arrow width={18} height={18} color={'#A7505F'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.hr}/>
                                <View style={styles.ViewDefInfo}>
                                    <TouchableOpacity onPress={() => this.setState({option: 2})}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>

                                            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                <User width={25} height={25} color={'#A7505F'}/>
                                                <Text style={{marginLeft: 10, fontSize: 18, color: 'black',}}>Sugerir a
                                                    Amigo</Text>
                                            </View>

                                            <Arrow width={18} height={18} color={'#A7505F'} style={styles.Arrow}/>

                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.hr}/>
                                <View style={styles.ViewDefInfo}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'column'}}>
                                            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                <HomeIcon width={25} height={25} color={'#A7505F'}/>
                                                <Text style={{marginLeft: 10, fontSize: 18, color: 'black',}}>Partilhar
                                                    no
                                                    Feed</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 18,
                                                        color: 'black'
                                                    }}>Vinho:</Text><Text style={{
                                                    fontSize: 18,
                                                    color: '#aa5766',
                                                    fontWeight: 'bold'
                                                }}> {this.props.propsnome}</Text>
                                                </View>
                                            </View>
                                            <View style={{alignItems: 'center', marginTop: 10}}>
                                                <View style={{
                                                    alignItems: 'center',
                                                    alignSelf: 'flex-start',
                                                    flexDirection: 'row'
                                                }}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 18,
                                                        color: 'black',
                                                        alignItems: 'flex-start'
                                                    }}>Comentário:</Text>
                                                </View>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'flex-start',
                                                paddingRight: 5,
                                                paddingTop: 2,
                                                marginBottom: 2
                                            }}>
                                                {
                                                    textInput()
                                                }

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 10
                                    }}>
                                        <View>
                                            <TouchableOpacity onPress={() => publicarFeed(this.state.text2)}
                                                              style={{
                                                                  backgroundColor: '#aa5766',
                                                                  padding: 5,
                                                                  borderRadius: 3
                                                              }}>
                                                <Text style={{color: 'white', fontSize: 18,}}>Publicar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                </Modal>


            );


        } else if (this.state.option == 2) {


            return (
                <ScrollView style={{flex: 1}}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{
                            alignContent: 'center',
                            alignItems: 'center', marginTop: hp('10%')
                        }}>

                            <View style={{
                                alignItems: 'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowRadius: 3,
                                elevation: 4,
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                padding: 20,
                                minHeight: hp('50%'),
                                width: 95 + '%', borderRadius: 3
                            }}>


                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginRight: 'auto',
                                    justifyContent: 'flex-start',
                                    position: 'absolute',
                                    left: wp('3%'),
                                    top: wp('3%')
                                }}>
                                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'flex-start',}}
                                                      onPress={() => this.setState({option: 1, text: ""})}>
                                        <Arrow_back style={styles_gen.arrow_back}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                    justifyContent: 'flex-end',
                                    paddingBottom: wp('2%'),
                                    position: 'absolute',
                                    right: wp('3%'),
                                    top: wp('3%')
                                }}>
                                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'flex-start',}}
                                                      onPress={() => {
                                                          this.setState({janela: 0, text: "",});
                                                          this.setModalVisible(!this.state.modalVisible);
                                                      }}>
                                        <Close width={20} height={20} fill={'#aa5766'}/>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000', paddingTop: wp('5%')}}>Sugerir
                                    a Amigo</Text>
                                <View>

                                    <View style={{flexDirection: 'row', marginTop: wp('4%'),}}>
                                        <View style={{
                                            width: wp('10%'),
                                            height: 40,
                                            backgroundColor: '#aa5766',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 3, marginRight: wp('1%')
                                        }}>
                                            <Search_Icon width={25} heigth={25} color={'white'}
                                                         style={{padding: 12, alignItems: 'center'}}/>
                                        </View>
                                        <TextInput
                                            maxLength={500}
                                            multiline={true}
                                            placeholder="Procurar amigo..."
                                            style={{
                                                height: 40,
                                                borderColor: '#aa5766',
                                                borderWidth: 0.5,
                                                width: wp('75%'),
                                                backgroundColor: 'rgba(222,222,222,0.3)',
                                                borderRadius: 3,
                                                marginRight: wp('1%')
                                            }}
                                            onChangeText={(text) => {
                                                poop = text;

                                                if (poop.length > 0) {
                                                    function compare(a, b) {
                                                        if (a.nome < b.nome) {
                                                            return -1;
                                                        }
                                                        if (a.nome > b.nome) {
                                                            return 1;
                                                        }
                                                        return 0;
                                                    }

                                                    const regex = new RegExp(poop, 'i');
                                                    suggestions = this.state.amigos.sort(compare).filter(({name}) => name.match(regex));
                                                    this.setState({sugestaoo: suggestions});
                                                    this.setState({janela: 1})

                                                }
                                                console.log(suggestions)
                                            }}
                                            autoCorrect={false}

                                        />
                                    </View>

                                </View>
                                <View style={styles.hr2}/>
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'flex-start',
                                }}>


                                    {
                                        this.renderPesquisa()
                                    }


                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            )
        }

    }


    sendSugest = (prop, propi) => {

        function makeidnot(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const idnot = makeidnot(20);

        db.collection('users').doc(prop).update({
            notificacoes: firebase.firestore.FieldValue.arrayUnion({
                data: firebase.firestore.Timestamp.fromDate(new Date()),
                userUid: this.props.user.userUid,
                tipo: 'sugestao',
                fotoUrl: propi,
                visto: false,
                idNot: idnot,
                vinhoUid: this.props.vinho.vinhoUid,
                texto: 'Sugeriu-lhe o vinho'
            })
        }).then(Alert.alert('Sugestão enviada!'))
    };


    renderPesquisa() {


        if (this.state.janela == 0 || poop.length <= 1) {
            return (
                <View style={{flexDirection: 'column', width: 100 + '%'}}>
                    <Text style={{fontWeight: '600', fontSize: 18, color: '#8D8D8D', marginBottom: wp('2%')}}>
                        Amigos:</Text>

                    {
                        this.state.amigos.map((prop, key) => {
                            return (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'flex-start'
                                    }}>
                                        <Text style={{fontSize: 17}}>{prop.name}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'flex-end',

                                    }}>
                                        <TouchableOpacity onPress={() => this.sendSugest(prop.userUid, prop.photo)}>
                                            <Send width={wp('8%')} height={wp('8%')} fill={'#aa5766'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )


                        })
                    }


                </View>

            )
        }


        if (this.state.janela == 1 && poop.length >= 2) {
            return (
                <View style={{flexDirection: 'column', width: 100 + '%'}}>
                    <Text style={{fontWeight: '600', fontSize: 18, color: '#8D8D8D', marginBottom: wp('2%')}}>
                        Amigos:</Text>
                    {

                        this.state.sugestaoo.map((prop, key) => {
                            return (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'flex-start'
                                    }}>
                                        <Text style={{fontSize: 17}}>{prop.name}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignSelf: 'flex-end',

                                    }}>
                                        <TouchableOpacity onPress={() => this.sendSugest(prop.userUid, prop.photo)}>
                                            <Send width={wp('8%')} height={wp('8%')} fill={'#aa5766'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            )
        }


    }


}


function mapStateToProps(state) {
    return {
        user: state.user,
        vinho: state.vinho
    }
}


export default connect(mapStateToProps, null)(ModalShare)

const styles = StyleSheet.create({

    hr: {

        borderBottomColor: '#8D8D8D',
        borderBottomWidth: 0.8,
        width: 100 + '%',
    },
    hr2: {
        marginTop: wp('4%'),
        marginBottom: wp('3%'),
        borderBottomColor: '#8D8D8D',
        borderBottomWidth: 0.8,
        width: 100 + '%',
    },
    Arrow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    ViewDefInfo: {
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 'auto',
        marginLeft: 10,
        width: 95 + '%'
    },

});