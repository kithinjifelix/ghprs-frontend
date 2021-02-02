import * as ACTION_TYPES from "../actions/types";

const initialState = {
  list: [],
  registered: {},
  organization: {},
  error: {},
};

const organizationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ORGANIZATIONS:
      return { ...state, list: [...action.payload] };

    case ACTION_TYPES.GET_ORGANIZATION_BY_ID:
      return { ...state, organization: action.payload };

    case ACTION_TYPES.REGISTER_ORGANIZATION:
      return { ...state, registered: action.payload };

    default:
      return state;
  }
};

export default organizationsReducer;
