import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import * as ACTION_TYPES from "./types";

export const fetchAll = (onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}organizations`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ORGANIZATIONS,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching organizations");
      }
    });
};

export const getById = (id, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}organizations/${id}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_ORGANIZATION_BY_ID,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching organization");
      }
    });
};

export const register = (data, onSuccess, onError) => (dispatch) => {
    axios
      .post(`${url}organizations`, data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.REGISTER_ORGANIZATION,
          payload: response.data,
        });
        onSuccess && onSuccess();
        toast.success("Organization Registered Successfully!");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.ORGANIZATIONS_ERROR,
          payload: "Something went wrong",
        });
        onError();
        if (
          error.response === undefined
        ) {
          toast.error("Something went wrong");
        } else {
          toast.error(error);
        }
      });
  };

