import { combineReducers } from 'redux'
import userReducer from './userReducer'
import lookupReducer from './lookupReducer'
import templateReducer from './templateReducer'
import uploadReducer from './uploadReducer'

export default combineReducers({
  users: userReducer,
  lookups: lookupReducer,
  templates: templateReducer,
  uploads: uploadReducer,
  })