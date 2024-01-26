import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

const CaixaTexto = ({tipo, icone, value, onChangeText, seguranca})=>{
    return(
        <View style={styles.inputBox}>
            {icone}
            <TextInput
                style={styles.caixaInput}
                value={value}
                placeholder= {tipo}
                onChangeText={onChangeText}
                secureTextEntry={seguranca}
                autoCorrect = {false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        width: 100 + '%',
        borderWidth: 0,
        borderRadius: 3,
        marginBottom: 8,
    },
    caixaInput: {
        width: 100 + '%',
        color: 'black',
        borderWidth: 0
    },
});

export {CaixaTexto};