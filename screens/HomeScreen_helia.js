import React from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList
} from "react-native";
import More from "../icons/home_assets/more.svg";
import Comentario from "../components/HomeComponents/Comentario";
import Publicacao from "../components/HomeComponents/Publicacao";
import Eventos_mais from "../components/EventsComponents/Eventos_mais";
import MenuButton from "../components/MenuButton";
import styles_gen from "../components/Styles_gen";
import styles_home from "../components/HomeComponents/Styles_home";
import store from "../store";
import {addUser, whereAmI} from "../store/actions";
import firebase from 'react-native-firebase';

const db = firebase.firestore();
let todosPost = [];
let nomeAutorPost = '';
let nomeVinho = '';
export default class HomeScreen extends React.Component {
    state = {
        refresh: false,
        renderPost: false,
        renderProximo:false,
    };
    constructor(){
        super();
        this.renderPost = this.renderPost.bind(this);
    }

    componentDidMount() {
        this.chamaPosts();
    }

    chamaPosts = () => {
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("postfeed").orderBy("data", "desc").get()
            .then((docSnapshot) => {
                //console.log('tamanhoDoArray: ', docSnapshot.docs.length - 1);
                docSnapshot.docs.forEach(function (sandwich, index) {
                    //console.log(sandwich._data);// The element
                    todosPost.push(sandwich._data);
                    //console.log(todosPost.length);
                    //  console.log('--------------p---------------------p-------------------p-----------')
                });
                //console.log('todosPostTamanho::', todosPost.length);
            }).then(() => {
            this.setState({refresh: true})
        })
        //---------------------------------------------------------------------------------------------------------------//
    };


    renderPost = ({item}) => {
        console.log(this.state.renderProximo);
        db.collection("vinhos").doc(item.vinhoUid).get()
            .then((docSnapshot) => {
            if(docSnapshot.exists){
                nomeVinho = docSnapshot._data.nome;
                console.log(nomeVinho);
                this.setState({renderProximo:true})
            }
            console.log(this.state.renderProximo);
                if(this.state.renderProximo==true){
                    return(
                        <View style={styles_home.scrollv}>
                            <View style={styles_home.content_first}>
                                <View style={styles_home.content}>
                                    <Publicacao nomeAutorProps={item.userNome} fotoAutorProps={item.userFoto}
                                                dataPostProps={item.data} descricaoProps={item.descricao} nomeVinhoProps={nomeVinho}
                                                fotoVinhoProps={item.fotoUrl} userUidProps={item.userUid}
                                                navigation={this.props.navigation}/>
                                    <Text style={styles_home.coment_princ}>
                                        Comentários Mais {nomeVinho}
                                    </Text>
                                    {console.log('passa aqui')}
                                    <Comentario/>
                                    <View style={styles_home.view_botao}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.props.navigation.navigate("Eventos_mais")
                                            }
                                        >
                                            <More style={{width: 25, height: 25, fill: "#A65168"}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/*<Eventos_feed/>*/}
                            </View>
                        </View>
                    )
                }
            })
    };

//---------------------------------------------------//

    render() {
        return (
            <View style={styles_gen.container}>
                <MenuButton navigation={this.props.navigation}/>
                {this.state.refresh ? (
                    <ScrollView>

                        <FlatList data={todosPost}
                                  renderItem={(item) => this.renderPost(item)}
                                  keyExtractor={(item, index) => item.postUid}
                        />

                        {/*<View style={styles_home.scrollv}>
                            <View style={styles_home.content_first}>
                                <View style={styles_home.content}>
                                    <Publicacao navigation={this.props.navigation}/>
                                    <Text style={styles_home.coment_princ}>
                                        Comentários Mais Relevantes
                                    </Text>
                                    <Comentario/>
                                    <View style={styles_home.view_botao}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.props.navigation.navigate("Eventos_mais")
                                            }
                                        >
                                            <More style={{width: 25, height: 25, fill: "#A65168"}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Eventos_feed/>
                            </View>
                        </View>*/}
                    </ScrollView>
                ) : (
                    <Text>Não há user ainda</Text>
                )}

            </View>
        );
    }
}


