import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

import styles from "../Styles.js";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import ViewMoreText from 'react-native-view-more-text';

import Star_full from "../../../icons/profile_assets/star_full.svg";
import Star_empty from "../../../icons/profile_assets/star_empty.svg";
import Like_btn from "../../../icons/profile_assets/like_btn.svg";

import firebase from "react-native-firebase";
import store from "../../../store";
import {showWine} from "../../../store/actions";

const db = firebase.firestore();

function chamarVinho(vinhoUidProps, navigation) {
    db.collection('vinhos').doc(vinhoUidProps).get()
        .then(docSnapshot => {
            store.dispatch(showWine(docSnapshot.data()));
            console.log(docSnapshot.data())

        }).then(
        navigation.navigate('WineInfo')
    )
}


const Reviews = ({ratingProps, likeProps, textoProps, nomeVinhoProps, fotoVinhoProps = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', dataProps, vinhoUidProps, navigation}) => (

    <View style={{
        height: "auto",
        marginBottom: hp("2%"),
        paddingBottom: hp("0.5%"),
        borderBottomWidth: 1,
        borderBottomColor: '#A2A2A2'
    }}>

        <View style={styles.profile_content}>
            <TouchableOpacity onPress={() => chamarVinho(vinhoUidProps, navigation)}>
                <Image
                    style={styles.reviews_pic}
                    source={{uri: fotoVinhoProps}}
                />
            </TouchableOpacity>
            <View style={styles.reviews_txt}>
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: wp("4%")
                    }}
                >
                    <View style={styles.reviews_txt_l}>
                        <TouchableOpacity onPress={() => chamarVinho(vinhoUidProps, navigation)}>
                            <Text style={{color: "#000", fontSize: wp("4%")}}>
                                {nomeVinhoProps}
                            </Text>
                        </TouchableOpacity>
                        <View>
                            <Time dateProps={dataProps}/>
                        </View>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{color: "#707070", fontSize: wp("4%")}}>{likeProps}</Text>
                        <Like_btn style={styles.like_btn}/>
                    </View>
                </View>
                <View
                    style={{
                        marginLeft: wp("4%"),
                    }}
                >
                    <View style={{paddingRight: wp('3%')}}>
                        <TextoReview reviewProps={textoProps}/>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Rating rating={ratingProps}/>
                    </View>
                </View>
            </View>
        </View>
    </View>

);

const TextoReview = (reviewProps) => ({

    renderViewMore(onPress) {
        return (
            <Text style={{color: "#000"}} onPress={onPress}>Mais +</Text>
        )
    },
    renderViewLess(onPress) {
        return (
            <Text style={{color: "#000"}} onPress={onPress}>Menos -</Text>
        )
    },
    render() {
        return (
            <ViewMoreText
                numberOfLines={1}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={{flexWrap: "wrap"}}
            >
                <Text>
                    {reviewProps.reviewProps}
                </Text>
            </ViewMoreText>
        )
    }

});

const Rating = (rating) => {

    let stars = Math.floor(rating.rating);

    switch (stars) {
        case 1:
            return (
                <View style={{flexDirection: "row", marginTop: hp("1%")}}>
                    <Star_full style={styles.stars_full}/>
                    <Star_empty style={styles.stars_empty}/>
                    <Star_empty style={styles.stars_empty}/>
                    <Star_empty style={styles.stars_empty}/>
                    <Star_empty style={styles.stars_empty}/>
                </View>
            );
            break;
        case 2:
            return (
                <View style={{flexDirection: "row", marginTop: hp("1%")}}>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_empty style={styles.stars_empty}/>
                    <Star_empty style={styles.stars_empty}/>
                    <Star_empty style={styles.stars_empty}/>
                </View>
            );
            break;
        case 3:
            return (
                <View style={{flexDirection: "row", marginTop: hp("1%")}}>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_empty style={styles.stars_empty}/>
                    <Star_empty style={styles.stars_empty}/>
                </View>
            );
            break;
        case 4:
            return (
                <View style={{flexDirection: "row", marginTop: hp("1%")}}>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_empty style={styles.stars_empty}/>
                </View>
            );
            break;
        case 5:
            return (
                <View style={{flexDirection: "row", marginTop: hp("1%")}}>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                    <Star_full style={styles.stars_full}/>
                </View>
            );
            break;
        default:
            return (<View style={{flexDirection: "row", marginTop: hp("1%")}}>
                <Star_empty style={styles.stars_empty}/>
                <Star_empty style={styles.stars_empty}/>
                <Star_empty style={styles.stars_empty}/>
                <Star_empty style={styles.stars_empty}/>
                <Star_empty style={styles.stars_empty}/>
            </View>)
    }


};

const Time = (dateProps) => ({

    render() {
        const horas = dateProps.dateProps.toDate().toString().slice(16, 21);
        let mesNum = '';
        const mes = dateProps.dateProps.toDate().toString().slice(4, 7);
        const dia = dateProps.dateProps.toDate().toString().slice(8, 10);
        const ano = dateProps.dateProps.toDate().toString().slice(11, 15);
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
        return (
            <Text style={{color: "#707070", fontSize: wp("3%")}}>{dia + '-' + mesNum + '-' + ano + ' ' + horas}</Text>
        );
    }

});


export default Reviews;
