import {
  REPO_ISSUE_USER,
  REPO_ISSUE_USER_SUCCESS,
  REPO_ISSUE_USER_FAILURE,
} from './actions';

const initialState = {
  issueUser: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REPO_ISSUE_USER_SUCCESS: {
      const {data} = action.payload;
      return {
        issueUser: data,
      };
    }
    case REPO_ISSUE_USER_FAILURE: {
      const {error} = action.payload;
      return {
        error,
      };
    }
    default:
      return state;
  }
};

export {reducer};
