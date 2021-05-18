const REPO_ISSUE_USER = 'REPO_ISSUE_USER';
const REPO_ISSUE_USER_SUCCESS = 'REPO_ISSUE_USER_SUCCESS';
const REPO_ISSUE_USER_FAILURE = 'REPO_ISSUE_USER_FAILURE';

export {REPO_ISSUE_USER, REPO_ISSUE_USER_SUCCESS, REPO_ISSUE_USER_FAILURE};

import {queryApi} from '../../../service/query-api';

const getUserByName = async (dispatch, param) => {
  dispatch({type: REPO_ISSUE_USER});

  try {
    let endpoint = `users/${param}`;

    const response = await queryApi(endpoint, 'GET');

    const res = await response;
    dispatch({type: REPO_ISSUE_USER_SUCCESS, payload: res});
  } catch (e) {
    dispatch({type: REPO_ISSUE_USER_FAILURE, payload: e});
  }
};

export const getUserByNameFunc = dispatch => {
  return name => getUserByName(dispatch, name);
};
