import React, {Component} from 'react';

import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const bottomSheet = (ui, show, cb) => {
  const styles = StyleSheet.create({
    bottomSheet: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.54)',
      position: 'absolute',
    },
    bottomSheetBackGround: {
      backgroundColor: '#fefefe',
    },
  });
  if (show)
    return (
      <View style={styles.bottomSheet}>
        <TouchableHighlight
          style={{flex: 1, justifyContent: 'flex-end'}}
          onPress={() => cb.close()}
          underlayColor={'#eee'}>
          <TouchableHighlight
            onPress={() => console.log(`bottomSheet onPress`)}
            underlayColor={'transparent'}
            style={{width: '100%'}}>
            <View style={styles.bottomSheetBackGround}>
              <TouchableHighlight
                style={{padding: 12, alignItems: 'flex-end'}}
                onPress={() => cb.close()}
                underlayColor={'#eee'}>
                <Image
                  style={{height: 20, width: 20, tintColor: 'gray'}}
                  source={require('../assets/cancel.png')}
                />
              </TouchableHighlight>
              <View style={{width: '100%'}}>{ui()}</View>
            </View>
          </TouchableHighlight>
        </TouchableHighlight>
      </View>
    );
  else return <View />;
};

export {bottomSheet};
