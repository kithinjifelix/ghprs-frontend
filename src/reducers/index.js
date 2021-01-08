import { combineReducers } from 'redux'
import dashBoardReducer from './dashboardReducer'

export default combineReducers({
  dashboards: dashBoardReducer,
  })