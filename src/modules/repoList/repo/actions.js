import {queryApi} from '../../../service/query-api';

const REPO_LIST = 'REPO_LIST';
const REPO_LIST_SUCCESS = 'REPO_LIST_SUCCESS';
const REPO_LIST_FAILURE = 'REPO_LIST_FAILURE';
const REPO_ADD_TO_BOOKMARK = 'REPO_ADD_TO_BOOKMARK';
const REPO_REMOVE_FROM_BOOKMARK = 'REPO_REMOVE_FROM_BOOKMARK';
const REPO_SORT_ASC = 'REPO_SORT_ASC';
const REPO_SORT_DSC = 'REPO_SORT_DSC';

export {
  REPO_LIST,
  REPO_LIST_SUCCESS,
  REPO_ADD_TO_BOOKMARK,
  REPO_REMOVE_FROM_BOOKMARK,
  REPO_LIST_FAILURE,
  REPO_SORT_ASC,
  REPO_SORT_DSC,
};

const getRepoByName = async (dispatch, param) => {
  dispatch({type: REPO_LIST});

  try {
    const response = await queryApi('search/repositories', 'GET', param);
    const res = await response;
    dispatch({type: REPO_LIST_SUCCESS, payload: res});
  } catch (e) {
    dispatch({type: REPO_LIST_FAILURE, payload: e});
  }
};

const addRepoBookmark = async (dispatch, param) => {
  let currentDate = new Date();
  let repo = {...param, bookmarkTime: currentDate};
  dispatch({type: REPO_ADD_TO_BOOKMARK, payload: repo});
};

const removeRepoBookmark = async (dispatch, param) => {
  let repo = {...param};
  dispatch({type: REPO_REMOVE_FROM_BOOKMARK, payload: repo});
};

const sortByAsc = async (dispatch, param) => {
  dispatch({type: REPO_SORT_ASC});
};

const sortByDesc = async (dispatch, param) => {
  dispatch({type: REPO_SORT_DSC});
};

export const getRepoByNameFunc = dispatch => {
  return name => getRepoByName(dispatch, name);
};

export const addRepoBookmarkFunc = dispatch => {
  return repo => addRepoBookmark(dispatch, repo);
};

export const removeRepoBookmarkFunc = dispatch => {
  return repo => removeRepoBookmark(dispatch, repo);
};

export const sortByAscFunc = dispatch => {
  return value => sortByAsc(dispatch, value);
};

export const sortByDescFunc = dispatch => {
  return value => sortByDesc(dispatch, value);
};
