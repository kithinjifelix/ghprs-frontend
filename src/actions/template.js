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

export const getById = (id, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}templates/${id}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.TEMPLATE_GET_BY_ID,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong fetching Template");
      }
    });
};

export const configure = (id, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}templates/configure/${id}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.TEMPLATE_CONFIGURE,
        payload: response.data,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      if (onError) {
        onError();
        toast.error("Something went wrong!");
      }
    });
};

export const updateStatus = (id, status, onSuccess, onError) => (dispatch) => {
  axios
    .put(`${url}templates/${id}/status/${status}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.TEMPLATE_UPDATE_STATUS,
        payload: response.data,
      });
      onSuccess && onSuccess();
      //toast.success("Updated Successfully!");
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

export const initialize = (data, onSuccess, onError) => (dispatch) => {
  var formData = new FormData();
  formData.append('file', data.file);
  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('version', data.version);
  formData.append('frequency', data.frequency);
  formData.append('status', data.status);
  axios
    .post(`${url}templates/initialize`, formData)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.TEMPLATE_INITIALIZE,
        payload: response.data,
      });
      onSuccess && onSuccess();
      //toast.success("Template initialized Successfully!");
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

export const updateDataType = (workSheetId, columns, onSuccess, onError) => (dispatch) => {
  axios
    .put(`${url}templates/workSheet/update/${workSheetId}`, columns)
    .then((response) => {
      onSuccess && onSuccess();
      //toast.success("Updated Successfully!");
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

export const createWorkSheetTables = (worksheets, onSuccess, onError) => (dispatch) => {
  axios
    .post(`${url}templates/tables`, worksheets)
    .then((response) => {
      onSuccess && onSuccess();
      //toast.success("Tables Created Successfully!");
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

export const updateDataTypeInput = (workSheetId, column) => (dispatch) => {
  const payload = { workSheetId: workSheetId, name: column.name, type: column.type }
  dispatch({
    type: ACTION_TYPES.TEMPLATE_WORKSHEET_UPDATE,
    payload: payload,
  });
};

export const exists = (template) => (dispatch) => {
  axios
    .get(`${url}templates/exists?template=${template}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.TEMPLATE_EXISTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_TYPES.TEMPLATE_ERROR,
        payload: "Something went wrong",
      });
      console.log(error);
    });
};

