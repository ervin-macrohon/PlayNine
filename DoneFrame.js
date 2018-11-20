import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const s = StyleSheet.create({
    doneMessage: {
        fontSize: 40,
        textAlign: 'center'
    }
});

export const DoneFrame = (props) => {
    return(
        <View>
            <Text
                style={s.doneMessage}>
                {props.doneStatus}
            </Text>
        </View>
    );
}