const Cheese = () => {

    if (this.state.foodChoice === "Queijos" && cheeseClick === false) {
        cheeseClick = true;

        return (
            <View style={styles_search.food_selected}>
                <Cheese_icon style={styles_search.food_cat_selected}/>
            </View>
        )
    } else if (this.state.foodChoice === "Queijos" && cheeseClick === true) {
        cheeseClick = false;

        return (
            <View style={styles_search.food}>
                <Cheese_icon style={styles_search.food_cat}/>
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
    if (this.state.foodChoice === "Peixes" && fishClick === false) {
        fishClick = true;

        return (
            <View style={styles_search.food_selected}>
                <Fish_icon style={styles_search.food_cat_selected}/>
            </View>
        )
    } else if (this.state.foodChoice === "Peixes" && fishClick === true) {
        fishClick = false;
        return (
            <View style={styles_search.food}>
                <Fish_icon style={styles_search.food_cat}/>
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

    if (this.state.foodChoice === "Carnes" && meatClick === false) {
        meatClick = true;

        return (
            <View style={styles_search.food_selected}>
                <Meat_icon style={styles_search.food_cat_selected}/>
            </View>
        )
    } else if (this.state.foodChoice === "Carnes" && meatClick === true) {
        meatClick = false;
        return (
            <View style={styles_search.food}>
                <Meat_icon style={styles_search.food_cat}/>
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

    if (this.state.foodChoice === "Mariscos" && shrimpClick === false) {
        shrimpClick = true;
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
    } else if (this.state.foodChoice === "Mariscos" && shrimpClick === true) {
        shrimpClick = false;

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

    if (this.state.foodChoice === "Sobremesas" && dessertClick === false) {
        dessertClick = true;
        return (
            <View style={styles_search.food_selected}>
                <Dessert_icon style={styles_search.food_cat_selected}/>
            </View>
        )
    } else if (this.state.foodChoice === "Sobremesas" && dessertClick === true) {
        dessertClick = false;
        return (
            <View style={styles_search.food}>
                <Dessert_icon style={styles_search.food_cat}/>
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

    if (this.state.foodChoice === "Vegetais" && vegetalClick === false) {
        vegetalClick = true;
        return (
            <View style={styles_search.food_selected}>
                <Vegetal_icon style={styles_search.food_cat_selected}/>
            </View>
        )
    } else if (this.state.foodChoice === "Vegetais" && vegetalClick === true) {
        vegetalClick = false;
        return (
            <View style={styles_search.food}>
                <Vegetal_icon style={styles_search.food_cat}/>
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
    if (this.state.wineType === "Tinto" && tintoClick === false) {
        tintoClick = true;


        return (<View style={styles_search.type_selected}>
            <Text style={styles_search.type_txt_selected}>Tinto</Text>
        </View>)
    } else if (this.state.wineType === "Tinto" && tintoClick === true) {
        tintoClick = false;

        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Tinto</Text>
        </View>)
    } else {
        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Tinto</Text>
        </View>)
    }
};
const Branco = () => {
    if (this.state.wineType === "Branco" && brancoClick === false) {
        brancoClick = true;
        return (<View style={styles_search.type_selected}>
            <Text style={styles_search.type_txt_selected}>Branco</Text>
        </View>)
    } else if (this.state.wineType === "Branco" && brancoClick === true) {
        brancoClick = false;
        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Branco</Text>
        </View>)

    } else {
        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Branco</Text>
        </View>)
    }
};
const Moscatel = () => {
    if (this.state.wineType === "Moscatel" && moscatelClick === false) {

        moscatelClick = true;

        return (<View style={styles_search.type_selected}>
            <Text style={styles_search.type_txt_selected}>Moscatel</Text>
        </View>)
    } else if (this.state.wineType === "Moscatel" && moscatelClick === true) {

        moscatelClick = false;

        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Moscatel</Text>
        </View>)
    } else {
        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Moscatel</Text>
        </View>)
    }
};
const Rose = () => {
    if (this.state.wineType === "Rose" && roseClick === false) {

        roseClick = true;
        return (<View style={styles_search.type_selected}>
            <Text style={styles_search.type_txt_selected}>Rosé</Text>
        </View>)
    } else if (this.state.wineType === "Moscatel" && roseClick === true) {

        roseClick = false;
        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Rosé</Text>
        </View>)
    } else {
        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Rosé</Text>
        </View>)
    }
};
const Verde = () => {
    if (this.state.wineType === "Verde" && verdeClick === false) {

        verdeClick = true;

        return (<View style={styles_search.type_selected}>
            <Text style={styles_search.type_txt_selected}>Verde</Text>
        </View>)
    } else if (this.state.wineType === "Verde" && verdeClick === true) {
        verdeClick = false;


        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Verde</Text>
        </View>)

    } else {
        return (<View style={styles_search.type}>
            <Text style={styles_search.type_txt}>Verde</Text>
        </View>)
    }
};

//--------------------CASTA----------------------------------

const Alvarinho = () => {
    if (this.state.grapeType === "Alvarinho" && alvarinhoClick === false) {
        alvarinhoClick = true;
        return (
            <View style={styles_search.casta_selected}>
                <Text style={styles_search.casta_txt_selected}>Alvarinho</Text>
            </View>
        )
    } else if (this.state.grapeType === "Alvarinho" && cheeseClick === true) {
        alvarinhoClick = false;
        return (
            <View style={styles_search.casta}>
                <Text style={styles_search.casta_txt}>Alvarinho</Text>
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
    if (this.state.grapeType === "Aragones" && aragonesClick === false) {
        aragonesClick = true;
        return (
            <View style={styles_search.casta_selected}>
                <Text style={styles_search.casta_txt_selected}>Aragones</Text>
            </View>
        )
    } else if (this.state.grapeType === "Aragones" && aragonesClick === true) {
        aragonesClick = false;
        return (
            <View style={styles_search.casta}>
                <Text style={styles_search.casta_txt}>Aragones</Text>
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
    if (this.state.grapeType === "Arinto" && arintoClick === false) {

        arintoClick = true;

        return (
            <View style={styles_search.casta_selected}>
                <Text style={styles_search.casta_txt_selected}>Arinto</Text>
            </View>
        )
    } else if (this.state.grapeType === "Arinto" && arintoClick === true) {

        arintoClick = false;

        return (
            <View style={styles_search.casta}>
                <Text style={styles_search.casta_txt}>Arinto</Text>
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
    if (this.state.grapeType === "Moscatel" && moscatelcastaClick === false) {

        moscatelcastaClick = true;

        return (
            <View style={styles_search.casta_selected}>
                <Text style={styles_search.casta_txt_selected}>Moscatel</Text>
            </View>
        )
    } else if (this.state.grapeType === "Moscatel" && moscatelcastaClick === true) {

        moscatelcastaClick = false;

        return (
            <View style={styles_search.casta}>
                <Text style={styles_search.casta_txt}>Moscatel</Text>
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
    if (this.state.grapeType === "Syrah" && syrahClick === false) {
        syrahClick = true;

        return (
            <View style={styles_search.casta_selected}>
                <Text style={styles_search.casta_txt_selected}>Syrah</Text>
            </View>
        )
    } else if (this.state.grapeType === "Syrah" && syrahClick === true) {

        syrahClick = false;

        return (
            <View style={styles_search.casta}>
                <Text style={styles_search.casta_txt}>Syrah</Text>
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
    if (this.state.grapeType === "Franca" && francaClick === false) {

        francaClick = true;

        return (
            <View style={styles_search.casta_selected}>
                <Text style={styles_search.casta_txt_selected}>Touriga</Text>
                <Text style={styles_search.casta_txt_selected}>Franca</Text>
            </View>
        )
    } else if (this.state.grapeType === "Franca" && francaClick === true) {
        francaClick = false;
        return (
            <View style={styles_search.casta}>
                <Text style={styles_search.casta_txt}>Touriga</Text>
                <Text style={styles_search.casta_txt}>Franca</Text>
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
    if (this.state.grapeType === "Nacional" && nacionalClick === false) {
        nacionalClick = true;
        return (
            <View style={styles_search.casta_selected}>
                <Text style={styles_search.casta_txt_selected}>Touriga</Text>
                <Text style={styles_search.casta_txt_selected}>Nacional</Text>
            </View>
        )
    } else if (this.state.grapeType === "Nacional" && nacionalClick === true) {
        nacionalClick = false;
        return (
            <View style={styles_search.casta}>
                <Text style={styles_search.casta_txt}>Touriga</Text>
                <Text style={styles_search.casta_txt}>Nacional</Text>
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
    if (this.state.wineRegion === "Alentejo" && alentejoClick === false) {
        alentejoClick = true;
        return (<View style={styles_search.regiao_selected}>
            <Text style={styles_search.regiao_txt_selected}>Alentejo</Text>
        </View>)
    } else if (this.state.wineRegion === "Alentejo" && alentejoClick === true) {
        alentejoClick = false;
        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Alentejo</Text>
        </View>)
    } else {
        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Alentejo</Text>
        </View>)
    }
};
const Bairrada = () => {
    if (this.state.wineRegion === "Bairrada" && bairradaClick === false) {
        bairradaClick = true;

        return (<View style={styles_search.regiao_selected}>
            <Text style={styles_search.regiao_txt_selected}>Bairrada</Text>
        </View>)
    } else if (this.state.wineRegion === "Bairrada" && bairradaClick === true) {
        bairradaClick = false;

        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Bairrada</Text>
        </View>)
    } else {
        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Bairrada</Text>
        </View>)
    }
};
const Douro = () => {
    if (this.state.wineRegion === "Douro" && douroClick === false) {

        douroClick = true;

        return (<View style={styles_search.regiao_selected}>
            <Text style={styles_search.regiao_txt_selected}>Douro</Text>
        </View>)
    } else if (this.state.wineRegion === "Douro" && douroClick === true) {

        douroClick = false;

        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Douro</Text>
        </View>)
    } else {
        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Douro</Text>
        </View>)
    }
};
const Setubal = () => {
    if (this.state.wineRegion === "Setubal" && setubalClick === false) {

        setubalClick = true;
        return (<View style={styles_search.regiao_selected}>
            <Text style={styles_search.regiao_txt_selected}>Península</Text>
            <Text style={styles_search.regiao_txt_selected}>de Setubal</Text>
        </View>)
    } else if (this.state.wineRegion === "Setubal" && setubalClick === true) {

        setubalClick = false;
        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Península</Text>
            <Text style={styles_search.regiao_txt}>de Setubal</Text>
        </View>)
    } else {
        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Península</Text>
            <Text style={styles_search.regiao_txt}>de Setubal</Text>
        </View>)
    }
};
const Penafiel = () => {
    if (this.state.wineRegion === "Penafiel" && penafielClick === false) {

        penafielClick = true;

        return (<View style={styles_search.regiao_selected}>
            <Text style={styles_search.regiao_txt_selected}>Penafiel</Text>
        </View>)
    } else if (this.state.wineRegion === "Penafiel" && penafielClick === true) {

        penafielClick = false;

        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Penafiel</Text>
        </View>)
    } else {
        return (<View style={styles_search.regiao}>
            <Text style={styles_search.regiao_txt}>Penafiel</Text>
        </View>)
    }
};