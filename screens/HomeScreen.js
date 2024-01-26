import React from "react";
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import More from "../icons/home_assets/more.svg";
import Comentario from "../components/HomeComponents/Comentario";
import Publicacao from "../components/HomeComponents/Publicacao";
import MenuButton from "../components/MenuButton";
import styles_home from "../components/HomeComponents/Styles_home";
import firebase from 'react-native-firebase';
import {connect} from "react-redux";
import store from "../store";
import {showComentsFromPost, whereAmI} from "../store/actions";
import Rigth_arrow from "../icons/home_assets/right-arrow.svg"

const db = firebase.firestore();
let todosPost = [];
let todosVinho = [];
let nomeVinho = '';
let todosComentario = [];
let todosUser = [];
let pessoaComentouNome = '';
let pessoaComentouFoto = '';
let pessoaComentouId = '';
let comen = [];
let count = 0;
let textoComentado = '';
let ref = db.collection('postfeed');
let verOId = '';
let foda = false;
let pessoaAComentar = '';
let FoiVerComs = false;

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            text: '',
            loading: true,
            ola: 0,
            todosPost: [],
            different: false,
            idPosts: [],
            refrescado: [],
            focusedScreen: false
        };
    }

    static navigationOptions = ({navigation}) => ({
        pagVisitada: navigation.getParam('moreMore')
    });

    componentWillMount() {
        store.dispatch(whereAmI('Feed'));
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () => {
                this.setState({focusedScreen: false});
                //this.props.navigation.setParams({'moreMore': false});
                const pagVisitada = navigation.getParam('more');
                console.log('pageVisitada: ', pagVisitada);
                console.log('vamos ver o parametro do moreMore: ', this.props.navigation.getParam('moreMore'));
                console.log('---------------------------------------------------------------------------------');
                if (FoiVerComs) {
                    this.setState({focusedScreen: true});
                    console.log('entra no if');
                } else {
                    this.state = {
                        refresh: false,
                        text: '',
                        loading: true,
                        ola: 0,
                        todosPost: [],
                        different: false,
                        idPosts: [],
                        refrescado: [],
                        focusedScreen: false
                    };
                    console.log('entra no else');
                }
            }
        );

        navigation.addListener('didBlur', () => {
                textoComentado = '';
                FoiVerComs = false;
            }
        );
        this.chamaPosts();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonl<S>, snapshot: SS): void {

        //console.log('state do focusedScreen no didUpdate', this.state.focusedScreen);
        //console.log('update');
        //console.log('prevstate do todosPost: :  ', prevState.todosPost);
        //console.log(prevState.todosPost !== this.state.todosPost);
        if (prevProps.user !== this.props.user) {
            pessoaAComentar = this.props.user.userUid;
        }
        if (prevState.todosPost !== this.state.todosPost) {
            //  console.log('sim é diferente!!!!!!!!!!!!!!! ');
            if (this.state.different) {
                this.state.todosPost.map(item => {
                        if (verOId === item.postUid) {
                            this.verQualPost(item.postUid)
                        }
                    }
                );
                this.setState({different: false}, () => console.log('val', this.state.todosPost))
            }
        }


    }

    /* componentWillUnmount(): void {
         this.chamaPosts();
     }*/

    verQualPost(idPost) {
        console.log('idPost: ', idPost);
        ref.doc(idPost).update(
            {
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                        data: firebase.firestore.Timestamp.fromDate(new Date()),
                        likes: [],
                        texto: textoComentado,
                        userUid: pessoaAComentar
                    }
                )
            }
        )
    }

    darId(id) {
        verOId = id;
        foda = true;
        this.setState({different: true, refrescado: 0});
    }

    chamaPosts = () => {
        //---------------------------------------------------------------------------------------------------------------//
        /*db.collection("postfeed").orderBy("data", "desc").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosPost.push(sandwich._data);
                });
                this.chamaVinhos();
            })*/
        //---------------------------------------------------------------------------------------------------------------//
        db.collection('postfeed').orderBy("data", "desc").onSnapshot(this.onCollectionUpdate)
        this.chamaVinhos();
    };
    onCollectionUpdate = (querySnapshot) => {

        todosPost.length = 0;
        // console.log('entrou no onCollectionUpdate e tamanho do todosPost :', todosPost.length);
        querySnapshot.forEach((doc) => {

            todosPost.push(doc.data());
            // todosPost.push(doc.data());
            // console.log('todosPostOnRealTime: ', todosPost)
        });
        if (foda)
            this.setState({refrescado: todosPost});
        else
            this.setState({todosPost: todosPost})
    };
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
                    // console.log('utilizadores: ', sandwich._data);// The element
                    todosUser.push(sandwich._data);
                });
            })
            .then(() => {
                this.setState({refresh: true})
            })
    };
//---------------------------------------------------//
//---------------------------------------------------//
    renderPisto = ({item}) => {
        let comentariosTamanho = 0;
        count = 0;
        comen = [];
        // console.log('entrou no renderPisto!!!')
        todosVinho.forEach(function (ele) {
            if (ele.vinhoUid === item.vinhoUid) {
                nomeVinho = ele.nome;
            }
        });
        if (item.comentarios.length === 0) {
            console.log('Qnd nao ha comentarios');
        } else {
            // console.log('fetch new comment');

            comentariosTamanho = item.comentarios.length;
            item.comentarios.forEach(function (elemento) {
                if (count <= 4) {
                    count++;
                    todosUser.forEach(function (pessoa) {
                        if (pessoa.userUid === elemento.userUid && pessoa.nome !== null && pessoa.photo !== null) {
                            count++;
                            pessoaComentouNome = pessoa.name;
                            pessoaComentouFoto = pessoa.photo;
                            pessoaComentouId = pessoa.userUid;
                        }
                    });
                    todosComentario.push({
                        data: elemento.data,
                        likes: elemento.likes,
                        texto: elemento.texto,
                        nome: pessoaComentouNome,
                        foto: pessoaComentouFoto,
                        postUid: item.postUid,
                        pessoaUid: pessoaComentouId
                    });
                }
            });
            if (todosComentario.length !== 0) {
                //  console.log('entra aqui?');
                comen = todosComentario.map(function (item, key) {
                    return <Comentario key={key.toString()} keyProp={key} nomePessoaComentouProps={item.nome}
                                       fotoPessoaComentouProps={item.foto} textoPessoaComentouProps={item.texto}
                                       dataPessoaComentouProps={item.data}
                                       idPessoaComentouProps={item.pessoaUid}
                    />;
                });
                todosComentario.length = 0;
            }
        }
        return (<View style={{marginTop: hp('2%')}}>
            <View style={{
                alignContent: "center",
                alignItems: "center",
            }}>
                <View style={styles_home.content} navigationProp={this.props.navigation}>
                    <Publicacao nomeAutorProps={item.userNome} fotoAutorProps={item.userFoto}
                                dataPostProps={item.data} descricaoProps={item.descricao} nomeVinhoProps={nomeVinho}
                                fotoVinhoProps={item.fotoUrl} userUidProps={item.userUid}
                                vinhoUidProps={item.vinhoUid}
                                navigation={this.props.navigation}
                                likesProps={item.likes.length}
                                comentariosTamanhoProps={comentariosTamanho}
                    />
                    <Text style={styles_home.coment_princ}>
                        Comentários
                    </Text>
                    {comen}
                    <View style={{marginTop: wp('3%'), width: 95 + '%',flexDirection:'row'}}>
                        <View style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-start',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            height: 45, width: 90 + '%'
                        }}>
                            <TextInput
                                textAlignVertical="top"
                                editable={true}
                                maxLength={200}
                                style={{marginLeft: 5,justifyContent: 'center', alignItems: 'center',
                                    color: 'black',
                                    borderWidth: 0
                                }}
                                placeholder={'inserir comentário'}
                                onChangeText={text => {
                                    textoComentado = text
                                }}
                            />
                        </View>
                        <View style={{
                            width: 10 + '%',
                            flexDirection: 'row',
                            height: 45,
                            backgroundColor: '#aa5766',
                            justifyContent: 'center',
                            alignSelf: 'flex-end',
                            borderRadius: 3,
                            marginLeft: wp('1%'),alignItems:'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.verQualPost(item.postUid);
                                    this.darId(item.postUid);
                                    //   console.log('textoComentado: ', textoComentado)
                                }
                                }
                            >
                                <Rigth_arrow style={{width: 20, height: 20, fill: "#fff"}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:20+'%',justifyContent:'center',alignItems:'center',
                        paddingTop: 20,
                        paddingBottom: 10}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.chamarTodosComentarios(item.postUid, this.props.navigation).then(this.props.navigation.navigate('MoreComent'))
                            }
                            }
                        >
                            <More style={{width: 25, height: 25, fill: "#A65168"}}/>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </View>)

    };

//---------------------------------------------------//
    async chamarTodosComentarios(idComentario, navigation) {
        FoiVerComs = true;
        //console.log('entrou: ', idComentario);
        await store.dispatch(showComentsFromPost(idComentario));
        //this.props.navigation.navigate('MoreComent', {more: true})

    }

//---------------------------------------------------//

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#E5DBDC",
                paddingTop: hp("8%")
            }}>
                <MenuButton navigation={this.props.navigation}/>
                {this.state.refresh && this.state.focusedScreen ? (
                    <ScrollView>
                        {
                            <FlatList data={this.state.todosPost}
                                      renderItem={this.renderPisto}
                                      keyExtractor={(item, index) => index.toString()}
                                      extraData={this.state.refrescado}
                            />
                        }

                    </ScrollView>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.text}>A fazer a colheita</Text>
                        <ActivityIndicator size="large" color="#aa5766"/>
                    </View>
                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 45,
    },
    caixaInput: {
        width: 70 + '%',
        color: 'black',
        borderWidth: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4DADB',
    },    text: {
        color: "#aa5766",
        fontSize: 30,
    },
});

function

mapStateToProps(state) {
    return {
        user: state.user,
        comentsFromPost: state.comentsFromPost
    }
}

export default connect(mapStateToProps,

    null
)(
    HomeScreen
)
;