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

export const getById = (id, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}links/${id}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.LINK_GET_BY_ID,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching link");
      }
    });
};

export const add = (data, onSuccess, onError) => (dispatch) => {
  axios
    .post(`${url}links`, data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.LINK_ADD,
        payload: response.data,
      });
      onSuccess && onSuccess();
      //toast.success("Link Added Successfully!");
    })
    .catch((error) => {
      dispatch({
        type: ACTION_TYPES.LINK_ERROR,
        payload: "Something went wrong",
      });
      onError();
      if (
        error.response === undefined
      ) {
        toast.error("Something went wrong");
      } else {
        toast.error(error);
        //toast.error(error.response.data.apierror.message);
      }
    });
};

export const remove = (id, onSuccess, onError) => (dispatch) => {
  axios
    .delete(`${url}links/${id}`)
    .then((response) => {
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching link");
      }
    });
};
