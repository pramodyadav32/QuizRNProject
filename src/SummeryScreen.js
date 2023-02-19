import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import * as constant from './Utils/constant';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './component/Header';
import {CommonActions} from '@react-navigation/native';

const SummeryScreen = props => {
  const [questionList, setQuestionList] = useState(
    props.route.params.finalList,
  );
  const flatListRef = useRef(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    props.navigation.navigate('StartScreen');
    return true;
  };

  useEffect(() => {
    setLoader(true);
    let newArray = [];
    questionList.map(item => {
      let res = item.givenAnswer.filter(
        item1 =>
          !item.correctAnswer.some(item2 => item2.answerId === item1.answerId),
      );
      let res1 = item.givenAnswer.filter(item1 =>
        item.correctAnswer.some(item2 => item2.answerId === item1.answerId),
      );

      if (item.questionType === 3) {
        if (res1.length === 1) {
          item.status = true;
          newArray.push(item);
        } else {
          item.status = false;
          newArray.push(item);
        }
      } else {
        if (res.length === 0) {
          item.status = true;
          newArray.push(item);
        } else {
          item.status = false;
          newArray.push(item);
        }
      }
    });
    setQuestionList(newArray);
    setLoader(false);
  }, []);
  const fn_Next = () => {
    // questionList.map(item => {
    //   newArray.remove(item.status)
    //   newArray.remove(item.status)
    // });
    props.navigation.reset({
      index: 0,
      routes: [{name: 'StartScreen'}],
    });
    // props.navigation.navigate('QuestionScreen');
  };

  const getAnswer = item => {
    let res = item.options.filter(item1 =>
      item.givenAnswer.some(item2 => item2.answerId === item1.optionId),
    );
    let newArray = res.map(function (ans) {
      return ans.optionLabel;
    });
    return newArray.toString();
  };

  const correctAnswer = item => {
    let res = item.options.filter(item1 =>
      item.correctAnswer.some(item2 => item2.answerId === item1.optionId),
    );
    let newArray = res.map(function (ans) {
      return ans.optionLabel;
    });
    return newArray.toString();
  };

  const getResult = () => {
    let count = 0;
    let res = questionList.map(item => {
      if (item.questionType == 1 || item.questionType == 3) {
        item.status === true ? (count = count + 1) : null;
        if (item.questionType == 3 && item.status === true) {
          let res = item.givenAnswer.filter(item1 =>
            item.optionalAnswer.some(item2 => {
              return item2.answerId === item1.answerId;
            }),
          );
          count = count + res.length;
        }
      } else {
        let res = item.givenAnswer.filter(item1 =>
          item.correctAnswer.some(item2 => {
            return item2.answerId === item1.answerId;
          }),
        );
        count = count + res.length;
      }
    });
    return count;
  };

  return (
    <View style={styles.mainView}>
      <Header title="Summery" />
      {loader ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={constant.BaseColor} size="large" />
        </View>
      ) : (
        <FlatList
          data={questionList}
          ref={flatListRef}
          ListFooterComponent={() => (
            <>
              <View style={[styles.questionMainView, {marginTop: '8%'}]}>
                <Text style={styles.questionAns}>Result: </Text>
                <Text style={styles.questionLabel}>{getResult()}</Text>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => {
                  fn_Next();
                }}>
                <Text style={styles.buttonTitle}>Restart Quiz</Text>
              </Pressable>
            </>
          )}
          renderItem={({item, index}) => (
            <View style={styles.questionView}>
              <View style={[styles.questionMainView, {marginTop: '5%'}]}>
                <Text style={styles.questionNo}>{index + 1}.</Text>
                <Text style={styles.questionLabel}>{item.questionLabel}</Text>
              </View>
              <View style={styles.questionMainView}>
                <Text style={styles.questionAns}>Answer: </Text>
                <Text style={styles.questionLabel}>
                  {getAnswer(item, index)}
                </Text>
              </View>
              {item?.status === false && (
                <View style={styles.questionMainView}>
                  <Text style={styles.questionAns}>Correct Answer :</Text>
                  <Text style={styles.questionLabel}>
                    {correctAnswer(item, index)}
                  </Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};
export default SummeryScreen;

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
    marginTop: '2%',
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
  questionAns: {
    fontSize: constant.resW(5),
    color: '#000',
    marginHorizontal: '2%',
  },
  title: {
    fontSize: constant.resW(8),
    color: '#000',
  },

  button: {
    backgroundColor: constant.BaseColor,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginBottom: '5%',
    marginRight: '5%',
    marginTop: '8%',
  },
  buttonTitle: {
    fontSize: constant.resW(5),
    paddingVertical: '1.5%',
    paddingHorizontal: '6%',
  },
});
