import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as Utility from '../../utils/Utility';
import {connect} from 'react-redux';
import {
  getRepoByNameFunc,
  addRepoBookmarkFunc,
  removeRepoBookmarkFunc,
} from './repo/actions';

const mapStateToProps = (state, props) => {
  const {items, bookmarkItems, error} = state.repo;
  return {items, bookmarkItems, error};
};

const mapDispatchToProps = dispatch => {
  return {
    getRepoByName: getRepoByNameFunc(dispatch),
    addRepoBookmark: addRepoBookmarkFunc(dispatch),
    removeRepoBookmark: removeRepoBookmarkFunc(dispatch),
  };
};

const Repos = ({
  items,
  bookmarkItems,
  error,
  getRepoByName,
  addRepoBookmark,
  bookmark,
  removeRepoBookmark,
  navigation,
}) => {
  const [repoName, setRepoName] = useState();

  useEffect(() => {
    return () => {};
  }, []);

  const navigateToIssueList = repo => {
    let screenName = 'IssueList';
    navigation.navigate(screenName, {repo: repo});
  };
  const handleSearchRepo = () => {
    if (Utility.validatedString(repoName)) {
      const param = {q: repoName};
      getRepoByName(param);
    }
  };
  const handlebookmark = repo => {
    if (ifExists(repo)) {
      removeFromBookmarkList(repo);
    } else {
      addToBookmarkList(repo);
    }
  };
  const ifExists = repo => {
    if (
      bookmarkItems &&
      bookmarkItems.filter(item => item.id === repo.id).length > 0
    ) {
      return true;
    }
    return false;
  };

  const addToBookmarkList = repo => {
    addRepoBookmark(repo);
  };

  const removeFromBookmarkList = repo => {
    removeRepoBookmark(repo);
  };

  const renderRepo = repo => {
    return (
      <View style={styles.repo}>
        <View style={styles.repoDetail}>
          <TouchableOpacity
            onPress={() => {
              navigateToIssueList(repo);
            }}>
            <Text style={styles.repoTitle}>{repo.name}</Text>
            <Text style={styles.repoDescription} numberOfLines={2}>
              {repo.description}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.bookmarkView,
            {backgroundColor: ifExists(repo) ? 'red' : '#2D3038'},
          ]}>
          <TouchableOpacity
            onPress={() => {
              handlebookmark(repo);
            }}>
            <Image
              style={styles.bookmarkImage}
              source={require('../../assets/bookmark-24.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Search by repo name"
            value={repoName}
            onChangeText={text => setRepoName(text)}
            returnKeyType="send"
            onSubmitEditing={handleSearchRepo}
            placeholderTextColor={'#232325'}
            backgroundColor={'gray'}
            color={'#232325'}
            flex={1}
            height={50}
          />
          <View>
            <TouchableOpacity onPress={handleSearchRepo}>
              <Image
                source={require('../../assets/search.png')}
                style={styles.searchButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!(items && items.length > 0) && (
        <Text style={styles.error}>{'Repo Not Found'}</Text>
      )}
      <FlatList
        style={styles.repoList}
        data={items}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderRepo(item)}></FlatList>
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

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
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
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  repoBookmark: {
    alignSelf: 'center',
  },
  bookmarkImage: {
    alignSelf: 'center',
  },
  searchButton: {
    tintColor: 'gray',
    marginLeft: 10,
  },
  error: {
    fontSize: 18,
    marginTop: 20,
    color: 'red',
    alignSelf: 'center',
  },
});

const RepoList = connect(mapStateToProps, mapDispatchToProps)(Repos);

export {RepoList};
