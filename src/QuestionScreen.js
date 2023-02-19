import React, {useState, useRef} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid,
} from 'react-native';
import * as constant from './Utils/constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './component/Header';
import {CommonActions} from '@react-navigation/native';

const QuestionScreen = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionList, setQuestionList] = useState(
    JSON.parse(props.route.params.dataList),
  );
  const flatListRef = useRef(null);

  const fn_Next = () => {
    if (questionList[currentIndex].givenAnswer.length > 0) {
      if (currentIndex !== questionList.length - 1) {
        setCurrentIndex(currentIndex + 1);
        flatListRef?.current?.scrollToIndex({
          animated: true,
          index: currentIndex + 1,
        });
      } else {
        let sendArray = [...questionList];
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SummeryScreen', params: {finalList: sendArray}}],
          }),
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'Please select option',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  const chooseOption = (item, option, index) => {
    if (item.questionType === 1) {
      let newObj = item;
      let newArray = [...questionList];
      let newAnswer = {answerId: option.optionId};
      newObj.givenAnswer = [newAnswer];
      newArray.splice(index, 1, newObj);
      setQuestionList([...newArray]);
    } else {
      let newObj = item;
      let newArray = [...questionList];
      let newAnswer = {answerId: option.optionId};
      let indexValue = item.givenAnswer.findIndex(
        obj => obj.answerId === option.optionId,
      );
      if (indexValue === -1) {
        newObj.givenAnswer.push(newAnswer);
        newArray.splice(index, 1, newObj);
        setQuestionList([...newArray]);
      } else {
        newObj.givenAnswer.splice(indexValue, 1);
        newArray.splice(index, 1, newObj);
        setQuestionList([...newArray]);
      }
    }
  };

  const chooseIcon = (item, option) => {
    let indexValue = item.givenAnswer.findIndex(
      obj => obj.answerId === option.optionId,
    );
    if (item.questionType === 1) {
      return indexValue !== -1 ? 'radio-button-on' : 'radio-button-off';
    } else {
      return indexValue !== -1 ? 'check-box' : 'check-box-outline-blank';
    }
  };

  return (
    <View style={styles.mainView}>
      <Header title={'Question ' + (currentIndex + 1)} />
      <FlatList
        data={questionList}
        ref={flatListRef}
        keyExtractor={item => item.questionId}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => (
          <View style={styles.questionView}>
            <View style={styles.questionMainView}>
              <Text style={styles.questionNo}>{index + 1}.</Text>
              <Text style={styles.questionLabel}>{item.questionLabel}</Text>
            </View>
            {item.options.map(option => (
              <Pressable
                key={option.optionId}
                style={styles.optionButton}
                onPress={() => {
                  chooseOption(item, option, index);
                }}>
                <Icon
                  name={chooseIcon(item, option)}
                  style={styles.optionIcon}
                />
                <Text style={styles.optionLabel}>{option.optionLabel}</Text>
              </Pressable>
            ))}
          </View>
        )}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          fn_Next();
        }}>
        <Text style={styles.buttonTitle}>
          {currentIndex === questionList.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </Pressable>
    </View>
  );
};
export default QuestionScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  questionView: {
    width: constant.resW(100),
  },
  questionMainView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: '5%',
    paddingHorizontal: '3%',
  },
  questionNo: {
    fontSize: constant.resW(5),
    color: '#000',
    marginHorizontal: '2%',
  },
  questionLabel: {
    fontSize: constant.resW(5),
    color: '#000',
  },

  title: {
    fontSize: constant.resW(8),
    color: '#000',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '8%',
    marginTop: '4%',
  },
  optionIcon: {
    fontSize: constant.resW(7),
    color: '#000',
  },
  optionLabel: {
    fontSize: constant.resW(5),
    color: '#000',
    marginLeft: '3%',
  },
  button: {
    backgroundColor: constant.BaseColor,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginBottom: '5%',
    marginRight: '5%',
  },
  buttonTitle: {
    fontSize: constant.resW(5),
    paddingVertical: '1.5%',
    paddingHorizontal: '6%',
  },
});
