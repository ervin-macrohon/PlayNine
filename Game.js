import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stars } from './Stars';
import { SubmitButton } from './SubmitButton';
import { Answer } from './Answer';
import { Numbers } from './Numbers';
import { DoneFrame } from './DoneFrame';
import { possibleCombinationSum } from './api';

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        width: '30%'
    },
    game: {
        marginTop: '40%',
        height: '100%',
        width: '100%',
        padding: '10%'
    }
});

export default class Game extends React.Component{
    static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    state = {
        selectedNumbers: [],
        numStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null
    }
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0){ return; }
        if (this.state.usedNumbers.indexOf(clickedNumber) >= 0){ return; }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };
    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers
                .filter(number => number !== clickedNumber)   
        }))
    };
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numStars === 
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numStars: Game.randomNumber()
        }), this.updateDoneStatus)
    };
    redraw = () => {
        if (this.state.redraws === 0){ return; }
        this.setState((prevState) => ({
            numStars: Game.randomNumber(),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus)
    };
    possibleSolutions = ({ numStars, usedNumbers }) => {
        let possibleNumbers = [];
        for (let i = 1; i < 10; i++){
            possibleNumbers.push(i);
        }
        possibleNumbers = possibleNumbers.filter(number => 
            usedNumbers.indexOf(number) === -1    
        );
        return possibleCombinationSum(possibleNumbers, numStars);
    };
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9){
                return { doneStatus: 'Done. Nice!' };
            }
            if (this.state.redraws === 0 && !this.possibleSolutions(prevState)){
                return { doneStatus: 'Game Over!' }
            }
        })
    };
    render(){
        const {
            selectedNumbers,
            numStars,
            answerIsCorrect,
            usedNumbers,
            redraws,
            doneStatus
        } = this.state;
        return(
            <View
                style={styles.game}>
                <Text style={{fontSize: 40, justifyContent: 'center', fontWeight: 'strong'}}>Play Nine</Text>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginBottom: 40
                    }}
                    />
                <View
                    style={styles.row}>
                    <Stars 
                        numStars={numStars} />
                    <SubmitButton 
                        selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect} 
                        acceptAnswer={this.acceptAnswer} 
                        redraw={this.redraw}
                        redraws={redraws} />
                    <Answer 
                        selectedNumbers={selectedNumbers} 
                        unselectNumber={this.unselectNumber} />
                </View>
                {
                    doneStatus ?
                        <DoneFrame doneStatus={doneStatus} />
                    :
                        <Numbers 
                            style={{backgroundColor: '#333'}}
                            selectedNumbers={selectedNumbers} 
                            selectNumber={this.selectNumber}
                            usedNumbers={usedNumbers} /> 
                }

            </View>
        );
    }
}