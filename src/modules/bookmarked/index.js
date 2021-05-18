import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

import {formattedDateTime} from '../../helper/formattedDate';

import {bottomSheet} from '../../hoc/bottomSheet';

import {connect} from 'react-redux';

import {sortByAscFunc, sortByDescFunc} from '../repoList/repo/actions';

const mapStateToProps = (state, props) => {
  const {error, bookmarkItems} = state.repo;
  return {bookmarkItems, error};
};

const mapDispatchToProps = dispatch => {
  return {
    sortByAsc: sortByAscFunc(dispatch),
    sortByDesc: sortByDescFunc(dispatch),
  };
};
// var localItems = [];
const BookMarkedView = ({
  sortByAsc,
  sortByDesc,
  bookmarkItems,
  removeBookmark,
  error,
  navigation,
}) => {
  const [repoName, setRepoName] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    // if (repoName && repoName.length > 0) {
    //   localItems = bookmarkItems.filter(repo => {
    //     if (repo.name.toLowerCase().indexOf(repoName.toLowerCase()) >= 0) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    // } else {
    //   localItems = bookmarkItems;
    // }

    return () => {};
  }, [repoName, bookmarkItems]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={srotOptions} title="Sort " />,
    });
  }, [navigation]);

  const srotOptions = () => {
    setShowOptions(true);
  };

  const navigateToIssueList = repo => {
    let screenName = 'IssueList';
    navigation.navigate(screenName, {repo: repo});
  };

  const handleSearchRepo = () => {
    console.log(`handleSearchRepo `);
  };
  const handlebookmark = repo => {
    removeBookmark(repo);
  };
  const sortAsc = () => {
    sortByAsc();
  };

  const sortDesc = () => {
    console.log(`sortDesc`);
    sortByDesc();
  };
  const sortOptionUi = () => {
    return (
      <>
        <View style={styles.sortAction}>
          <TouchableOpacity
            onPress={() => {
              sortAsc();
            }}>
            <Text style={styles.sortTitle}>{`Sort Asc by Date`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sortAction}>
          <TouchableOpacity
            onPress={() => {
              sortDesc();
            }}>
            <Text style={styles.sortTitle}>{`Sort Desc by Date`}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
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

            <View style={styles.issueDetail}>
              <Text>{`Added on ${formattedDateTime(repo.bookmarkTime)}`}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bookmarkView}>
          <TouchableOpacity
            style={styles.repoBookmark}
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

      <FlatList
        style={styles.repoList}
        data={bookmarkItems}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderRepo(item)}></FlatList>

      {bottomSheet(sortOptionUi, showOptions, {
        close: function () {
          setShowOptions(false);
        },
      })}
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
  sortAction: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    flexDirection: 'column',
    margin: 6,
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
    // alignItems: 'center',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  sortTitle: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookmarkView: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  repoBookmark: {
    alignSelf: 'center',
  },
  bookmarkImage: {
    alignSelf: 'center',
    // backgroundColor: '#dfdfdf',
  },
  issueDetail: {
    color: '#333',
    marginTop: 10,
  },
  searchButton: {
    tintColor: 'gray',
    marginLeft: 10,
  },
});

const BookMarked = connect(mapStateToProps, mapDispatchToProps)(BookMarkedView);

export {BookMarked};
