import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

// custom constants
constants = {
  BODY_COLOR, TEXT_MUTED,
};

// custom classes
const classes = {
  num: {
      backgroundColor: '#ccc',
      width: 18,
      height: 18,
      textAlign: 'center',
      paddingLeft: 5,
      borderRadius: 50,
      margin: 2.5
  },
  numbersContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "flex-start"
  }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();

export const Answer = (props) =>{
    return(
        <View style={{width: '40%',  height: '40%'}}>
            <View style={styles.numbersContainer}>
                {props.selectedNumbers.map(
                    (number, i) => 
                        <TouchableHighlight 
                            key={i} 
                            style={[s.text, s.num]}
                            onPressOut={() => props.unselectNumber(number)}>
                            <Text>
                                {number}
                            </Text>
                        </TouchableHighlight>
                )}
            </View>
        </View>
    );
}