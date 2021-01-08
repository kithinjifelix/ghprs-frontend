import * as ACTION_TYPES from "../actions/types";

const initialState = {
  list: [],
  dashBoard: {},
  error: {},
};

const dashBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.DASHBOARD:
      return { ...state, list: [...action.payload] };

    default:
      return state;
  }
};

export default dashBoardReducer;
