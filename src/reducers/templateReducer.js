import * as ACTION_TYPES from "../actions/types";

const initialState = {
    list: [],
    template: {},
    workSheets: [],
    exists: {},
    error: {},
};

const templateReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTION_TYPES.TEMPLATE_GET_ALL:
            return { ...state, list: [...action.payload] };

        case ACTION_TYPES.TEMPLATE_INITIALIZE:
            return { ...state, workSheets: action.payload };

        case ACTION_TYPES.TEMPLATE_CONFIGURE:
            return { ...state, workSheets: action.payload };

        case ACTION_TYPES.TEMPLATE_WORKSHEET_UPDATE:
            return state;

        case ACTION_TYPES.TEMPLATE_GET_BY_ID:
            return { ...state, worksheets: action.payload };

        case ACTION_TYPES.TEMPLATE_UPDATE_STATUS:
            return { ...state, template: action.payload };

        case ACTION_TYPES.TEMPLATE_EXISTS:
            return { ...state, exists: action.payload };

        case ACTION_TYPES.TEMPLATE_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default templateReducer;
