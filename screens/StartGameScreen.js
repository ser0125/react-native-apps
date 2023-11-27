import { useState } from 'react';
import {
    Alert, StyleSheet, TextInput, View, useWindowDimensions,
    KeyboardAvoidingView, ScrollView
} from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";

import Colors from '../constants/colors';
import Title from '../components/UI/Title';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';

function StartGameScreen({ onPickNumber }) {
    const [enterNumber, setEnterNumber] = useState('');

    const { width, height } = useWindowDimensions();

    function numberEnterChanged(number) {
        setEnterNumber(number);
    };

    function resetInputHandler() {
        setEnterNumber('');
    };

    function confirmInputHandler() {
        const chosenNumber = parseInt(enterNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <Title>Guess my Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput value={enterNumber} onChangeText={numberEnterChanged} style={styles.input} maxLength={2} keyboardType="number-pad" autoCapitalize="none" autoCorrect={false} />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.btnContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.btnContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card >
                </View >
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

//const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        //marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: 'center'
    },
    input: {
        height: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        width: 50,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    btnContainer: {
        flex: 1
    }
})

export default StartGameScreen;