import {
  REPO_ISSUE_LIST,
  REPO_ISSUE_LIST_SUCCESS,
  REPO_ISSUE_LIST_FAILURE,
} from './actions';

const initialState = {
  issues: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REPO_ISSUE_LIST_SUCCESS: {
      const {data} = action.payload;
      return {
        issues: data,
      };
    }
    case REPO_ISSUE_LIST_FAILURE: {
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
