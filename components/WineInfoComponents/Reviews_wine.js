/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity, FlatList, ScrollView} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Hr from "react-native-hr";
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList
} from "accordion-collapse-react-native";

//SVG
import Star_full from "../../icons/wineinfo_assets/star_full.svg";
import Star_empty from "../../icons/wineinfo_assets/star_empty.svg";
import Like_btn from "../../icons/wineinfo_assets/like_btn.svg";
import styles_wine from "./Styles_wine";
import firebase from 'react-native-firebase';
import Ponto from '../../icons/circle.svg'
const db = firebase.firestore();

let arraAntigoHelpful = []
let arrayAntigoHelpful = []
let coco = '#aa5766';
let pessoaQueEscreveu = '';
let arraAntigoHelpful2 = '';

function darUmHelpful(vinhoIdProps, vinhoReviewsProps, idPessoaProps, dataProps, reviewsUser, textoComentado, textoComentado2, todosUserProps) {

    let idVinho = vinhoIdProps;
    let vinhoReviews = vinhoReviewsProps;
    console.log('ele sabe que chegou aqui')
    let jafoste = [];
    let jafoste2 = [];
    vinhoReviews.forEach(function (rev) {

        if (rev.data === dataProps) {
            pessoaQueEscreveu = rev.userUid;
            let reviews = rev.helpful;
            if (reviews.includes(idPessoaProps)) {
                arraAntigoHelpful = reviews.filter(e => e !== idPessoaProps);
            } else {
                arraAntigoHelpful = reviews.concat(idPessoaProps);

            }

            rev.helpful = arraAntigoHelpful;
            console.log('todos user props: ', todosUserProps);

            //HELIA
            //  todosUserProps.forEach(function (elemento) {
            //    elemento.reviews.forEach(function (prop) {
            //      if (rev.data === prop.data) {
            //         console.log('entrou')
            //   }
            // if(dataProps===prop.data){
            //    console.log('')
            // }
            //   let reviews = rev.helpful;
            /*if (reviews.includes(idPessoaProps)) {
                arraAntigoHelpful2 = reviews.filter(e => e !== idPessoaProps);
            } else {
                arraAntigoHelpful2 = reviews.concat(idPessoaProps);

            }*/
            /*
                                    rev.helpful = arraAntigoHelpful2;
                                    jafoste2.push(rev);
                                } else {
                                    jafoste2.push(rev);
                                }*/

            //   })
            //});
            //MARIA
            /* reviewsUser.forEach(function (prop) {
                 prop.helpful = arraAntigoHelpful
             })*/
//---------------------


            jafoste.push(rev);
//MARIA
            /* jafoste2.push(reviewsUser)
             console.log(reviewsUser)*/
        } else {
            jafoste.push(rev);

//MARIA
            /* reviewsUser.forEach(function (prop) {
                 jafoste2.push(prop)
             })

             console.log(reviewsUser)*/

        }

    });
    db.collection('vinhos').doc(idVinho).update({
        reviews: jafoste
    });
    db.collection('users').doc(pessoaQueEscreveu).update({
        reviews: jafoste2
    });

}


const Reviews_wine = ({rateProps, nomeProps, keyProps, fotoProps, textoProps, dataProps, likesProps, numLikes, vinhoIdProps, vinhoReviewsProps, idPessoaProps, reviewsUser, textoComentado, textoComentado2, todosUserProps}) => {

    return (
        <View key={keyProps} style={{justifyContent: "center"}}>
            <View style={styles_wine.profile_content}>
                <View style={styles_wine.reviews_txt}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginBottom: hp("1%")
                        }}
                    >

                        <View style={styles_wine.reviews_txt_l}>
                            <Image
                                style={styles_wine.reviews_pic}
                                source={{uri: fotoProps}}
                            />
                            <View>
                                <Text style={{color: "#000", fontSize: wp("4%")}}>
                                    {nomeProps}
                                </Text>
                                <Text style={{color: "#000", fontSize: wp("3%")}}>
                                    {data(dataProps)}
                                </Text>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    {classificacao(rateProps)}
                                    <Text style={{color: "#aa5766",}}> ({rateProps})</Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignContent: "center"
                            }}
                        >
                            <Text style={{color: "#000", fontSize: wp("4%")}}>{likesProps}</Text>
                            <TouchableOpacity
                                onPress={() => darUmHelpful(vinhoIdProps, vinhoReviewsProps, idPessoaProps, dataProps, reviewsUser, textoComentado, textoComentado2, todosUserProps)}
                            >
                                <Like_btn color={coco} style={{
                                    height: wp("7%"),
                                    width: wp("10%"),
                                    marginLeft: wp("1%")
                                }}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginLeft: wp("0.5%"),
                        width: wp("91%"),
                        paddingTop: wp('2%'),
                        paddingRight: wp('1%'),
                        paddingLeft: wp('1%'),
                        paddingBottom: wp('1%')
                    }}
                >
                    <Text>
                        {textoProps}
                    </Text>
                </View>
            </View>
        </View>
    )


};


function classificacao(rating) {
    if (rating == 0) {
        return (
            <View style={{flexDirection: "row", marginTop: hp("0.5%")}}>
                <Star_full style={styles_wine.stars_review_empty}/>
                <Star_full style={styles_wine.stars_review_empty}/>
                <Star_full style={styles_wine.stars_review_empty}/>
                <Star_full style={styles_wine.stars_review_empty}/>
                <Star_full style={styles_wine.stars_review_empty}/>
            </View>
        )
    } else {
        if ((rating >= 1) && (rating < 2)) {
            return (
                <View style={{flexDirection: "row", marginTop: hp("0.5%")}}>
                    <Star_full style={styles_wine.stars_review_full}/>
                    <Star_full style={styles_wine.stars_review_empty}/>
                    <Star_full style={styles_wine.stars_review_empty}/>
                    <Star_full style={styles_wine.stars_review_empty}/>
                    <Star_full style={styles_wine.stars_review_empty}/>
                </View>
            )
        } else {
            if ((rating >= 2) && (rating < 3)) {
                return (
                    <View style={{flexDirection: "row", marginTop: hp("0.5%")}}>
                        <Star_full style={styles_wine.stars_review_full}/>
                        <Star_full style={styles_wine.stars_review_full}/>
                        <Star_full style={styles_wine.stars_review_empty}/>
                        <Star_full style={styles_wine.stars_review_empty}/>
                        <Star_full style={styles_wine.stars_review_empty}/>
                    </View>
                )
            } else {
                if ((rating >= 3) && (rating < 4)) {
                    return (
                        <View style={{flexDirection: "row", marginTop: hp("0.5%")}}>
                            <Star_full style={styles_wine.stars_review_full}/>
                            <Star_full style={styles_wine.stars_review_full}/>
                            <Star_full style={styles_wine.stars_review_full}/>
                            <Star_full style={styles_wine.stars_review_empty}/>
                            <Star_full style={styles_wine.stars_review_empty}/>
                        </View>
                    )
                } else {
                    if ((rating >= 4) && (rating < 5)) {
                        return (
                            <View style={{flexDirection: "row", marginTop: hp("0.5%")}}>
                                <Star_full style={styles_wine.stars_review_full}/>
                                <Star_full style={styles_wine.stars_review_full}/>
                                <Star_full style={styles_wine.stars_review_full}/>
                                <Star_full style={styles_wine.stars_review_full}/>
                                <Star_full style={styles_wine.stars_review_empty}/>
                            </View>
                        )
                    } else {
                        if (rating == 5) {
                            return (
                                <View style={{flexDirection: "row", marginTop: hp("0.5%")}}>
                                    <Star_full style={styles_wine.stars_review_full}/>
                                    <Star_full style={styles_wine.stars_review_full}/>
                                    <Star_full style={styles_wine.stars_review_full}/>
                                    <Star_full style={styles_wine.stars_review_full}/>
                                    <Star_full style={styles_wine.stars_review_full}/>
                                </View>
                            )
                        } else {
                            return (
                                <Text style={{marginLeft: 8}}>Indefinido</Text>
                            )

                        }
                    }
                }
            }
        }
    }
}

function data(prop) {
    const horas = prop.toDate().toString().slice(16, 21);
    let mesNum = '';
    const mes = prop.toDate().toString().slice(4, 7);
    const dia = prop.toDate().toString().slice(8, 10);
    const ano = prop.toDate().toString().slice(11, 15);
    switch (mes) {
        case 'Jan':
            mesNum = '01';
            break;
        case 'Feb':
            mesNum = '02';
            break;
        case 'Mar':
            mesNum = '03';
            break;
        case 'Apr':
            mesNum = '04';
            break;
        case 'May':
            mesNum = '05';
            break;
        case 'Jun':
            mesNum = '06';
            break;
        case 'Jul':
            mesNum = '07';
            break;
        case 'Aug':
            mesNum = '08';
            break;
        case 'Sep':
            mesNum = '09';
            break;
        case 'Oct':
            mesNum = '10';
            break;
        case 'Nov':
            mesNum = '11';
            break;
        case 'Dec':
            mesNum = '12';
            break;
        default:
            console.log('Sorry, we are out of ' + mes + '.');
    }
    return dia + '-' + mesNum + '-' + ano + ' ' + horas
}

export default Reviews_wine;
