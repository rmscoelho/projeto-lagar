import React from "react";
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles_home from "../HomeComponents/Styles_home";
import styles_gen from "../Styles_gen";
import MenuButton from "../MenuButton";
import {connect} from "react-redux";
import firebase from "react-native-firebase";
import Arrow_back from "../../icons/profile_assets/arrow_left.svg";
import Comentario from './Comentario'
import store from "../../store";
import {showComentsFromPost} from "../../store/actions";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

const db = firebase.firestore();
let todosPost = [];
let todosUser = [];
let comen = [];
let pessoaComentouNome = '';
let pessoaComentouFoto = '';
let todosComentario = [];

class Moremore extends React.Component {
    state = {
        refresh: false,
        jaTemComent: false,
    };

    componentDidMount(): void {

        //console.log('id no redux do post: ', this.props.comentsFromPost);
        this.chamaComentarios();
    }

    componentDidUpdate(prevProps) {
        console.log('prevProps: ', prevProps.comentsFromPost);
        if (prevProps.comentsFromPost !== this.props.comentsFromPost && this.props.comentsFromPost !== '') {
            console.log('sim ele ve q é diferente');
            this.chamaComentarios();
        }
    }

    chamaComentarios = () => {
        db.collection("postfeed").doc(this.props.comentsFromPost).get()
            .then(docSnapshot => {
                todosPost.push(docSnapshot._data);
                console.log('todosPost: ', todosPost);
            }).then(() => {
            this.setState({refresh: true})
        });
        //-------------------------------------------------------------------------------------------------------------//
        this.chamaUsers();
        //-------------------------------------------------------------------------------------------------------------//
    };
    chamaUsers = () => {
        //-------------------------------------------------------------------------------------------------------------//
        db.collection("users").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    // console.log('utilizadores: ', sandwich._data);// The element
                    todosUser.push(sandwich._data);
                });
                console.log('todosPost: ', todosPost);
            })
            .then(() => {
                this.setState({jaTemComent: true})
            })
    };
    //-----------------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------//
    renderPisto = ({item}) => {
        console.log('entrou no renderPisto ');
        comen = [];
        console.log('Qnd nao ha comentarios');

        item.comentarios.forEach(function (elemento) {
            todosUser.forEach(function (pessoa) {
                if (pessoa.userUid === elemento.userUid && pessoa.nome !== null && pessoa.photo !== null) {
                    pessoaComentouNome = pessoa.name;
                    pessoaComentouFoto = pessoa.photo;
                }
            });
            todosComentario.push({
                data: elemento.data,
                likes: elemento.likes,
                texto: elemento.texto,
                nome: pessoaComentouNome,
                foto: pessoaComentouFoto
            })
        });
        if (todosComentario.length !== 0) {
            comen = todosComentario.map(function (item, key) {
                return <Comentario keyProp={key = 'o'} nomePessoaComentouProps={item.nome}
                                   fotoPessoaComentouProps={item.foto} textoPessoaComentouProps={item.texto}
                                   dataPessoaComentouProps={item.data}/>;
            });
        }
        todosComentario.length = 0;
        return (
            <View style={styles_home.scrollv}>
                <View style={styles_home.content_first}>
                    <View style={styles_home.content}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-start',marginLeft: wp("3%"),}}>
                        <TouchableOpacity onPress={() => {
                            this.colocarTdZeros().then(this.props.navigation.navigate('Feed'))
                        }}>
                            <Arrow_back style={{color: "#A8A8A8",
                                marginTop: 5,
                                width: wp("5%"),
                                height: hp("5%")}}/>
                        </TouchableOpacity>
                        </View>
                        <Text style={{fontSize: 20,
                            textAlign: "left", paddingBottom:5}}>
                            Todos os comentários
                        </Text>
                        {comen}
                        <View style={styles_home.view_botao}>
                        </View>
                    </View>
                </View>
            </View>
        )
    };
    //-----------------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------//

    async colocarTdZeros(idComentario, navigation) {
        store.dispatch(showComentsFromPost(''));
        todosPost.length = 0;
        await this.setState({refresh: false});
        await this.setState({jaTemComent: false});

    }

    render() {
        return (
            <View style={styles_gen.container}>
                <MenuButton navigation={this.props.navigation}/>
                {this.state.refresh && this.state.jaTemComent ? (
                    <ScrollView>
                        {
                            <FlatList data={todosPost}
                                      renderItem={this.renderPisto}
                                      keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </ScrollView>
                ) : (
                    <Text>Não há user ainda</Text>
                )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        comentsFromPost: state.comentsFromPost,
    }
}

export default connect(mapStateToProps, null)(Moremore);
