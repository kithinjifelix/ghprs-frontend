import * as ACTION_TYPES from "../actions/types";

const initialState = {
  genders: [],
  maritalStatuses: [],
  dataTypes: [],
  error: {},
};

const lookupReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACTION_TYPES.LOOKUP_GENDER:
      return { ...state, genders: [...action.payload] };

    case ACTION_TYPES.LOOKUP_MARITAL_STATUS:
      return { ...state, maritalStatuses: [...action.payload] };

    case ACTION_TYPES.LOOKUP_DATA_TYPE:
      return { ...state, dataTypes: [...action.payload] };

    case ACTION_TYPES.LOOKUP_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default lookupReducer;
