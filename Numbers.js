import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// custom classes
const s = StyleSheet.create({
    number:{
        fontSize: 18
    },
    coin: {
        backgroundColor: '#ccc',
        width: 22,
        height: 22,
        textAlign: 'center',
        paddingLeft: 6,
        borderRadius: 50,
        marginTop: 5
    },
    selected: {
        backgroundColor: '#eee',
        color: '#ddd'
    },
    used: {
        backgroundColor: '#aaddaa',
        color: '#99bb99'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    box: {
        borderStyle: 'solid',
        borderWidth: 1,
        width: '100%',
        height: '7.5%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: '#fff'
    }
});

export const Numbers = (props) =>{
    const numbersArray = [];
    
    for (let i = 1; i < 10; i++){
        numbersArray.push(i);
    }

    const numberStyle = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0){
            return [s.coin, s.used];
        }
        if (props.selectedNumbers.indexOf(number) >= 0){
            return [s.coin, s.selected];
        }
        return s.coin;
    }
    return(
        <View style={s.box}>
            <View style={s.container}>
                {numbersArray.map((number, i) => 
                    <TouchableHighlight 
                        key={i} 
                        style={[s.text, numberStyle(number)]}
                        onPressOut={() => props.selectNumber(number)}>
                        <Text
                            style={s.number}>
                            {number}
                        </Text>
                    </TouchableHighlight>
                )}
            </View>
        </View>
    );
}