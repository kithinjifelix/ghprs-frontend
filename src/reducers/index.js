import { combineReducers } from 'redux'
import userReducer from './userReducer'
import lookupReducer from './lookupReducer'
import templateReducer from './templateReducer'
import uploadReducer from './uploadReducer'
import linkReducer from './linkReducer'
import organizationsReducer from './organizationsReducer'

export default combineReducers({
  users: userReducer,
  lookups: lookupReducer,
  templates: templateReducer,
  uploads: uploadReducer,
  links: linkReducer,
  organizations: organizationsReducer,
  })