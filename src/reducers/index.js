import { combineReducers } from 'redux'
import userReducer from './userReducer'
import lookupReducer from './lookupReducer'

export default combineReducers({
  users: userReducer,
  lookups: lookupReducer,
  })