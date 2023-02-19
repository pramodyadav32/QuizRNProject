import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import * as constant from './Utils/constant';

const StartScreen = props => {
  const [initialList, setInitialList] = useState(JSON.stringify(data));

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>Welcome to Quiz App</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('QuestionScreen', {dataList: initialList});
        }}>
        <Text style={styles.buttonTitle}>Quiz Start</Text>
      </Pressable>
    </View>
  );
};
export default StartScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: constant.resW(8),
    color: '#000',
  },
  button: {
    backgroundColor: constant.BaseColor,
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: constant.resW(4.5),
    paddingVertical: '1.5%',
    paddingHorizontal: '4%',
  },
});

const data = [
  {
    questionId: 1,
    questionLabel: 'How many bits are in a byte?',
    questionType: 1,
    options: [
      {
        optionId: 1,
        optionLabel: '1',
      },
      {
        optionId: 2,
        optionLabel: '2',
      },
      {
        optionId: 3,
        optionLabel: '4',
      },
      {
        optionId: 4,
        optionLabel: '8',
      },
    ],
    correctAnswer: [
      {
        answerId: 4,
      },
    ],
    givenAnswer: [],
  },
  {
    questionId: 2,
    questionLabel: 'What is H2O?',
    questionType: 1,
    options: [
      {
        optionId: 1,
        optionLabel: 'Water',
      },
      {
        optionId: 2,
        optionLabel: 'Oxygen',
      },
      {
        optionId: 3,
        optionLabel: 'Hydrogen',
      },
      {
        optionId: 4,
        optionLabel: 'Carbon',
      },
    ],
    correctAnswer: [
      {
        answerId: 1,
      },
    ],
    givenAnswer: [],
  },
  {
    questionId: 3,
    questionLabel: 'What does H2O include?',
    questionType: 2,
    options: [
      {
        optionId: 1,
        optionLabel: 'Hydrogen',
      },
      {
        optionId: 2,
        optionLabel: 'Oxygen',
      },
      {
        optionId: 3,
        optionLabel: 'Palladium',
      },
      {
        optionId: 4,
        optionLabel: 'Carbon',
      },
    ],
    correctAnswer: [
      {
        answerId: 1,
      },
      {
        answerId: 2,
      },
    ],
    givenAnswer: [],
  },
  {
    questionId: 4,
    questionLabel: 'Where is an Eiffel Tower?',
    questionType: 3,
    options: [
      {
        optionId: 1,
        optionLabel: 'Paris',
      },
      {
        optionId: 2,
        optionLabel: 'Berlin',
      },
      {
        optionId: 3,
        optionLabel: 'London',
      },
      {
        optionId: 4,
        optionLabel: 'Tokyo',
      },
      {
        optionId: 5,
        optionLabel: 'Las Vegas',
      },
    ],
    correctAnswer: [
      {
        answerId: 1,
      },
    ],
    optionalAnswer: [
      {
        answerId: 4,
      },
      {
        answerId: 5,
      },
    ],
    givenAnswer: [],
  },
  {
    questionId: 5,
    questionLabel: 'Who discovered that the earth revolves around the sun?',
    questionType: 1,
    options: [
      {
        optionId: 1,
        optionLabel: 'Galileo Galilei',
      },
      {
        optionId: 2,
        optionLabel: 'Isaac Newton',
      },
      {
        optionId: 3,
        optionLabel: 'Johannes Kepler',
      },
      {
        optionId: 4,
        optionLabel: 'Nicolaus Copernicus',
      },
    ],
    correctAnswer: [
      {
        answerId: 4,
      },
    ],
    givenAnswer: [],
  },
];
