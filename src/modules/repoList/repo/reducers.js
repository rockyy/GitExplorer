import {
  REPO_LIST,
  REPO_LIST_SUCCESS,
  REPO_LIST_FAILURE,
  REPO_ADD_TO_BOOKMARK,
  REPO_REMOVE_FROM_BOOKMARK,
  REPO_SORT_ASC,
  REPO_SORT_DSC,
} from './actions';

const initialState = {
  items: null,
  bookmarkItems: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REPO_LIST: {
      return {
        ...state,
      };
    }
    case REPO_LIST_SUCCESS: {
      const {data} = action.payload;
      return {
        ...state,
        items: data.items,
      };
    }
    case REPO_LIST_FAILURE: {
      return {
        ...state,
      };
    }
    case REPO_ADD_TO_BOOKMARK: {
      const bookmarked = state.bookmarkItems ? state.bookmarkItems : [];
      const newBookmarkedItems = [...bookmarked, action.payload];
      return {...state, bookmarkItems: newBookmarkedItems};
    }

    case REPO_REMOVE_FROM_BOOKMARK: {
      const notMarked = state.bookmarkItems.filter(
        repo => repo.id !== action.payload.id,
      );
      return {
        ...state,
        bookmarkItems: notMarked,
      };
    }
    case REPO_SORT_ASC: {
      let sortAsc = state.bookmarkItems.sort(function (a, b) {
        return new Date(b.bookmarkTime) - new Date(a.bookmarkTime);
      });
      return {
        ...state,
        bookmarkItems: sortAsc,
      };
    }
    case REPO_SORT_DSC: {
      let sortDesc = state.bookmarkItems.sort(function (a, b) {
        return new Date(a.bookmarkTime) - new Date(b.bookmarkTime);
      });
      return {
        ...state,
        bookmarkItems: sortDesc,
      };
    }
    default:
      return state;
  }
};

export {reducer};
