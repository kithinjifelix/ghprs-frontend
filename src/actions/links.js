import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import * as ACTION_TYPES from "./types";

export const fetchAll = (onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}links`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.LINK_GET_ALL,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching links");
      }
    });
};

export const links = (type, actionType, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}links/${type}`)
    .then((response) => {
      dispatch({
        type: actionType,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        console.log(error);
      }
    });
};
