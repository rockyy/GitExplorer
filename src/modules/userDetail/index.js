import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AccessLocation from '../../utils/AccessLocation';
import * as Utility from '../../utils/Utility';
import {getUserByNameFunc} from './issueUser/actions';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
  const {issueUser, error} = state.issueUser;
  return {issueUser, error};
};

const mapDispatchToProps = dispatch => {
  return {
    getUserByName: getUserByNameFunc(dispatch),
  };
};

const UserDetailView = ({
  issueUser,
  error,
  getUserByName,
  route,
  navigation,
}) => {
  const [deviceLocation, setDeviceLocation] = useState({});
  useEffect(() => {
    const {userId} = route.params;
    getUserByName(userId);
    fetchUserLocation();
    return () => {
      AccessLocation.removeEventListener('getLocation', onLocationAvailable);
    };
  }, []);

  const fetchUserLocation = () => {
    AccessLocation.isLocationEnable(enable => {
      if (enable) {
        AccessLocation.addEventListener('getLocation', onLocationAvailable);
        AccessLocation.requestLocation();
      } else {
        Utility.openLocationSettingDialog();
      }
    });
  };

  const onLocationAvailable = location => {
    let loc = JSON.parse(location);
    setDeviceLocation(loc);
    AccessLocation.removeEventListener('getLocation', onLocationAvailable);
  };

  const userOnMap = location => {
    Utility.openMaps(location);
  };

  return (
    <View style={styles.container}>
      {issueUser && (
        <View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              {issueUser && issueUser.avatar_url && (
                <Image
                  style={styles.avatar}
                  source={{uri: issueUser.avatar_url}}
                />
              )}
              {issueUser && issueUser.name && (
                <Text style={styles.name}>{issueUser.name}</Text>
              )}
              {issueUser && issueUser.email && (
                <Text style={styles.userInfo}>{issueUser.email} </Text>
              )}
              {issueUser && issueUser.company && (
                <Text style={styles.userInfo}>{issueUser.company} </Text>
              )}
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.bio}>
                {issueUser && issueUser.bio && (
                  <Text style={styles.info}>{issueUser.bio}</Text>
                )}
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/blog-search-48.png')}
                  />
                </View>
                <View style={styles.infoContent}>
                  {issueUser && Utility.validatedString(issueUser.blog) && (
                    <Text style={styles.info}>
                      {Utility.validatedString(issueUser.blog)
                        ? issueUser.blog
                        : 'N/A'}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/twitter-48.png')}
                  />
                </View>
                <View style={styles.infoContent}>
                  {issueUser && issueUser.twitter_username && (
                    <Text style={styles.info}>
                      {issueUser.twitter_username
                        ? issueUser.twitter_username
                        : 'N/A'}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/navigate-48.png')}
                  />
                </View>
                {issueUser && issueUser.location && (
                  <View style={styles.infoContent}>
                    <TouchableOpacity
                      onPress={() => {
                        userOnMap(issueUser.location);
                      }}>
                      {issueUser && issueUser.location && (
                        <Text style={[styles.info, {color: 'blue'}]}>
                          {issueUser.location}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.bio}>
                {deviceLocation && (
                  <Text
                    style={
                      styles.info
                    }>{`Device Location\n\nAddress : ${deviceLocation.address} \nlatitude :${deviceLocation.latitude} \nlongitude :${deviceLocation.longitude}`}</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    paddingRight: 5,
    paddingLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
    alignItems: 'flex-start',
  },
  bio: {
    padding: 10,
  },
  error: {
    fontSize: 18,
    marginTop: 20,
    color: 'red',
    alignSelf: 'center',
  },
  scrollView: {
    marginHorizontal: 6,
    flexGrow: 1,
  },
});

const UserDetail = connect(mapStateToProps, mapDispatchToProps)(UserDetailView);
export {UserDetail};
