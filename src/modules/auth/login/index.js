import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Background from '../../../components/Background';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import {emailValidator} from '../../../helper/emailValidator';
import {passwordValidator} from '../../../helper/passwordValidator';
import styles from './style';

import {connect} from 'react-redux';
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from './user/actions';

import {getUserLoginFunc} from './user/actions';

const mapStateToProps = (state, props) => {
  const {id, name} = state.user;
  return {id, name};
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLogin: getUserLoginFunc(dispatch),
  };
};

const LoginView = ({name, getUserLogin}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState('');
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  var emailError = '';
  var passwordError = '';
  useEffect(() => {
    console.log(` LoginView useEffect :>> ${email}`);
    console.log(` Errors  :>> ${emailError}  ${passwordError}`);
  }, [name]);
  const onLoginPressed = () => {
    console.log(`onLoginPressed `);

    emailError = emailValidator(email);
    passwordError = passwordValidator(password);
    if (emailError || passwordError) {
      console.log(`onLoginPressed ERROR ${emailError}  ${passwordError}`);
      forceUpdate();
      return;
    }

    const param = {email: email, password: password};
    getUserLogin(param);
  };

  const onRegisterPress = () => {};

  const resetPasswordPress = () => {};

  return (
    <Background>
      <TextInput
        placeholder="Email"
        returnKeyType="next"
        value={email}
        onChangeText={text => setEmail(text)}
        error={!!emailError}
        errorText={emailError}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword(text)}
        error={!!passwordError}
        errorText={passwordError}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={resetPasswordPress}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        style={styles.loginButton}
        title="Login"
        onPress={onLoginPressed}
      />

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={onRegisterPress}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginView);

export {LoginScreen};
