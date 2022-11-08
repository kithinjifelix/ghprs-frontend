import axios from 'axios';
import { url } from '../api';
import * as ACTION_TYPES from './types';

export const fetchDashboardData = (onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}Dashboard`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.DASHBOARD_DATA,
        payload: response.data,
      });
      onSuccess();
    })
    .catch((error) => {
      onError();
    });
};
