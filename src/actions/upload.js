import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";
import * as ACTION_TYPES from "./types";

export const fetchAll = (onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}uploads`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_GET_ALL,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching Uploads");
      }
    });
};

export const getById = (id, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}uploads/${id}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_GET_BY_ID,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching Upload");
      }
    });
};

export const upload = (data, onSuccess, onError) => (dispatch) => {
  var formData =new FormData();
  formData.append('file', data.file);
  formData.append('templateId', data.templateId);
  formData.append('currentUser', data.currentUser);
    axios
      .post(`${url}uploads/upload`, formData)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.UPLOAD_UPLOAD,
          payload: response.data,
        });
        onSuccess && onSuccess();
        toast.success("File Uploaded Successfully!");
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.UPLOAD_ERROR,
          payload: "Something went wrong",
        });
        onError();
        console.log(error);
        toast.error("Something went wrong");
        
      });
  };

  export const review = (id, data, onSuccess, onError) => (dispatch) => {
      axios
        .put(`${url}uploads/review/${id}`, data)
        .then((response) => {
          dispatch({
            type: ACTION_TYPES.UPLOAD_REVIEW,
            payload: response.data,
          });
          onSuccess && onSuccess();
          toast.success("Saved Successfully!");
        })
        .catch((error) => {
          dispatch({
            type: ACTION_TYPES.UPLOAD_ERROR,
            payload: "Something went wrong",
          });
          onError();
          console.log(error);
          toast.error("Something went wrong");
          
        });
    };

