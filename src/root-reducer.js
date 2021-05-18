import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import {reducer as userReducer} from '../src/modules/auth/login/user/reducers';
import {reducer as repoReducer} from '../src/modules/repoList/repo/reducers';
import {reducer as issueReducer} from '../src/modules/issues/issue/reducers';
import {reducer as repoIssueReducer} from '../src/modules/userDetail/issueUser/reducers';
import {USER_LOGOUT} from './modules/auth/login/user/actions';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  user: userReducer,
  repo: repoReducer,
  issues: issueReducer,
  issueUser: repoIssueReducer,
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  console.log(`rootReducer : ${action}`);
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export {persistedReducer};

/////////////
// to combine all reducers together
// const appReducer = combineReducers({
//   counter,
//   head,
//   user
// });

// reset the state of a redux store
// const rootReducer = (state, action) => {
//   if (action.type === RESET_STORE) {
//     state = undefined;
//   }
//   return appReducer(state, action)
// }

// export default rootReducer;
