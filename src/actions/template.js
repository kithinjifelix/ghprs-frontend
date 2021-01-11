import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import * as ACTION_TYPES from "./types";

export const fetchAll = (onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}templates`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.TEMPLATE_GET_ALL,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching Templates");
      }
    });
};

export const initialize = (data, onSuccess, onError) => (dispatch) => {
  var formData =new FormData();
  formData.append('file', data.file);
  formData.append('name', data.name);
  formData.append('description', data.description);
    axios
      .post(`${url}templates/initialize`, formData)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.TEMPLATE_INITIALIZE,
          payload: response.data,
        });
        onSuccess && onSuccess();
        toast.success("User Registered Successfully!");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.TEMPLATE_ERROR,
          payload: "Something went wrong",
        });
        onError();
        console.log(error);
        toast.error("Something went wrong");
        
      });
  };

