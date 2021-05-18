const REPO_ISSUE_LIST = 'REPO_ISSUE_LIST';
const REPO_ISSUE_LIST_SUCCESS = 'REPO_ISSUE_LIST_SUCCESS';
const REPO_ISSUE_LIST_FAILURE = 'REPO_ISSUE_LIST_FAILURE';

export {REPO_ISSUE_LIST, REPO_ISSUE_LIST_SUCCESS, REPO_ISSUE_LIST_FAILURE};

import {queryApi} from '../../../service/query-api';

const getIssueByrepo = async (dispatch, param) => {
  dispatch({type: REPO_ISSUE_LIST});

  try {
    const endPoint = `repos/${param}/issues`;
    const response = queryApi(endPoint, 'GET', {per_page: '5'});
    const res = await response;
    dispatch({type: REPO_ISSUE_LIST_SUCCESS, payload: res});
  } catch (e) {
    dispatch({type: REPO_ISSUE_LIST_FAILURE, payload: e});
  }
};

export const getIssueByRepoFunc = dispatch => {
  return repo => getIssueByrepo(dispatch, repo);
};
