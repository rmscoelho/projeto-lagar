/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {Text, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
//SVG
import Percentage_icon from "../../icons/wineinfo_assets/percentage.svg";
import Temperature_icon from "../../icons/wineinfo_assets/temp.svg";
import Cask_icon from "../../icons/wineinfo_assets/cask.svg";
import Award_icon from "../../icons/wineinfo_assets/award.svg";
import Casta_icon from "../../icons/wineinfo_assets/grapes.svg";
import Regiao_icon from "../../icons/wineinfo_assets/regiao.svg";
import Chocolate_icon from "../../icons/wineinfo_assets/chocolate-bar.svg";
import Coffee_icon from "../../icons/wineinfo_assets/coffee.svg";
import Fish_icon from "../../icons/wineinfo_assets/fish-solid.svg";
import Wine_icon from "../../icons/wineinfo_assets/wine-bottle.svg";
import Cheese_icon from "../../icons/wineinfo_assets/cheese.svg";
import Meat_icon from "../../icons/wineinfo_assets/meat.svg";
import Shrimp_icon from "../../icons/wineinfo_assets/shrimp.svg";
import Vegetal_icon from "../../icons/wineinfo_assets/vegetal.svg";
import Steak_icon from "../../icons/wineinfo_assets/steak.svg"


import styles_wine from "./Styles_wine";


const Info_wine = ({castasProps, volumeProps, temperaturaProps, premioProps, tempoProps, regiaoProps, tipoProps, comidaProps}) => (
    <View style={{marginLeft: wp('5%'), marginRight: wp('5%')}}>
        {
            console.log('castas vinho: ', castasProps)
        }
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: hp("2%")
            }}
        >
            <View style={{width: wp("25%"),
                height: wp("8%"),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",paddingRight:wp('2%')}}>
                <Percentage_icon style={styles_wine.info_icon}/>
                <Text style={styles_wine.type_txt}>{volumeProps}</Text>
            </View>
            <View style={{width: wp("25%"),
                height: wp("8%"),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center", paddingRight:wp('3%')}}>
                <Temperature_icon style={{ color: "black",
                    width: wp("5%"),
                    height: wp("5%"),
                    paddingRight: wp("2%")}}/>
                <Text style={styles_wine.type_txt}>{temperaturaProps}</Text>
            </View>
            <View style={styles_wine.type}>
                <Cask_icon
                    style={styles_wine.info_icon}
                />
                <Text style={styles_wine.type_txt}>{tempoProps}</Text>
            </View>
            <View style={{ width: wp("25%"),
                height: wp("8%"),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"}}>
                <Award_icon style={styles_wine.info_icon}/>
                <Text style={styles_wine.type_txt}>{premioProps}</Text>
            </View>
        </View>
        <View style={{marginBottom: hp('1%'), marginLeft: wp('9%')}}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: hp("2%"),
                    marginBottom: hp("1%")
                }}
            >
                <View style={{
                    width: wp("50%"),
                    height: "auto",

                }}>
                    <Text style={styles_wine.subtitle_t}>Castas</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: hp("1%"),
                            marginLeft: wp("1.5%")
                        }}
                    >
                        <View style={{flexDirection: 'column'}}>
                            {
                                castasProps.map((prop, key) => {
                                    return (
                                        <View key={key} style={{flexDirection: 'row', marginTop: 2}}>
                                            <Casta_icon style={styles_wine.info_icon}/>
                                            <Text style={styles_wine.type_txt}>{prop}</Text>
                                        </View>

                                    );
                                })
                            }
                        </View>

                    </View>
                </View>
                <View style={{
                    width: wp("50%"),
                    height: "auto", paddingLeft: wp('9%'),
                }}>
                    <Text style={{
                        fontSize: wp("4%"),
                        color: "#aa5766",
                        marginLeft: wp("1.5%"),
                        fontWeight: 'bold',
                        textAlignVertical: 'top',
                    }}>Região</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: hp("1%"),
                            marginLeft: wp("1.5%")
                        }}
                    >
                        <Regiao_icon style={styles_wine.info_icon}/>
                        <Text style={styles_wine.type_txt}>{regiaoProps}</Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: hp("2%"),
                    marginBottom: hp("1%")
                }}
            >
                <View style={styles_wine.type_info_2}>
                    <Text style={styles_wine.subtitle_t}>Comida</Text>

                    {
                        comidaProps.map((prop, key) => {
                            if (prop == 'Café') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Coffee_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Peixe') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Fish_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Vegetais') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Vegetal_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Galinha') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Meat_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Carne') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Steak_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Marisco') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Shrimp_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Salada') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Vegetal_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Queijo') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Cheese_icon style={styles_wine.info_icon}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                            if (prop == 'Chocolate Preto') {
                                return (
                                    <View key={key}
                                          style={{flexDirection: "row", marginTop: hp("1%"), marginLeft: wp("1.5%")}}>
                                        <Chocolate_icon width={wp('5%')} height={wp('5%')} marginRight={wp('1%')}/>
                                        <Text style={styles_wine.type_txt}>{prop}</Text>
                                    </View>
                                )
                            }
                        })

                    }
                </View>
                <View style={{
                    width: wp("50%"),
                    height: "auto", paddingLeft: wp('9%'),
                }}>
                    <Text style={{fontSize: wp("4%"),
                        color: "#aa5766",
                        marginLeft: wp("1.5%"),
                        fontWeight: 'bold',
                        textAlignVertical: 'top',}}>Tipo</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: hp("1%"),
                            marginLeft: wp("1.5%"),
                        }}
                    >
                        <Wine_icon fill={'#000'} width={wp('5%')} height={wp('5%')} marginRight={wp('1%')}/>
                        <Text style={styles_wine.type_txt}>{tipoProps}</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
);
export default Info_wine;
