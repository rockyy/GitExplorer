import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {LoginScreen} from '../modules/auth/login';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const AuthNavigator = () => {
  return <AuthStack />;
};

export default AuthNavigator;
