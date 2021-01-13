import * as ACTION_TYPES from "../actions/types";

const initialState = {
  list: [],
  external: [],
  dashboards: [],
  reports: [],
  tables: [],
  error: {},
};

const linkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LINK_GET_ALL:
      return { ...state, list: [...action.payload] };

    case ACTION_TYPES.LINK_DASHBOARDS:
      return { ...state, dashboards: [...action.payload] };

    case ACTION_TYPES.LINK_EXTERNAL:
      return { ...state, external: [...action.payload] };

    case ACTION_TYPES.LINK_REPORTS:
      return { ...state, reports: [...action.payload] };

    case ACTION_TYPES.LINK_TABLES:
      return { ...state, tables: [...action.payload] };

    case ACTION_TYPES.LINK_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default linkReducer;
