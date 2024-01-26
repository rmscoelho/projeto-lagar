import React from "react";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../ProfileComponents/Styles";
//SVG
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import firebase from "react-native-firebase";
import MenuButton from "../MenuButton";
import Arrow_back from "../../icons/profile_assets/arrow_left.svg";
import {connect} from "react-redux";
import store from "../../store";
import {showWine} from "../../store/actions";

const db = firebase.firestore();


let todosvinhos = [];
let navigation = '';

let searchedID = [];

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            carregouVinhos: false,
        };
    }

    static navigationOptions = ({navigation}) => ({
        vinhosPesquisados: navigation.getParam('showResults')
    });

    componentDidMount() {
        this.chamaVinhos();
    }

    chamaVinhos = () => {
        //---------------------------------------------------------------------------------------------------------------//
        db.collection("vinhos").get()
            .then((docSnapshot) => {
                docSnapshot.docs.forEach(function (sandwich, index) {
                    todosvinhos.push(sandwich._data);
                });
                this.setState({carregouVinhos: true});
            })
    };

    render() {

        searchedID = this.props.navigation.getParam('showResults');

        const {goBack} = this.props.navigation;

        navigation = this.props.navigation.getParam('navigation');

        const renderResults = ({item}) => {

            let vinhoNome = '';
            let wineFoto = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg';
            let vinhoID = '';

            if (item !== undefined) {
                todosvinhos.forEach(function (ele) {
                    if (ele.vinhoUid === item) {
                        vinhoNome = ele.nome;
                        wineFoto = ele.fotoVinho;
                        vinhoID = ele.vinhoUid;
                    }
                })
            }
            return (

                <TouchableOpacity onPress={() => {
                    this.goToWine(vinhoID, navigation)
                }}
                                  style={{marginBottom: hp("0.5%")}}>

                    <Image style={styles.wines_pic_l}
                           source={{uri: wineFoto}}>
                    </Image>

                    <View style={styles.textbox_l}>
                        <Text style={styles.wines_txt}>
                            {vinhoNome}
                        </Text>
                    </View>
                </TouchableOpacity>
            )


        };

        return (

            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation}/>

                <ScrollView>
                    {this.state.carregouVinhos ? (
                        <View style={styles.content}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
                                <Arrow_back style={styles.arrow}/>
                            </TouchableOpacity>

                            <View style={{justifyContent: "space-evenly", paddingTop: 5}}>
                                <Text style={styles.profile_title_txt}>Resultados ({searchedID.length}) </Text>
                            </View>

                            <View style={{flexWrap: 'wrap', marginTop: hp("2%")}}>
                                <View style={styles.profile_content}>
                                    {
                                        <FlatList data={this.props.navigation.getParam('showResults')}
                                                  renderItem={renderResults}
                                                  keyExtractor={(item, index) => item}
                                                  numColumns={3}
                                        />

                                    }
                                </View>
                            </View>

                        </View>) : (
                        <Text>Não há user ainda</Text>

                    )}
                </ScrollView>
            </View>

        );
    }

    goToWine(vinhoID, navigation) {
        db.collection('vinhos').doc(vinhoID).onSnapshot(function (doc) {
            store.dispatch(showWine(doc.data()));
        });
        navigation.navigate('WineInfo')
    }

}

function mapStateToProps(state) {
    return {
        vinho: state.vinho,
    }
}

export default connect(mapStateToProps, null)(SearchResults)