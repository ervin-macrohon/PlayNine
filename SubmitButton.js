import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

// custom constants
constants = {
  BODY_COLOR, TEXT_MUTED,
};

// custom classes
const classes = {
    middleButton:{
        height: 36.7,
        width: 55.7
    },
    success: {
        backgroundColor: 'green'
    },
    fail: {
        backgroundColor: 'red'
    },
    refresh: {
        backgroundColor: 'orange'
    },
    refreshButton: {
        flex: 1,
        flexDirection: 'row'
    },
    refreshText: {
        color: 'white',
        marginLeft: 2
    }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
const c = constants = bootstrapStyleSheet.constants;

export const SubmitButton = (props) =>{
    let button;
    switch(props.answerIsCorrect){
        case true:
            button = <TouchableHighlight 
                style={[s.middleButton, s.btnTouchable]} 
                onPressOut={() => props.acceptAnswer()}>
                <View style={[s.btn, s.btnPrimary, s.success]}>
                    <Icon
                        name="check"
                        size={15}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableHighlight>;
        break;
        case false:
            button = <TouchableHighlight 
                style={[s.middleButton, s.btnTouchable]} >
                <View style={[s.btn, s.btnPrimary, s.fail]}>
                    <Icon
                        name="times"
                        size={15}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableHighlight>;
        break;
        default:
        button = <TouchableHighlight 
            style={[s.middleButton, s.btnTouchable]}
            disabled={props.selectedNumbers.length === 0}
            onPressOut={() => props.checkAnswer()}>
            <View style={[s.btn, s.btnPrimary]}>
                <Text style={[s.btnText, s.btnTextPrimary]}>=</Text>
            </View>
        </TouchableHighlight>;
        break;
    }
    return(
        <View>
            {button}
            <View style={{ height: 5, width: 55.7 }}></View>
            <TouchableHighlight
                onPressOut={props.redraw}
                disabled={props.redraws === 0}>
                <View style={[s.btn, s.btnPrimary, s.refresh, s.middleButton]}>
                    <View style={s.refreshButton}>
                        <Icon
                            name="refresh"
                            size={15}
                            style={{color: 'white'}}
                        />
                        <Text
                            style={s.refreshText}>
                            {props.redraws}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
        
    );
}