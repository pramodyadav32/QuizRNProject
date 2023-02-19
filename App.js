// In App.js in a new project
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import screens
import StartScreen from './src/StartScreen';
import QuestionScreen from './src/QuestionScreen'
import SummeryScreen  from './src/SummeryScreen'


const Stack = createNativeStackNavigator();

 const App = (props)=> {

  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          initialRouteName: 'StartScreen',
          headerShown: false,
          animation:'none'
        }}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
          <Stack.Screen name="SummeryScreen" component={SummeryScreen} />

      
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
