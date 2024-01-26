import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
//SVG
import Star_full from "../../icons/wineinfo_assets/star_full.svg";
import Star_empty from "../../icons/wineinfo_assets/star_empty.svg";
import ModalShare from "../../components/ModalShare";
import styles_wine from "./Styles_wine";


function classificacaoOficial(oficialRank) {
    if (oficialRank === 0) {
        return (
            <View style={{flexDirection: "row"}}>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
            </View>
        )
    } else {
        if ((oficialRank >= 1 && oficialRank<2)) {
            return (
                <View style={{flexDirection: "row"}}>
                    <Star_full style={styles_wine.stars_full}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                </View>
            )
        } else {
            if ((oficialRank >= 2 && oficialRank<3)) {
                return (
                    <View style={{flexDirection: "row"}}>
                        <Star_full style={styles_wine.stars_full}/>
                        <Star_full style={styles_wine.stars_full}/>
                        <Star_full style={styles_wine.stars_notfull}/>
                        <Star_full style={styles_wine.stars_notfull}/>
                        <Star_full style={styles_wine.stars_notfull}/>
                    </View>
                )
            } else {
                if ((oficialRank >= 3 && oficialRank<4)) {
                    return (
                        <View style={{flexDirection: "row"}}>
                            <Star_full style={styles_wine.stars_full}/>
                            <Star_full style={styles_wine.stars_full}/>
                            <Star_full style={styles_wine.stars_full}/>
                            <Star_full style={styles_wine.stars_notfull}/>
                            <Star_full style={styles_wine.stars_notfull}/>
                        </View>
                    )
                } else {
                    if ((oficialRank >= 4 && oficialRank<5)) {
                        return (
                            <View style={{flexDirection: "row"}}>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_notfull}/>
                            </View>
                        )
                    } else {
                        if (oficialRank === 5) {
                            return (
                                <View style={{flexDirection: "row"}}>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{flexDirection: "row"}}>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                </View>
                            )

                        }
                    }
                }
            }
        }
    }
}

function classificacaoUser(oficialRank1) {
let oficialRank=parseFloat(oficialRank1);

    if (oficialRank === 0) {
        return (
            <View style={{flexDirection: "row"}}>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
                <Star_full style={styles_wine.stars_notfull}/>
            </View>
        )
    } else {
        if ((oficialRank >= 1 && oficialRank1<2)) {
            return (
                <View style={{flexDirection: "row"}}>
                    <Star_full style={styles_wine.stars_full}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                    <Star_full style={styles_wine.stars_notfull}/>
                </View>
            )
        } else {
            if ((oficialRank >= 2 && oficialRank1<3)) {
                return (
                    <View style={{flexDirection: "row"}}>
                        <Star_full style={styles_wine.stars_full}/>
                        <Star_full style={styles_wine.stars_full}/>
                        <Star_full style={styles_wine.stars_notfull}/>
                        <Star_full style={styles_wine.stars_notfull}/>
                        <Star_full style={styles_wine.stars_notfull}/>
                    </View>
                )
            } else {
                if ((oficialRank >= 3 && oficialRank1<4)) {
                    return (
                        <View style={{flexDirection: "row"}}>
                            <Star_full style={styles_wine.stars_full}/>
                            <Star_full style={styles_wine.stars_full}/>
                            <Star_full style={styles_wine.stars_full}/>
                            <Star_full style={styles_wine.stars_notfull}/>
                            <Star_full style={styles_wine.stars_notfull}/>
                        </View>
                    )
                } else {
                    if ((oficialRank >= 4 && oficialRank1<5)) {
                        return (
                            <View style={{flexDirection: "row"}}>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_full}/>
                                <Star_full style={styles_wine.stars_notfull}/>
                            </View>
                        )
                    } else {
                        if (oficialRank === 5) {
                            return (
                                <View style={{flexDirection: "row"}}>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                    <Star_full style={styles_wine.stars_full}/>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{flexDirection: "row"}}>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                    <Star_full style={styles_wine.stars_notfull}/>
                                </View>
                            )

                        }
                    }
                }
            }
        }
    }
}

poop=(poop)=>{
    if(isNaN(poop)){
        return "N/A"
    }else{
        return poop
    }
}

const Header_wine = ({nomeVinhoProps, descricaoVinhoProps, precoProps, fotoProps, classOfic, classUser, idVinhoProps}) => (


    <View>
        <View
            style={{
                flexDirection: "row",
                marginBottom: 7,
                width: 95 + '%'
            }}
        >
            <View style={styles_wine.rating}>
                <Text style={styles_wine.subtitle}>Classificação Oficial </Text>

                <View style={{flexDirection: 'row'}}>
                    {
                        classificacaoOficial(classOfic)
                    }
                    <Text style={{color: "#aa5766", marginTop: 3}}> ({classOfic})</Text>
                </View>

                <Text style={styles_wine.subtitle}>Classificação Utilizadores</Text>
                <View style={{flexDirection: 'row'}}>
                    {classificacaoUser(classUser)}
                    <Text style={{color: "#aa5766", marginTop: 3}}> ({
                    poop(classUser)
                    })</Text>
                </View>
                <View>
                    <Text style={styles_wine.subtitle}>Preço Médio</Text>
                    <Text style={styles_wine.wine_txt_preco}> ({precoProps})</Text>
                </View>
            </View>
            <View>
                <ModalShare propsnome={nomeVinhoProps} propsfoto={fotoProps} propsid={idVinhoProps}/>
                <Image
                    style={styles_wine.profile_pic}
                    source={{uri: fotoProps}}
                />

            </View>
        </View>
        <View>
            <View style={styles_wine.title}>
                <Text style={styles_wine.wine_title_txt}>
                    {nomeVinhoProps}
                </Text>
            </View>
            <View style={styles_wine.wine_txt_box}>
                <Text style={styles_wine.wine_txt}>
                    {descricaoVinhoProps}
                </Text>
            </View>
        </View>


    </View>
);


export default Header_wine;

const styles = StyleSheet.create({

    hr: {
        borderBottomColor: "#8D8D8D",
        borderBottomWidth: 0.8,
        width: 100 + "%",
        paddingTop: 15
    },

});