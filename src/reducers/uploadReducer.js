import * as ACTION_TYPES from "../actions/types";

const initialState = {
    list: [],
    upload: {},
    view: [],
    error: {},
    merfiles: [],
};

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTION_TYPES.UPLOAD_GET_ALL:
            return { ...state, list: [...action.payload] };

        case ACTION_TYPES.UPLOAD_UPLOAD:
            return { ...state, upload: action.payload };

        case ACTION_TYPES.UPLOAD_GET_BY_ID:
            return { ...state, upload: action.payload };

        case ACTION_TYPES.UPLOAD_VIEW_BY_ID:
            return { ...state, view: action.payload };

        case ACTION_TYPES.UPLOAD_GET_BY_USER:
            return { ...state, list: [...action.payload] };

        case ACTION_TYPES.UPLOAD_GET_BY_STATUS:
            return { ...state, list: [...action.payload] };

        case ACTION_TYPES.UPLOAD_ERROR:
            return { ...state, error: action.payload };

        case ACTION_TYPES.DASHBOARD_DATA:
            return { ...state, dashboard: action.payload };
        case ACTION_TYPES.UPLOAD_PROGRESS:
            return { ...state, uploadProgress: action.payload };
        case ACTION_TYPES.MER_FILES:
            return { ...state, merfiles: action.payload };

        default:
            return state;
    }
};

export default uploadReducer;
