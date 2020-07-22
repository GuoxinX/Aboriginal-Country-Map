import axios from "axios";

export const GET_DET_AREAS = "get_det_areas";
export const GET_PLOTS = "get_plots";
export const LOGIN = "login";
export const REGISTER = "register";
export const GET_HISTORY = "get_history";
export const ADD_HISTORY = "add_history";
export const DELETE_HISTORY = "delete_history";
export const ADD_BOOKMARK = "add_bookmark";
export const GET_BOOKMARK = "get_bookmark";
export const DELETE_BOOKMARK = "delete_bookmark";

const ROOT_URL = "http://localhost:5000/api";

export function getDetAreas(values, callback) {
  const request = axios.get(`${ROOT_URL}/mapData/getAboriginalCountries`);

  return {
    type: GET_DET_AREAS,
    payload: request
  };
}

export function getPlots(values, callback) {
  const request = axios.get(`${ROOT_URL}/mapData/getPlots`);

  return {
    type: GET_PLOTS,
    payload: request
  };
}

export const login = (values, callback, failCallback) => async dispatch => {
  const body = {
    username: values.username,
    password: values.password,
    portal: "normal"
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/login`, body)
    .then(response =>
      callback({ token: response.data.token, id: response.data.id })
    )
    .catch(() => failCallback());

  dispatch({
    type: LOGIN,
    payload: request
  });
};

export const register = (values, callback, failCallback) => async dispatch => {
  const body = {
    username: values.username,
    accountType: "normal",
    password: values.password
  };

  console.log(body);
  const request = await axios
    .post(`${ROOT_URL}/userData/addUser`, body)
    .then(() => callback())
    .catch(() => failCallback());

  dispatch({
    type: REGISTER,
    payload: request
  });
};

export const addHistory = (
  values,
  callback,
  failCallback
) => async dispatch => {
  const body = {
    id: values.id,
    plotID: values.plotID
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/addHistory`, body, {
      headers: {
        authorization: values.token
      }
    })
    .then(() => callback())
    .catch(() => failCallback());

  dispatch({
    type: ADD_HISTORY,
    payload: request
  });
};

export const deleteHistory = (
  values,
  callback,
  failCallback
) => async dispatch => {
  const body = {
    id: values.id,
    plotID: values.plotID
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/deleteHistory`, body, {
      headers: {
        authorization: values.token
      }
    })
    .then(() => callback())
    .catch(() => failCallback());

  dispatch({
    type: DELETE_HISTORY,
    payload: request
  });
};

export const getHistory = (
  values,
  callback,
  failCallback
) => async dispatch => {
  const body = {
    id: values.id,
    plotID: values.plotID
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/getUserHistory`, body, {
      headers: {
        authorization: values.token
      }
    })
    .then(response => {
      callback({ data: response.data });
    })
    .catch(() => failCallback());

  dispatch({
    type: GET_HISTORY,
    payload: request
  });
};

export const addBookmark = (
  values,
  callback,
  failCallback
) => async dispatch => {
  const body = {
    id: values.id,
    plotID: values.plotID
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/addBookmark`, body, {
      headers: {
        authorization: values.token
      }
    })
    .then(() => callback())
    .catch(() => failCallback());

  dispatch({
    type: ADD_BOOKMARK,
    payload: request
  });
};

export const deleteBookmark = (
  values,
  callback,
  failCallback
) => async dispatch => {
  const body = {
    id: values.id,
    plotID: values.plotID
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/deleteBookmark`, body, {
      headers: {
        authorization: values.token
      }
    })
    .then(() => callback())
    .catch(() => failCallback());

  dispatch({
    type: DELETE_BOOKMARK,
    payload: request
  });
};

export const getBookmarks = (
  values,
  callback,
  failCallback
) => async dispatch => {
  const body = {
    id: values.id,
    plotID: values.plotID
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/getUserBookmarks`, body, {
      headers: {
        authorization: values.token
      }
    })
    .then(response => {
      callback({ data: response.data });
      console.log(response.data);
    })
    .catch(() => failCallback());

  dispatch({
    type: GET_BOOKMARK,
    payload: request
  });
};
