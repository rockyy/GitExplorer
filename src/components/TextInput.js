import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native';

export default function TextInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <Input style={styles.input} selectionColor={'black'} {...props} />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#00000000',
    borderWidth: 0.2,
    borderRadius: 2,
  },
  description: {
    fontSize: 13,
    color: 'blue',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
});
