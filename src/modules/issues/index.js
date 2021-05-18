import React, {Component, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {formattedDate} from '../../helper/formattedDate';

import {connect} from 'react-redux';

import {getIssueByRepoFunc} from './issue/actions';

const mapStateToProps = (state, props) => {
  const {issues, error} = state.issues;
  console.log(`IssueListView mapStateToProps : ${JSON.stringify(state)}`);
  return {issues, error};
};

const mapDispatchToProps = dispatch => {
  return {
    getIssueByrepo: getIssueByRepoFunc(dispatch),
  };
};

const IssueListView = ({issues, error, getIssueByrepo, route, navigation}) => {
  useEffect(() => {
    const {repo} = route.params;
    getIssueByrepo(repo.full_name);

    return () => {};
  }, []);

  const userDetail = issue => {
    let screenName = 'UserDetail';
    navigation.push(screenName, {userId: issue.user.login});
  };

  const renderIssue = issue => {
    return (
      <View style={styles.repo}>
        <View style={styles.repoDetail}>
          <Text style={styles.repoTitle}>{!!issue && issue.title}</Text>
          <Text style={styles.repoDescription}>{!!issue && issue.body}</Text>

          <View style={styles.issueDetail}>
            <Text>{`#${issue.number} opened on ${formattedDate(
              issue.created_at,
            )}`}</Text>
          </View>

          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => {
                userDetail(issue);
              }}>
              <Text style={styles.issuer}>{`by ${issue.user.login}`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.repoList}
        data={issues}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderIssue(item)}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f5',
    flex: 1,
  },

  header: {alignItems: 'center', backgroundColor: '#121214', padding: 10},

  headerImage: {
    resizeMode: 'contain',
    width: '165',
  },

  search: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    position: 'relative',
  },

  repoList: {
    paddingBottom: 10,
  },

  forgotPassword: {},
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: 'red',
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },

  repo: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    margin: 10,
    padding: 8,
  },
  repoTitle: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    // textAlign: 'center'
  },
  repoDescription: {
    color: '#999',
    fontSize: 13,
    lineHeight: 17,
  },
  repoDetail: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  bookmarkView: {
    justifyContent: 'center',
    width: 30,
  },
  repoBookmark: {
    borderRadius: 20,
    backgroundColor: '#dfdfdf',
    padding: 5,
    width: 25,
  },
  issueDetail: {
    color: '#333',
  },
  issuer: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize: 14,
  },
});

const IssueList = connect(mapStateToProps, mapDispatchToProps)(IssueListView);

export {IssueList};
