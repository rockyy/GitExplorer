import {queryApi} from '../../../../service/query-api';

const USER_LOGIN = 'USER_LOGIN';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
const USER_LOGOUT = 'USER_LOGOUT';

export {USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT};
import {USERS} from '../../../../values/Users';

const getUserLogin = async (dispatch, param) => {
  dispatch({type: USER_LOGIN});

  try {
    const {email, password} = param;

    const filteredUser = USERS.filter(function (user) {
      if (
        user.email.toLowerCase() == email.toLowerCase() &&
        user.password == password
      )
        return true;
      else return false;
    });

    if (filteredUser && filteredUser.length > 0) {
      const logedInUser = filteredUser[0];

      dispatch({type: USER_LOGIN_SUCCESS, payload: logedInUser});
    } else {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: 'User email id or password not valid',
      });
    }
  } catch (e) {
    dispatch({type: USER_LOGIN_FAILURE, payload: e});
  }
};

export const getUserLoginFunc = dispatch => {
  return login => getUserLogin(dispatch, login);
};

const getUserLogout = async dispatch => {
  dispatch({type: USER_LOGOUT, payload: null});
};
export const getUserLogoutFunc = dispatch => {
  return () => getUserLogout(dispatch);
};
