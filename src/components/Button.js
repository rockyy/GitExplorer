import React, {Component} from 'react';
// import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

{
  /* <Button title="Login" onPress={onLoginPressed} />           */
}

export default function Button({style, title, ...props}) {
  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Touchable style={[styles.button]} {...props}>
      <View style={[styles.textContainer, style]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    textAlign: 'center',
  },
  textContainer: {
    width: '100%',
    backgroundColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
