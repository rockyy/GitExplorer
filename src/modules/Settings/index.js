import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';

import {getUserLogoutFunc} from '../auth/login/user/actions';

const mapDispatchToProps = dispatch => {
  return {
    getUserLogout: getUserLogoutFunc(dispatch),
  };
};

let setting = [
  {id: 'id1', label: 'Logout'},
  {id: 'id2', label: 'Version : 1.0'},
];
const SettingsView = ({getUserLogout, navigation}) => {
  const settingAction = setting => {
    switch (setting.label) {
      case 'Logout': {
        getUserLogout();
      }
    }
  };
  const renderSetting = setting => {
    return (
      <View style={styles.setting}>
        <TouchableOpacity
          onPress={() => {
            settingAction(setting);
          }}>
          <Text style={styles.title}>{setting.label}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.settingList}
        data={setting}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderSetting(item)}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f5',
    flex: 1,
  },
  settingList: {
    paddingBottom: 4,
    marginTop: 10,
  },
  setting: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    margin: 4,
    padding: 16,
  },

  title: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const Settings = connect(null, mapDispatchToProps)(SettingsView);

export {Settings};
