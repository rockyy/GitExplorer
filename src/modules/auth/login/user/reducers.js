import {USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE} from './actions';

const initialState = {
  id: null,
  name: null,
  email: null,
  accessToken: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
      const {id, name, email, accessToken} = action.payload;
      return {
        id,
        name,
        email,
        accessToken,
      };
    }
    case USER_LOGIN_FAILURE: {
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
