import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    starsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "flex-start"
    }
});

export const Stars = (props) =>{

    let stars = [];
    for (let i = 0; i < props.numStars; i++) {
        stars.push(<Icon
            key={i}
            name="star"
            size={25}
        />)
    }
    return(
        <View style={{width: '40%', height: '40%'}}>
            <View style={styles.starsContainer}>
            {stars}
            </View>
        </View>
    );
}