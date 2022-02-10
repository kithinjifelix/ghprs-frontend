import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import jwt_decode from 'jwt-decode';
import * as ACTION_TYPES from "./types";
import { RESET_PASSWORD_ERROR } from './types';

export const fetchAll = (onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}users`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_USERS,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching users");
      }
    });
};

export const getById = (id, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}users/${id}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_USER_BY_ID,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching user");
      }
    });
};

export const register = (data, onSuccess, onError) => (dispatch) => {
    axios
      .post(`${url}authentication/register`, data)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.REGISTER,
          payload: response.data,
        });
        onSuccess && onSuccess();
        //toast.success("User Registered Successfully!");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.USERS_ERROR,
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

export const resetPassword = (id, data, onSuccess, onError) => (dispatch) => {
  axios
    .post(`${url}authentication/resetpassword/${id}`, data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.RESET_PASSWORD,
        payload: response.data,
      });
      onSuccess && onSuccess();
    })
    .catch((error) => {
      dispatch({
        type: ACTION_TYPES.RESET_PASSWORD_ERROR,
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

  export const edit = (id, data, onSuccess, onError) => (dispatch) => {
      axios
        .put(`${url}users/`+id, data)
        .then((response) => {
          dispatch({
            type: ACTION_TYPES.EDIT_USER,
            payload: response.data,
          });
          onSuccess && onSuccess();
          //toast.success("User Registered Successfully!");
        })
        .catch((error) => {
          dispatch({
            type: ACTION_TYPES.USERS_ERROR,
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

    export const getCurrentUserDetails = (onSuccess, onError) => (dispatch) => {
      axios
        .get(`${url}users/userid`)
        .then((response) => {
          dispatch({
            type: ACTION_TYPES.GET_CURRENT_USER,
            payload: response.data,
          });
          if (onSuccess) {
            onSuccess();
          }
        })
        .catch((error) => {
          if (onError) {
            onError();
          }
        });
    };

    export const loggedIn = () => (dispatch) => {
      const tokenObject = JSON.parse(localStorage.getItem('currentUser'));
      if (tokenObject) {
        const currentUser = jwt_decode(tokenObject.token);
        axios
          .get(`${url}`)
          .then((response) => {
            dispatch({
              type: ACTION_TYPES.LOGIN,
              payload: currentUser,
            });
            dispatch(getCurrentUserDetails());
          })
          .catch((error) => {
            dispatch({
              type: ACTION_TYPES.LOGOUT,
            });
          });
      }
    };

