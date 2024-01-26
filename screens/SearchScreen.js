import React from "react";
import {ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles_gen from "../components/Styles_gen.js";
import styles_search from "../components/SearchComponents/Styles_search.js";
import MenuButton from "../components/MenuButton";

import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import Hr from "react-native-hr";

import {Collapse, CollapseBody, CollapseHeader} from "accordion-collapse-react-native";

import firebase from "react-native-firebase";
import {connect} from "react-redux";
import Search_icon from "../icons/search_assets/search.svg";
import Filter_icon from "../icons/search_assets/filter.svg";
import Food_icon from "../icons/search_assets/food.svg";
import More_icon from "../icons/search_assets/more.svg";
import Less_icon from "../icons/search_assets/less.svg";
//---------Acompanhamentos
import Cheese_icon from "../icons/search_assets/cheese.svg";
import Meat_icon from "../icons/search_assets/meat.svg";
import Fish_icon from "../icons/search_assets/fish.svg";
import Shrimp_icon from "../icons/search_assets/shrimp.svg";
import Dessert_icon from "../icons/search_assets/dessert.svg";
import Vegetal_icon from "../icons/search_assets/vegetal.svg";
//---------Tipo
import Tipo_icon from "../icons/search_assets/tipo_vinho.svg";
import Casta_icon from "../icons/search_assets/grapes.svg";
import Regiao_icon from "../icons/search_assets/regiao.svg";
import store from "../store";
import {whereAmI} from "../store/actions";

const db = firebase.firestore();


//------------------------
//-------FOOD----------------------
let cheeseClick = false;
let meatClick = false;
let fishClick = false;
let shrimpClick = false;
let dessertClick = false;
let vegetalClick = false;
//-----TYPE------------------------
let verdeClick = false;
let tintoClick = false;
let brancoClick = false;
let roseClick = false;
let moscatelClick = false;
//-----GRAPE-----------------------
let alvarinhoClick = false;
let aragonesClick = false;
let arintoClick = false;
let moscatelcastaClick = false;
let syrahClick = false;
let francaClick = false;
let nacionalClick = false;
//-----REGION----------------------
let alentejoClick = false;
let bairradaClick = false;
let douroClick = false;
let penafielClick = false;
let setubalClick = false;

//-----FILTER----------------------
let results = [];


let poop = '';
let suggestions = [];
let nomes = [];
let inputResults = [];

let searchResults = [];

let navigation = '';

class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            collapsed_food: true,
            collapsed_tipo: false,
            collapsed_casta: false,
            collapsed_regiao: false,
            foodChoice: '',
            wineType: '',
            grapeType: '',
            wineRegion: '',
            suggestaoo: [],
            vinhos: [],
            focusedScreen: false
        }
        ;
    }

    componentDidMount() {
        store.dispatch(whereAmI('Search'));
        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () =>
            this.setState({focusedScreen: false})
        );
        navigation.addListener('didBlur', () =>
            this.setState({
                refresh: false,
                collapsed_food: true,
                collapsed_tipo: false,
                collapsed_casta: false,
                collapsed_regiao: false,
                foodChoice: '',
                wineType: '',
                grapeType: '',
                wineRegion: '',
                suggestaoo: [],
                vinhos: [],
                focusedScreen: false
            })
        );
        this.chamaVinhos();
    }

    chamaVinhos = () => {
        db.collection('vinhos').get().then(docSnapshot => {
            docSnapshot.docs.forEach((doc) => {
                this.state.vinhos.push(doc._data);
            });
            this.state.vinhos.forEach(function (prop) {
                nomes.push({"nome": prop.nome, "id": prop.vinhoUid});
                console.log(nomes)
            });

        })
    };

    render() {
        let boraLa = this.props.pageVisited[this.props.pageVisited.length - 2];
        console.log('boraLA: ', boraLa);
        //--------------------COMIDA----------------------------------
        const Cheese = () => {

            if (this.state.foodChoice === "Queijos") {

                return (
                    <View style={styles_search.food_selected}>
                        <Cheese_icon style={styles_search.food_cat_selected}/>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.food}>
                        <Cheese_icon style={styles_search.food_cat}/>
                    </View>
                )
            }


        };

        const Fish = () => {
            if (this.state.foodChoice === "Peixes") {

                return (
                    <View style={styles_search.food_selected}>
                        <Fish_icon style={styles_search.food_cat_selected}/>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.food}>
                        <Fish_icon style={styles_search.food_cat}/>
                    </View>
                )
            }
        };

        const Meat = () => {

            if (this.state.foodChoice === "Carnes") {

                return (
                    <View style={styles_search.food_selected}>
                        <Meat_icon style={styles_search.food_cat_selected}/>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.food}>
                        <Meat_icon style={styles_search.food_cat}/>
                    </View>
                )
            }


        };

        const Shrimp = () => {

            if (this.state.foodChoice === "Mariscos") {

                return (
                    <View style={styles_search.food_selected}>
                        <Shrimp_icon
                            style={{
                                width: wp("12%"),
                                height: wp("8%"),
                                fill: "#F9F9F9"
                            }}
                        />
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.food}>
                        <Shrimp_icon
                            style={{
                                width: wp("12%"),
                                height: wp("8%"),
                                fill: "#D99FA9"
                            }}
                        />
                    </View>
                )
            }


        };

        const Dessert = () => {

            if (this.state.foodChoice === "Sobremesas") {
                return (
                    <View style={styles_search.food_selected}>
                        <Dessert_icon style={styles_search.food_cat_selected}/>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.food}>
                        <Dessert_icon style={styles_search.food_cat}/>
                    </View>
                )
            }


        };

        const Vegetal = () => {

            if (this.state.foodChoice === "Vegetais") {
                return (
                    <View style={styles_search.food_selected}>
                        <Vegetal_icon style={styles_search.food_cat_selected}/>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.food}>
                        <Vegetal_icon style={styles_search.food_cat}/>
                    </View>
                )
            }


        };

        //--------------------TIPO----------------------------------
        const Tinto = () => {
            if (this.state.wineType === "Tinto") {
                return (<View style={styles_search.type_selected}>
                    <Text style={styles_search.type_txt_selected}>Tinto</Text>
                </View>)
            } else {
                return (<View style={styles_search.type}>
                    <Text style={styles_search.type_txt}>Tinto</Text>
                </View>)
            }
        };

        const Branco = () => {
            if (this.state.wineType === "Branco") {
                return (<View style={styles_search.type_selected}>
                    <Text style={styles_search.type_txt_selected}>Branco</Text>
                </View>)
            } else {
                return (<View style={styles_search.type}>
                    <Text style={styles_search.type_txt}>Branco</Text>
                </View>)
            }
        };

        const Moscatel = () => {
            if (this.state.wineType === "Moscatel") {


                return (<View style={styles_search.type_selected}>
                    <Text style={styles_search.type_txt_selected}>Moscatel</Text>
                </View>)
            } else {
                return (<View style={styles_search.type}>
                    <Text style={styles_search.type_txt}>Moscatel</Text>
                </View>)
            }
        };

        const Rose = () => {
            if (this.state.wineType === "Rose") {

                return (<View style={styles_search.type_selected}>
                    <Text style={styles_search.type_txt_selected}>Rosé</Text>
                </View>)
            } else {
                return (<View style={styles_search.type}>
                    <Text style={styles_search.type_txt}>Rosé</Text>
                </View>)
            }
        };

        const Verde = () => {
            if (this.state.wineType === "Verde") {

                return (<View style={styles_search.type_selected}>
                    <Text style={styles_search.type_txt_selected}>Verde</Text>
                </View>)
            } else {
                return (<View style={styles_search.type}>
                    <Text style={styles_search.type_txt}>Verde</Text>
                </View>)
            }
        };

        //--------------------CASTA----------------------------------

        const Alvarinho = () => {
            if (this.state.grapeType === "Alvarinho") {
                return (
                    <View style={styles_search.casta_selected}>
                        <Text style={styles_search.casta_txt_selected}>Alvarinho</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.casta}>
                        <Text style={styles_search.casta_txt}>Alvarinho</Text>
                    </View>
                )
            }
        };

        const Aragones = () => {
            if (this.state.grapeType === "Aragones") {

                return (
                    <View style={styles_search.casta_selected}>
                        <Text style={styles_search.casta_txt_selected}>Aragones</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.casta}>
                        <Text style={styles_search.casta_txt}>Aragones</Text>
                    </View>
                )
            }
        };

        const Arinto = () => {
            if (this.state.grapeType === "Arinto") {

                return (
                    <View style={styles_search.casta_selected}>
                        <Text style={styles_search.casta_txt_selected}>Arinto</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.casta}>
                        <Text style={styles_search.casta_txt}>Arinto</Text>
                    </View>
                )
            }
        };

        const MoscatelCasta = () => {
            if (this.state.grapeType === "Moscatel") {

                return (
                    <View style={styles_search.casta_selected}>
                        <Text style={styles_search.casta_txt_selected}>Moscatel</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.casta}>
                        <Text style={styles_search.casta_txt}>Moscatel</Text>
                    </View>
                )
            }
        };

        const Syrah = () => {
            if (this.state.grapeType === "Syrah") {

                return (
                    <View style={styles_search.casta_selected}>
                        <Text style={styles_search.casta_txt_selected}>Syrah</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.casta}>
                        <Text style={styles_search.casta_txt}>Syrah</Text>
                    </View>
                )
            }
        };

        const Franca = () => {
            if (this.state.grapeType === "Franca") {

                return (
                    <View style={styles_search.casta_selected}>
                        <Text style={styles_search.casta_txt_selected}>Touriga</Text>
                        <Text style={styles_search.casta_txt_selected}>Franca</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.casta}>
                        <Text style={styles_search.casta_txt}>Touriga</Text>
                        <Text style={styles_search.casta_txt}>Franca</Text>
                    </View>
                )
            }
        };

        const Nacional = () => {
            if (this.state.grapeType === "Nacional") {

                return (
                    <View style={styles_search.casta_selected}>
                        <Text style={styles_search.casta_txt_selected}>Touriga</Text>
                        <Text style={styles_search.casta_txt_selected}>Nacional</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles_search.casta}>
                        <Text style={styles_search.casta_txt}>Touriga</Text>
                        <Text style={styles_search.casta_txt}>Nacional</Text>
                    </View>
                )
            }
        };

        //--------------------REGIÃO----------------------------------

        const Alentejo = () => {
            if (this.state.wineRegion === "Alentejo") {
                return (<View style={styles_search.regiao_selected}>
                    <Text style={styles_search.regiao_txt_selected}>Alentejo</Text>
                </View>)
            } else {
                return (<View style={styles_search.regiao}>
                    <Text style={styles_search.regiao_txt}>Alentejo</Text>
                </View>)
            }
        };

        const Bairrada = () => {
            if (this.state.wineRegion === "Bairrada") {

                return (<View style={styles_search.regiao_selected}>
                    <Text style={styles_search.regiao_txt_selected}>Bairrada</Text>
                </View>)
            } else {
                return (<View style={styles_search.regiao}>
                    <Text style={styles_search.regiao_txt}>Bairrada</Text>
                </View>)
            }
        };

        const Douro = () => {
            if (this.state.wineRegion === "Douro") {

                return (<View style={styles_search.regiao_selected}>
                    <Text style={styles_search.regiao_txt_selected}>Douro</Text>
                </View>)
            } else {
                return (<View style={styles_search.regiao}>
                    <Text style={styles_search.regiao_txt}>Douro</Text>
                </View>)
            }
        };

        const Setubal = () => {
            if (this.state.wineRegion === "Setubal") {

                return (<View style={styles_search.regiao_selected}>
                    <Text style={styles_search.regiao_txt_selected}>Península</Text>
                    <Text style={styles_search.regiao_txt_selected}>de Setubal</Text>
                </View>)
            } else {
                return (<View style={styles_search.regiao}>
                    <Text style={styles_search.regiao_txt}>Península</Text>
                    <Text style={styles_search.regiao_txt}>de Setubal</Text>
                </View>)
            }
        };

        const Penafiel = () => {
            if (this.state.wineRegion === "Penafiel") {

                return (<View style={styles_search.regiao_selected}>
                    <Text style={styles_search.regiao_txt_selected}>Penafiel</Text>
                </View>)
            } else {
                return (<View style={styles_search.regiao}>
                    <Text style={styles_search.regiao_txt}>Penafiel</Text>
                </View>)
            }
        };

        //--------------------FILTRO----------------------------------

        const clearFilter = () => {
            this.setState({foodChoice: ""});
            this.setState({wineType: ""});
            this.setState({grapeType: ''});
            this.setState({wineRegion: ""});

            cheeseClick = false;
            meatClick = false;
            fishClick = false;
            shrimpClick = false;
            dessertClick = false;
            vegetalClick = false;

//-----TYPE------------------------
            verdeClick = false;
            tintoClick = false;
            brancoClick = false;
            roseClick = false;
            moscatelClick = false;

//-----TYPE------------------------
            alvarinhoClick = false;
            aragonesClick = false;
            arintoClick = false;
            moscatelcastaClick = false;
            syrahClick = false;
            francaClick = false;
            nacionalClick = false;

//-----TYPE------------------------
            alentejoClick = false;
            bairradaClick = false;
            douroClick = false;
            penafielClick = false;
            setubalClick = false;
        };


        //@formatter:off
        const goFilter = () => {


            //------------1 COMBINAÇÃO-----------------------------------------------------
           if (this.state.foodChoice === "Carnes" && this.state.wineType === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f", "MxzO89ctqTVDBEx3DFgq", "5Mz3HvKEcCJc3CDeQW2O", "dIeYW7EFqXFdsIXTBtaD", "vJVqx0nN2mfzP6yiUh89", "LSnpLcKzdkF7wQBPIZIZ"];

               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i", "MxzO89ctqTVDBEx3DFgq", "5Mz3HvKEcCJc3CDeQW2O", "dIeYW7EFqXFdsIXTBtaD", "LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq","5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Queijos" && this.state.wineType === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD","MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Verde" && this.state.foodChoice === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Tinto" && this.state.foodChoice === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","VaJM57RbQfJ1z1FPfB3f","vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Moscatel" && this.state.foodChoice === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Branco" && this.state.foodChoice === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD","LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Rose" && this.state.foodChoice === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Alvarinho" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.grapeType === "Aragones" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.grapeType === "Syrah" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.grapeType === "Nacional" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89","CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.grapeType === "Moscatel" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.grapeType === "Franca" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89","MxzO89ctqTVDBEx3DFgq"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.grapeType === "Arinto" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD","LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineRegion === "Penafiel" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineRegion === "Alentejo" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","LSnpLcKzdkF7wQBPIZIZ"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineRegion === "Setubal" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f","rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineRegion === "Douro" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89","MxzO89ctqTVDBEx3DFgq"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineRegion === "Bairrada" && this.state.foodChoice === "" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            //------------2 COMBINAÇÕES-----------------------------------------------------
            //----------FOOD AND TYPE-------------------------------------------------------
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Verde" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f","vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Branco" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD","LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Rose" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Verde" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Branco" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Rose" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Verde" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Rose") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Tinto" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Moscatel" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Queijos" && this.state.wineType === "Tinto" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Branco" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Rose" && this.state.grapeType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            //------------------------------------------------------------------------------
            //----------FOOD AND GRAPES-----------------------------------------------------
            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Alvarinho" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Syrah" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Aragones" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Alvarinho" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && (this.state.grapeType === "Aragones") && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && (this.state.grapeType === "Syrah") && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && (this.state.grapeType === "Nacional") && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }


            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Arinto" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Franca" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Vegetais" && this.state.grapeType === "Alvarinho" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.grapeType === "Franca" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Aragones"  && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Syrah" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Nacional" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Moscatel" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Queijos" && (this.state.grapeType === "Nacional" || this.state.grapeType === "Franca") && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Queijos" && this.state.grapeType === "Franca" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Mariscos" && this.state.grapeType === "Arinto" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Mariscos" && this.state.grapeType === "Franca" && this.state.wineType === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            //------------------------------------------------------------------------------
            //----------FOOD AND REGION-----------------------------------------------------
            else if (this.state.foodChoice === "Carnes"  && this.state.wineRegion === "Penafiel" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineRegion === "Penafiel" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineRegion === "Penafiel" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas"  && this.state.wineRegion === "Alentejo" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes"  && this.state.wineRegion === "Alentejo" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes"  && this.state.wineRegion === "Setubal" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas"  && this.state.wineRegion === "Setubal" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Queijos"  && this.state.wineRegion === "Douro" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes"  && this.state.wineRegion === "Douro" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89","MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Carnes" && this.state.wineRegion === "Bairrada" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Mariscos" && this.state.wineRegion === "Bairrada" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Mariscos" && this.state.wineRegion === "Douro" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineRegion === "Douro" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes"  && this.state.wineRegion === "Douro" && this.state.wineType === "" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            //----------TYPE AND GRAPE-------------------------------------------------------
            else if (this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i","vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Franca" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Moscatel" && this.state.grapeType === "Moscatel" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD","LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.foodChoice === "" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            //----------TYPE AND REGION-------------------------------------------------------
            else if (this.state.wineType === "Verde" && this.state.wineRegion === "Penafiel" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Tinto" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Tinto" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Moscatel" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Tinto" && this.state.wineRegion === "Douro" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Branco" && this.state.wineRegion === "Bairrada" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.wineType === "Branco" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.wineType === "Rose" && this.state.wineRegion === "Douro" && this.state.foodChoice === "" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            //----------GRAPE AND REGION-------------------------------------------------------
            else if (this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Aragones" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Syrah" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Nacional" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Syrah" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Aragones" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Moscatel" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Nacional" && this.state.wineRegion === "Douro" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89","MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Arinto" && this.state.wineRegion === "Bairrada" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.grapeType === "Arinto" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "" && this.state.wineType === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            //------------------------------------------------------------------------------
            //------------3 COMBINAÇÕES-----------------------------------------------------
            //----------FOOD, TYPE, AND GRAPE-----------------------------------------------

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.wineRegion === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Franca" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD","LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Tinto" && this.state.grapeType === "Aragones"  && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Moscatel" && this.state.grapeType === "Moscatel" && this.state.wineRegion === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Queijos" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Queijos" && this.state.wineType === "Tinto" && this.state.grapeType === "Franca" && this.state.wineRegion === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "" ) {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "" ) {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            //------------------------------------------------------------------------------
            //----------FOOD, GRAPE, AND REGION---------------------------------------------
           else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel" && this.state.wineType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Setubal" && this.state.wineType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Setubal" && this.state.wineType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Douro" && this.state.wineType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89","MxzO89ctqTVDBEx3DFgq"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.wineType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89","MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
               }

            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Bairrada" && this.state.wineType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel" && this.state.wineType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.wineType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Alentejo" && this.state.wineType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.grapeType === "Moscatel" && this.state.wineRegion === "Setubal" && this.state.wineType === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Vegetais" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel" && this.state.wineType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.wineType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Queijos" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Douro" && this.state.wineType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Queijos" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.wineType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Mariscos" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Bairrada" && this.state.wineType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Mariscos" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.wineType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            //------------------------------------------------------------------------------
            //----------FOOD, TYPE, AND REGION----------------------------------------------
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Verde" && this.state.wineRegion === "Penafiel" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.wineRegion === "Setubal" && this.state.grapeType === "") {
                results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.wineRegion === "Douro" && this.state.grapeType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Branco" && this.state.wineRegion === "Bairrada" && this.state.grapeType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Branco" && this.state.wineRegion === "Alentejo" && this.state.grapeType === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Rose" && this.state.wineRegion === "Douro" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Verde" && this.state.wineRegion === "Penafiel" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.wineRegion === "Alentejo" && this.state.grapeType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Branco" && this.state.wineRegion === "Alentejo" && this.state.grapeType === "") {
                results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Rose" && this.state.wineRegion === "Douro" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Verde" && this.state.wineRegion === "Penafiel" && this.state.grapeType === "") {
                results = ["5Mz3HvKEcCJc3CDeQW2O"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Rose" && this.state.wineRegion === "Douro" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Tinto" && this.state.wineRegion === "Alentejo" && this.state.grapeType === "") {
                results = ["CvWvYTsPpRL12O6lYS2i"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Moscatel" && this.state.wineRegion === "Setubal" && this.state.grapeType === "") {
                results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Queijos" && this.state.wineType === "Tinto" && this.state.wineRegion === "Douro" && this.state.grapeType === "") {
                results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }

            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Branco" && this.state.wineRegion === "Bairrada" && this.state.grapeType === "") {
                results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Rose" && this.state.wineRegion === "Douro" && this.state.grapeType === "") {
                results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
            }
            //------------------------------------------------------------------------------
            //----------TYPE, GRAPE, AND REGION----------------------------------------------
           else if (this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel" && this.state.foodChoice === "") {
                    results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "") {
                    results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "") {
                    results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Douro" && this.state.foodChoice === "") {
                    results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.wineType === "Tinto" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.foodChoice === "") {
                    results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.wineType === "Moscatel" && this.state.grapeType === "Moscatel" && this.state.wineRegion === "Setubal" && this.state.foodChoice === "") {
                    results = ["rzeKMwqRD1IijIsPjr25"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Alentejo" && this.state.foodChoice === "") {
                    results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Bairrada" && this.state.foodChoice === "") {
                    results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro" && this.state.foodChoice === "") {
                    results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            //------------------------------------------------------------------------------
            //------------4 COMBINAÇÕES-----------------------------------------------------
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel") {
                    results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel") {
                    results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Verde" && this.state.grapeType === "Alvarinho" && this.state.wineRegion === "Penafiel") {
                    results = ["5Mz3HvKEcCJc3CDeQW2O"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Alentejo") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Sobremesas"  && this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Alentejo") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Alentejo") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Alentejo") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Alentejo") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Alentejo") {
                    results = ["CvWvYTsPpRL12O6lYS2i"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Syrah" && this.state.wineRegion === "Setubal") {
                    results = ["VaJM57RbQfJ1z1FPfB3f"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Aragones" && this.state.wineRegion === "Setubal") {
                    results = ["VaJM57RbQfJ1z1FPfB3f"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Sobremesas" && this.state.wineType === "Moscatel" && this.state.grapeType === "Moscatel" && this.state.wineRegion === "Setubal") {
                    results = ["rzeKMwqRD1IijIsPjr25"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional"  && this.state.wineRegion === "Douro") {
                    results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Tinto" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro") {
                    results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Queijos" && this.state.wineType === "Tinto" && this.state.grapeType === "Nacional" && this.state.wineRegion === "Douro") {
                    results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Queijos" && this.state.wineType === "Tinto" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro") {
                    results = ["vJVqx0nN2mfzP6yiUh89"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Bairrada") {
                    results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Bairrada") {
                    results = ["dIeYW7EFqXFdsIXTBtaD"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Alentejo") {
                    results = ["LSnpLcKzdkF7wQBPIZIZ"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Branco" && this.state.grapeType === "Arinto" && this.state.wineRegion === "Alentejo") {
                    results = ["LSnpLcKzdkF7wQBPIZIZ"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "Carnes" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro") {
                    results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Mariscos" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro") {
                    results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Vegetais" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro") {
                    results = ["MxzO89ctqTVDBEx3DFgq"];
                this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }
            else if (this.state.foodChoice === "Peixes" && this.state.wineType === "Rose" && this.state.grapeType === "Franca" && this.state.wineRegion === "Douro") {
                    results = ["MxzO89ctqTVDBEx3DFgq"];
               this.props.navigation.navigate('SearchResults', {
                   showResults: results,navigation:this.props.navigation
               })
                }

            else if (this.state.foodChoice === "" && this.state.wineType === "" && this.state.grapeType === "" && this.state.wineRegion === "") {
                   Alert.alert('Selecione um filtro!');
                   results = [];
               }
            else {
                    Alert.alert('Não existem vinhos com estas características!');
                    results = [];
                }
            console.log("comida: ",this.state.foodChoice);
            console.log("tipo: ",this.state.wineType);
            console.log("casta: ",this.state.grapeType);
            console.log("região: ",this.state.wineRegion);
            console.log(results);

        };
        //@formatter:on

        Pesquisar = (prop) => {
            searchResults.length = 0;
            inputResults = prop.forEach(function (id) {
                searchResults.push(id.id);
            });

            console.log(searchResults);

            this.props.navigation.navigate('SearchResults', {
                showResults: searchResults, navigation: this.props.navigation
            });
        };

        //-----------------------------------------------------------
        const {goBack} = this.props.navigation;
        return (
            <ScrollView style={styles_gen.container}>
                <MenuButton navigation={this.props.navigation}/>
                {this.state.focusedScreen ? (
                    <View style={styles_gen.content}>
                        <View style={styles_search.title}>
                            <Search_icon style={styles_search.search_icon}/>
                            <Text style={styles_search.search_title_txt}>Pesquisa</Text>
                        </View>
                        <View style={styles_search.search_content}>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: wp('5%'),
                                marginBottom: wp('5%'),
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <TextInput
                                    editable={true}
                                    maxLength={500}
                                    multiline={true}
                                    placeholder="Pesquisar nome de vinho"
                                    style={{
                                        height: 50,
                                        borderColor: '#aa5766',
                                        borderWidth: 0.5,
                                        width: wp('70%'),
                                        backgroundColor: 'rgba(222,222,222,0.3)',
                                        borderRadius: 3,
                                        marginRight: wp('1%')
                                    }}
                                    onChangeText={(text) => {
                                        poop = text;
                                        if (text.length > 0) {
                                            function compare(a, b) {
                                                if (a.nome < b.nome) {
                                                    return -1;
                                                }
                                                if (a.nome > b.nome) {
                                                    return 1;
                                                }
                                                return 0;
                                            }

                                            const regex = new RegExp(text, 'i');
                                            suggestions = nomes.sort(compare).filter(({nome}) => nome.match(regex));


                                            this.setState({sugestaoo: suggestions});
                                        }
                                    }}

                                />
                                <TouchableOpacity onPress={() => {
                                    Pesquisar(suggestions);
                                }}>
                                    <View style={{
                                        width: wp('10%'),
                                        height: 50,
                                        backgroundColor: '#aa5766',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 3
                                    }}>
                                        <Search_icon width={25} heigth={25} color={'white'}
                                                     style={{padding: 12, alignItems: 'center'}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <Hr
                            lineStyle={{
                                backgroundColor: "#A2A2A2",
                            }}
                        />

                        <View style={styles_search.title_small}>
                            <Filter_icon style={styles_search.search_icon_small}/>
                            <Text style={styles_search.search_title_txt_small}>Pesquisa por Filtros</Text>
                        </View>

                        <View style={styles_search.search_content}>

                            {/*ACOMPANHAMENTO------------------------------------*/}
                            <View style={{marginTop: wp("1%")}}>
                                <Collapse
                                    isCollapsed={this.state.collapsed_food}
                                    onToggle={isCollapsed =>
                                        this.setState({collapsed_food: isCollapsed})
                                    }
                                >
                                    <CollapseHeader style={styles_search.collapse_header}>
                                        <View style={styles_search.subtitle}>
                                            <Food_icon style={styles_search.subtitle_icon}/>
                                            <Text style={styles_search.search_subtitle_txt}>
                                                Acompanhamento
                                            </Text>
                                        </View>
                                        <View style={{width: wp("20%")}}>
                                            {this.renderCollapseFood()}
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <View style={styles_search.search_options}>
                                            <View
                                                style={{justifyContent: "center", alignItems: "center"}}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => this.setState({foodChoice: "Queijos"})}>
                                                    <Cheese/>
                                                </TouchableOpacity>
                                                <Text style={styles_search.food_cat_txt}>Queijos</Text>
                                            </View>
                                            <View
                                                style={{justifyContent: "center", alignItems: "center"}}
                                            >
                                                <TouchableOpacity onPress={() => this.setState({foodChoice: "Carnes"})}>
                                                    <Meat/>
                                                </TouchableOpacity>
                                                <Text style={styles_search.food_cat_txt}>Carnes</Text>
                                            </View>
                                            <View
                                                style={{justifyContent: "center", alignItems: "center"}}
                                            >
                                                <TouchableOpacity onPress={() => this.setState({foodChoice: "Peixes"})}>
                                                    <Fish/>
                                                </TouchableOpacity>
                                                <Text style={styles_search.food_cat_txt}>Peixes</Text>
                                            </View>

                                        </View>
                                        <View style={styles_search.search_options}>
                                            <View
                                                style={{justifyContent: "center", alignItems: "center"}}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => this.setState({foodChoice: "Mariscos"})}>
                                                    <Shrimp/>
                                                </TouchableOpacity>
                                                <Text style={styles_search.food_cat_txt}>Mariscos</Text>
                                            </View>
                                            <View
                                                style={{justifyContent: "center", alignItems: "center"}}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => this.setState({foodChoice: "Sobremesas"})}>
                                                    <Dessert/>
                                                </TouchableOpacity>
                                                <Text style={styles_search.food_cat_txt}>Sobremesas</Text>
                                            </View>
                                            <View
                                                style={{justifyContent: "center", alignItems: "center"}}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => this.setState({foodChoice: "Vegetais"})}>
                                                    <Vegetal/>
                                                </TouchableOpacity>
                                                <Text style={styles_search.food_cat_txt}>Vegetais</Text>
                                            </View>
                                        </View>
                                    </CollapseBody>
                                </Collapse>
                            </View>
                            <Hr
                                lineStyle={{
                                    backgroundColor: "#A2A2A2",
                                    height: 0.5
                                }}
                            />
                            {/*TIPO---------------------------------------------*/}
                            <View style={{marginTop: wp("1%")}}>
                                <View>
                                    <View>
                                        <Collapse
                                            isCollapsed={this.state.collapsed_tipo}
                                            onToggle={isCollapsed =>
                                                this.setState({collapsed_tipo: isCollapsed})
                                            }
                                        >
                                            <CollapseHeader style={styles_search.collapse_header}>
                                                <View style={styles_search.subtitle}>
                                                    <Tipo_icon style={styles_search.subtitle_icon}/>
                                                    <Text style={styles_search.search_subtitle_txt}>
                                                        Tipo
                                                    </Text>
                                                </View>
                                                <View style={{width: wp("20%")}}>
                                                    {this.renderCollapseTipo()}
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-evenly",
                                                        alignItems: "center",
                                                        marginTop: hp("1%"),
                                                        marginBottom: hp("1%")
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineType: "Tinto"})}>
                                                        <Tinto/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineType: "Branco"})}>
                                                        <Branco/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineType: "Moscatel"})}>
                                                        <Moscatel/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineType: "Rose"})}>
                                                        <Rose/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineType: "Verde"})}>
                                                        <Verde/>
                                                    </TouchableOpacity>
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View>
                                </View>
                            </View>
                            <Hr
                                lineStyle={{
                                    backgroundColor: "#A2A2A2",
                                    height: 0.5
                                }}
                            />
                            {/*CASTA---------------------------------------------*/}
                            <View style={{marginTop: wp("1%")}}>
                                <View>
                                    <View>
                                        <Collapse
                                            isCollapsed={this.state.collapsed_casta}
                                            onToggle={isCollapsed =>
                                                this.setState({collapsed_casta: isCollapsed})
                                            }
                                        >
                                            >
                                            <CollapseHeader style={styles_search.collapse_header}>
                                                <View style={styles_search.subtitle}>
                                                    <Casta_icon style={styles_search.subtitle_icon}/>
                                                    <Text style={styles_search.search_subtitle_txt}>
                                                        Casta
                                                    </Text>
                                                </View>
                                                <View style={{width: wp("20%")}}>
                                                    {this.renderCollapseCasta()}
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-evenly",
                                                        alignItems: "center",
                                                        marginTop: hp("1%"),
                                                        marginBottom: hp("1%")
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({grapeType: "Alvarinho"})}>
                                                        <Alvarinho/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({grapeType: "Aragones"})}>
                                                        <Aragones/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({grapeType: "Arinto"})}>
                                                        <Arinto/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({grapeType: "Moscatel"})}>
                                                        <MoscatelCasta/>
                                                    </TouchableOpacity>


                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-evenly",
                                                        alignItems: "center",
                                                        marginTop: hp("1%"),
                                                        marginBottom: hp("1%")
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({grapeType: "Syrah"})}>
                                                        <Syrah/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({grapeType: "Franca"})}>
                                                        <Franca/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({grapeType: "Nacional"})}>
                                                        <Nacional/>
                                                    </TouchableOpacity>

                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View>
                                </View>
                            </View>
                            <Hr
                                lineStyle={{
                                    backgroundColor: "#A2A2A2",
                                    height: 0.5
                                }}
                            />
                            {/*REGIÃO---------------------------------------------*/}
                            <View style={{marginTop: wp("1%")}}>
                                <View>
                                    <View>
                                        <Collapse
                                            isCollapsed={this.state.collapsed_regiao}
                                            onToggle={isCollapsed =>
                                                this.setState({collapsed_regiao: isCollapsed})
                                            }
                                        >
                                            >
                                            <CollapseHeader style={styles_search.collapse_header}>
                                                <View style={styles_search.subtitle}>
                                                    <Regiao_icon style={styles_search.subtitle_icon}/>
                                                    <Text style={styles_search.search_subtitle_txt}>
                                                        Região
                                                    </Text>
                                                </View>
                                                <View style={{width: wp("20%")}}>
                                                    {this.renderCollapseRegiao()}
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-evenly",
                                                        alignItems: "center",
                                                        marginTop: hp("1%"),
                                                        marginBottom: hp("1%")
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineRegion: "Alentejo"})}>
                                                        <Alentejo/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineRegion: "Bairrada"})}>
                                                        <Bairrada/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineRegion: "Douro"})}>
                                                        <Douro/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineRegion: "Penafiel"})}>
                                                        <Penafiel/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({wineRegion: "Setubal"})}>
                                                        <Setubal/>
                                                    </TouchableOpacity>
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View>
                                </View>
                                <Hr
                                    lineStyle={{
                                        backgroundColor: "#A2A2A2",
                                        marginBottom: hp("1.5%")
                                    }}
                                />
                                {/*FIM DO CONTEÚDO------------------------------------*/}
                            </View>
                            {/*BOTÕES------------------------------------*/}
                            <View style={{marginBottom: wp("3%"), marginTop: wp("1%")}}>
                                <View style={styles_search.search_options}>
                                    <TouchableOpacity style={styles_search.btn_clear} onPress={() => clearFilter()}>
                                        <Text style={styles_search.btn_clear_txt}>
                                            Limpar Filtros
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles_search.btn_go} onPress={() => goFilter()}>
                                        <Text style={styles_search.btn_go_txt}>
                                            Aplicar Filtros
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>) : (
                    <View style={styles_home.container}>
                        <Text style={styles_home.text}>A ponderar a melhor escolha</Text>
                        <ActivityIndicator size="large" color="#aa5766"/>
                    </View>
                )}
            </ScrollView>
        );
    }

    renderCollapseFood() {
        if (this.state.collapsed_food === false) {
            return <More_icon style={styles_search.more_icon}/>;
        } else if (this.state.collapsed_food === true) {
            return <Less_icon style={styles_search.more_icon}/>;
        } else return <More_icon style={styles_search.more_icon}/>;
    }

    renderCollapseTipo() {
        if (this.state.collapsed_tipo === false) {
            return <More_icon style={styles_search.more_icon}/>;
        } else if (this.state.collapsed_tipo === true) {
            return <Less_icon style={styles_search.more_icon}/>;
        } else return <More_icon style={styles_search.more_icon}/>;
    }

    renderCollapseCasta() {
        if (this.state.collapsed_casta === false) {
            return <More_icon style={styles_search.more_icon}/>;
        } else if (this.state.collapsed_casta === true) {
            return <Less_icon style={styles_search.more_icon}/>;
        } else return <More_icon style={styles_search.more_icon}/>;
    }

    renderCollapseRegiao() {
        if (this.state.collapsed_regiao === false) {
            return <More_icon style={styles_search.more_icon}/>;
        } else if (this.state.collapsed_regiao === true) {
            return <Less_icon style={styles_search.more_icon}/>;
        } else return <More_icon style={styles_search.more_icon}/>;
    }
}

function mapStateToProps(state) {
    return {
        vinho: state.vinho,
        pageVisited: state.pageVisited
    }
}

const styles_home = StyleSheet.create({
    scrollv: {
        flex: 1,
        paddingTop: hp("10%"),
        backgroundColor: "#E5DBDC"
    },
    content_first: {
        alignContent: "center",
        alignItems: "center",
    },
    content: {
        marginTop: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        width: 95 + "%",
        height: "auto",
        backgroundColor: "#F7F7F7",
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.35,
        shadowRadius: 3,

        elevation: 4,
    }, container: {
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


export default connect(mapStateToProps, null)(SearchScreen);
