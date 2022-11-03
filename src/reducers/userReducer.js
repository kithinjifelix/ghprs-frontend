import * as ACTION_TYPES from "../actions/types";

const initialState = {
  authenticated: false,
  userTokenDetails: {},
  currentUser: {},
  list: [],
  registered: {},
  user: {},
  error: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_USERS:
      return { ...state, list: [...action.payload] };

    case ACTION_TYPES.GET_USER_BY_ID:
      return { ...state, user: action.payload };

    case ACTION_TYPES.REGISTER:
      return { ...state, registered: action.payload };

    case ACTION_TYPES.EDIT_USER:
      return { ...state, user: action.payload };

    case ACTION_TYPES.GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };

    case ACTION_TYPES.LOGIN:
      return { ...state, userTokenDetails: action.payload, authenticated: true };

    case ACTION_TYPES.LOGOUT:
      return { ...state, userTokenDetails: {}, authenticated: false };

    case ACTION_TYPES.RESET_PASSWORD_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export default userReducer;
