import React from "react";
import {
	Alert,
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles_gen from "../components/Styles_gen.js";
import styles_wine from "../components/WineInfoComponents/Styles_wine.js";
import MenuButton from "../components/MenuButton";
import Hr from "react-native-hr";
import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import Header from "../components/WineInfoComponents/Header_wine.js";
import Info_wine from "../components/WineInfoComponents/Info_wine.js";
import Reviews_wine from "../components/WineInfoComponents/Reviews_wine.js";
//SVG
import Arrow_back from "../icons/profile_assets/arrow_left.svg";
import More_icon from "../icons/wineinfo_assets/more.svg";
import Less_icon from "../icons/wineinfo_assets/less.svg";
import Info_icon from "../icons/wineinfo_assets/info.svg";
import Review_icon from "../icons/wineinfo_assets/review.svg";
import firebase from 'react-native-firebase';
import {connect} from "react-redux";
import Send from '../icons/right-arrow.svg';
import store from "../store";
import {whereAmI} from "../store/actions";

const db = firebase.firestore();

let nomeAntigo = '';
let todosvinhos = [];
let todosUser = [];
let todosComentario = [];

let verOId = '';
let foda = false;

let textoComentado = '';
let idUser = '';
let textoComentado2 = '';
let cor = '';

class WineInfoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed_info: true,
            collapsed_comments: false,
            refresh: false,
            carregouVinho: false,
            novoVinho: false,
            num: 0,
            focusedScreen: false,
            refresh1: false
        };

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonl<S>, snapshot: SS) {
        if (prevProps.vinho !== this.props.vinho) {
            nomeAntigo = this.props.vinho.nome;
            this.setState({carregouVinho: true});
            console.log('vamos ver quantas vezes ele ve que é um vinho diferente!!!')
        }
    }

    componentWillMount() {
        store.dispatch(whereAmI('WineInfo'));
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () =>
            this.setState({focusedScreen: false})
        );
        navigation.addListener('didBlur', () =>
            this.setState({
                collapsed_info: true,
                collapsed_comments: false,
                carregouVinho: false,
                num: 0
            })
        );
        this.chamaVinhos();
        this.chamaUsers()

    }

    componentWillUnmount(): void {
        console.log('o q fazes tu msm?');
        this.setState({
            collapsed_info: true,
            collapsed_comments: false,
            refresh: false,
            carregouVinho: false,
            num: 0
        })
    }

    chamaVinhos = () => {
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("vinhos").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosvinhos.push(sandwich._data);
                });
            });
        this.chamaUsers();


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
                this.setState({refresh: true});

            })
    };


    verQualPost(idVinho) {
        let textoComentado22 = parseInt(textoComentado2, 10)
        if (textoComentado22 !== '' && textoComentado !== '') {
            console.log(textoComentado22)
            if (!isNaN(textoComentado22)) {
                console.log(textoComentado22 >= 0)
                console.log(textoComentado22 < 6)
                if (textoComentado22 >= 0 && textoComentado22 < 6) {
                    idUser = this.props.user.userUid;
                    db.collection('vinhos').doc(idVinho).update(
                        {
                            reviews: firebase.firestore.FieldValue.arrayUnion({
                                    data: firebase.firestore.Timestamp.fromDate(new Date()),
                                    helpful: [],
                                    rating: parseInt(textoComentado2, 10),
                                    texto: textoComentado,
                                    userUid: idUser
                                }
                            )
                        }
                    );
                    db.collection('users').doc(idUser).update(
                        {
                            reviews: firebase.firestore.FieldValue.arrayUnion({
                                    data: firebase.firestore.Timestamp.fromDate(new Date()),
                                    helpful: [],
                                    rating: parseInt(textoComentado2, 10),
                                    texto: textoComentado,
                                    vinhoUid: this.props.vinho.vinhoUid
                                }
                            )
                        }
                    );

                } else {
                    Alert.alert('Insira um número válido')
                }

            } else {
                Alert.alert('Insira um número válido')
            }

        } else {
            return Alert.alert('Preencha todos os campos!')
        }

    }


    darId(id) {
        verOId = id;
        foda = true;
        this.setState({different: true, refrescado: 0});
    }


    renderPisto = ({item}) => {

        count = 0;
        comen = [];
        count2 = 0;

        if (item !== undefined) {
            todosvinhos.forEach(function (ele) {
                if (ele.vinhoUid === item.vinhoUid) {
                    nomeVinho = ele.nome;
                }
            });


            Object.keys(item).forEach((key) => {
                if (key == 'data') {
                    data = item[key]
                }
                if (key == 'rating') {
                    rating = item[key]
                }
                if (key == 'texto') {
                    texto = item[key]
                }
                if (key == 'userUid') {
                    userUid = item[key];
                }

                if (key == 'helpful') {
                    helpf = item[key];
                }

            });

            todosUser.forEach(function (pessoa) {
                if (pessoa.userUid === userUid && pessoa.nome !== null && pessoa.photo !== null) {
                    count++;
                    pessoaComentouNome = pessoa.name;
                    pessoaComentouFoto = pessoa.photo;
                    pessoaComentouId = pessoa.userUid;
                }
            });
            todosComentario.push({
                rate: rating,
                data: data,
                likes: helpf,
                texto: texto,
                nome: pessoaComentouNome,
                foto: pessoaComentouFoto,
                userUid: pessoaComentouId
            });


            if (todosComentario.length !== 0) {
                let idVinho = this.props.vinho.vinhoUid;
                let reviewsVinho = this.props.vinho.reviews;
                let pessoaDarLike = this.props.user.userUid;
                let reviewsUser = this.props.user.reviews
                comen = todosComentario.map(function (item, key) {
                    return (
                        <Reviews_wine keyProps={key} dataProps={item.data} nomeProps={item.nome} rateProps={item.rate}
                                      fotoProps={item.foto} textoProps={item.texto} likesProps={item.likes.length}
                                      idPessoaProps={item.userUid}
                                      vinhoIdProps={idVinho}
                                      vinhoReviewsProps={reviewsVinho}
                                      pessoaDarLikeProps={pessoaDarLike} corProps={cor} reviewsUser={reviewsUser}
                                      textoComentado={textoComentado} textoComentado2={textoComentado2}
                                      todosUserProps={todosUser}
                        />
                    )
                })
            }
            todosComentario.length = 0;
        }
        return (
            comen
        );


    };


    render() {

        console.log("visited:", this.state.carregouVinho);
        console.log("refresh:", this.state.refresh);
        console.log("focused:", this.state.focusedScreen);

        let boraLa = this.props.pageVisited[this.props.pageVisited.length - 2];
        console.log('boraLA: ', boraLa);

        const {focusedScreen} = this.state;
        let idVinho = this.props.vinho.vinhoUid;
        let nomeVinho = this.props.vinho.nome;
        let descricaoVinho = this.props.vinho.descricaoVinho;
        let precoVinho = this.props.vinho.preco;
        let castasVinho = this.props.vinho.castas;
        let medalhasVinho = this.props.vinho.numeroMedalhas;
        let ratingOficial = this.props.vinho.ratingOficial;
        let ratingUsers = this.props.vinho.ratingUsers;
        let regiaoVinho = this.props.vinho.regiao;
        let temperaturaVinho = this.props.vinho.temperatura;
        let tempoBarril = this.props.vinho.tempoBarril;
        let tipoVinho = this.props.vinho.tipoVinho;
        let volumeVinho = this.props.vinho.volume;
        let comidaVinho = this.props.vinho.comidaAcompanhar;
        let fotoVinho = this.props.vinho.fotoVinho;
        let classificOficial = this.props.vinho.ratingOficial;
        let classifiUser = this.props.vinho.ratingUsers;
        let reviews = this.props.vinho.reviews;
        let reviewsNum = '';
        let pontuacaoUser = 0;
        let cont = 0;
        let pontFinalUser = 0;
        let zero = 0;
        if (reviews !== undefined) {
            reviewsNum = reviews.length;
            reviews.forEach(function (re) {
                cont++;
                pontuacaoUser += re.rating;
            });
            pontFinalUser = (pontuacaoUser / cont).toFixed(1)
        }

        return (
            <View style={styles_gen.container}>
                <MenuButton navigation={this.props.navigation}/>
                <ScrollView>
                    {this.state.refresh && this.state.carregouVinho ? (
                        <View style={styles_gen.content}>
                            <TouchableOpacity style={{marginLeft: wp('2%')}}
                                              onPress={() => this.props.navigation.navigate(boraLa)}>
                                <Arrow_back style={styles_gen.arrow}/>
                            </TouchableOpacity>
                            <Header idVinhoProps={idVinho} classOfic={classificOficial.toFixed(1)}
                                    classUser={pontFinalUser}
                                    nomeVinhoProps={nomeVinho} descricaoVinhoProps={descricaoVinho}
                                    precoProps={precoVinho} fotoProps={fotoVinho}/>
                            {/*--------------DETALHES-----------------------*/}
                            <View>
                                <Hr
                                    lineStyle={{
                                        backgroundColor: "#A2A2A2",
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 7,
                                        width: "auto",
                                        marginTop: 7,
                                    }}
                                >

                                    <Collapse
                                        isCollapsed={this.state.collapsed_info}
                                        onToggle={isCollapsed =>
                                            this.setState({collapsed_info: isCollapsed})
                                        }
                                    >
                                        <CollapseHeader style={styles_wine.collapse_header}>

                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    marginLeft: wp("1.5%"),
                                                    width: wp("65%"),
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Info_icon style={styles_wine.subtitle_icon}/>
                                                <Text style={styles_wine.subtitle}>Detalhes</Text>
                                            </View>
                                            <View style={{width: wp("20%")}}>
                                                {this.renderCollapseInfo()}
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <Info_wine castasProps={castasVinho} comidaProps={comidaVinho}
                                                       volumeProps={volumeVinho} temperaturaProps={temperaturaVinho}
                                                       premioProps={medalhasVinho} tempoProps={tempoBarril}
                                                       regiaoProps={regiaoVinho} tipoProps={tipoVinho}/>
                                        </CollapseBody>
                                    </Collapse>
                                </View>
                                <Hr
                                    lineStyle={{
                                        backgroundColor: "#A2A2A2",
                                        marginBottom: hp("1%")
                                    }}
                                />
                            </View>
                            {/*--------------REVIEWS-----------------------*/}
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 7,
                                        width: "auto",
                                    }}
                                >
                                    <Collapse
                                        isCollapsed={this.state.collapsed_comments}
                                        onToggle={isCollapsed =>
                                            this.setState({collapsed_comments: isCollapsed})
                                        }
                                    >
                                        <CollapseHeader style={styles_wine.collapse_header}>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    marginLeft: wp("1.5%"),
                                                    width: wp("65%"),
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Review_icon style={styles_wine.subtitle_icon}/>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={styles_wine.subtitle}>Reviews </Text><Text
                                                    style={{color: 'black', fontSize: 14}}>({reviewsNum})
                                                </Text>
                                                </View>
                                            </View>
                                            <View style={{width: wp("20%")}}>
                                                {this.renderCollapseComments()}
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <View
                                                style={{
                                                    justifyContent: "space-evenly",
                                                    alignItems: "center",
                                                    marginTop: hp("2%"),
                                                    marginBottom: hp("1%")
                                                }}
                                            >
                                                <FlatList data={this.props.vinho.reviews}
                                                          renderItem={this.renderPisto}
                                                          keyExtractor={(item, index) => index.toString()}
                                                />
                                                <Hr
                                                    lineStyle={{
                                                        backgroundColor: "#A2A2A2",
                                                        marginBottom: hp("3%"),
                                                        marginTop: hp('2%')
                                                    }}
                                                />
                                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignSelf: 'flex-start',
                                                        paddingLeft: wp('2%'),
                                                        paddingBottom: wp('1%')
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 20,
                                                            fontWeight: '400',
                                                            color: '#aa5766',
                                                        }}>Nova Review:</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignSelf: 'flex-start',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingBottom: wp('2%')
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            paddingLeft: wp('2%')
                                                        }}>Classificação(0-5):</Text>
                                                        <TextInput editable={true}
                                                                   textAlignVertical="center"
                                                                   maxLength={4}
                                                                   multiline={true}
                                                                   style={{
                                                                       marginLeft: 5,
                                                                       height: 40,
                                                                       borderColor: '#aa5766',
                                                                       borderWidth: 0.5,
                                                                       width: 40,
                                                                       textAlignVertical: "top",
                                                                       backgroundColor: 'rgba(222,222,222,0.3)',
                                                                       borderRadius: 3,
                                                                       justifyContent: 'center', alignItems: 'center'
                                                                   }}
                                                                   onChangeText={text => {
                                                                       textoComentado2 = text
                                                                   }}/>
                                                    </View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <TextInput
                                                            textAlignVertical="top"

                                                            editable={true}
                                                            maxLength={500}
                                                            multiline={true}
                                                            placeholder="Fazer review"
                                                            style={{
                                                                marginLeft: 5,
                                                                height: 65,
                                                                borderColor: '#aa5766',
                                                                borderWidth: 0.5,
                                                                width: wp('80%'),
                                                                backgroundColor: 'rgba(222,222,222,0.3)',
                                                                borderRadius: 3,
                                                                justifyContent: 'center', alignItems: 'center'
                                                            }}
                                                            onChangeText={text => {
                                                                textoComentado = text
                                                            }}
                                                        />
                                                        <TouchableOpacity onPress={() => {
                                                            this.verQualPost(this.props.vinho.vinhoUid)
                                                            this.darId(this.props.vinho.vinhoUid);
                                                            console.log('textoComentado: ', textoComentado)
                                                        }
                                                        } style={{
                                                            width: wp('10%'),
                                                            height: 65,
                                                            backgroundColor: '#aa5766',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderRadius: 3, marginLeft: wp('1%')
                                                        }}>
                                                            <Send width={20} height={20} fill={'white'}
                                                                  style={{padding: 12}}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                </View>

                            </View>
                            <Hr
                                lineStyle={{
                                    backgroundColor: "#A2A2A2",
                                    marginBottom: hp("3%")
                                }}
                            />
                        </View>) : (
                        <View style={styles.container}>
                            <Text style={styles.text}>A plantar as videiras</Text>
                            <ActivityIndicator size="large" color="#aa5766"/>
                        </View>
                    )}


                </ScrollView>

            </View>


        );


    }

    renderCollapseInfo() {
        if (this.state.collapsed_info == false) {
            return <More_icon style={styles_wine.more_icon}/>;
        } else if (this.state.collapsed_info == true) {
            return <Less_icon style={styles_wine.more_icon}/>;
        }
    }

    renderCollapseComments() {
        if (this.state.collapsed_comments == false) {
            return <More_icon style={styles_wine.more_icon}/>;
        } else if (this.state.collapsed_comments == true) {
            return <Less_icon style={styles_wine.more_icon}/>;
        }
    }


}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp('50%'),
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
        user: state.user,
        pageVisited: state.pageVisited
    }
}

export default connect(mapStateToProps, null)(WineInfoScreen)