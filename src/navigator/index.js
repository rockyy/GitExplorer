import * as React from 'react';
import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
  const {accessToken} = state.user;
  return {accessToken};
};

const RootNavigatorComponent = ({accessToken, navigation}) => {
  useEffect(() => {}, [accessToken]);

  return (
    <NavigationContainer>
      {accessToken && <AppNavigator />}
      {!accessToken && <AuthNavigator />}
    </NavigationContainer>
  );
};

const RootNavigator = connect(mapStateToProps, null)(RootNavigatorComponent);

export {RootNavigator};
