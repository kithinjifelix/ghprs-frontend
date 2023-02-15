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

export const getByUser = (onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}uploads/user`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_GET_BY_USER,
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

export const getAllFileUploads = (status, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}uploads/GetAllFileUploads/${status}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_GET_BY_USER,
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

export const getByStatus = (status, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}uploads/status/${status}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_GET_BY_STATUS,
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

export const viewById = (id, onSuccess, onError) => (dispatch) => {
  axios
    .get(`${url}uploads/view/${id}`)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.UPLOAD_VIEW_BY_ID,
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

export const upload = (organizationId, data, onSuccess, onError) => (dispatch) => {
  let formData =new FormData();
  formData.append('file', data.file);
  formData.append('templateId', data.templateId);
  formData.append('currentUser', data.currentUser);
  formData.append('startDate', data.startDate);
  formData.append('endDate', data.endDate);
    axios
      .post(`${url}uploads/upload/${organizationId}`, formData)
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

export const uploadMERData = (data, onSuccess, onError) => async (dispatch) => {
  try {
    axios.get(`${url}uploads/MER_UPLOAD`)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.MER_FILES,
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
  } catch (e) {
    dispatch({
      type: ACTION_TYPES.UPLOAD_ERROR,
      payload: "Something went wrong",
    });
    onError();
  }
};

export const ProcessBlob = (name, uploadType, onSuccess, onError) => async (dispatch) => {
  let formData =new FormData();
  formData.append('name', name);
  axios({
    method: 'post',
    url: `${url}uploads/ProcessBlob/${uploadType.fileType}`,
    data: formData
  })
    .then((response) => {
      onSuccess && onSuccess();
      toast.success("Saved Successfully!");
    })
    .catch(error => {
      onError();
      console.log(error);
      toast.error("Something went wrong");
    });
  // axios.post(`${url}uploads/ProcessBlob/${uploadType.fileType}`, JSON.stringify({name: name}), customConfig)
  //   .then((response) => {
  //     onSuccess && onSuccess();
  //     toast.success("Saved Successfully!");
  //   })
  //   .catch((error) => {
  //     onError();
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   });
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

