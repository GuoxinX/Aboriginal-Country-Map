import axios from "axios";
import thunk from "redux-thunk";

export const ADD_ABORIGINAL_COUNTRY = "add_aboriginal_country";
export const ADD_PLOT = "add_plot";
export const GET_PLOTS = "get_plots";
export const GET_ABORIGINAL_COUNTRIES = "get_aboriginal_countries";
export const EDIT_ABORIGINAL_COUNTRY = "edit_aboriginal_country";
export const EDIT_PLOT = "edit_plot";
export const LOAD_PLOT = "load_plot";
export const SELECT_ABORIGINAL_COUNTRY = "select_aboriginal_country";
export const SELECT_PLOT = "select_plot";
export const LOAD_ABORIGINAL_COUNTRY = "load_aboriginal_country";
export const DELETE_ABORIGINAL_COUNTRY = "delete_aboriginal_country";
export const DELETE_PLOT = "delete_plot";
export const LOGIN = "login";
export const REGISTER = "register";

const ROOT_URL = "http://localhost:5000/api";

export function addAboriginalCountry(
  values,
  token,
  id,
  callback,
  failCallback
) {
  axios.defaults.headers.common["Authorization"] = token;

  var body = {
    id: id
  };

  body["aboriginalCountryName"] = values.aboriginalCountryName;
  // body.aboriginalCountry["geometry"] = JSON.parse(values.geometry);
  body["geometry"] = values.geometry;

  const request = axios
    .post(`${ROOT_URL}/mapGovData/addAboriginalCountry`, body)
    .then(() => callback())
    .catch(response => failCallback(response));

  return {
    type: ADD_ABORIGINAL_COUNTRY,
    payload: request
  };
}

export function addPlot(values, token, id, callback, failCallback) {
  axios.defaults.headers.common["Authorization"] = token;

  var body = {
    properties: {},
    id: id
  };
  body["geometry"] = values.geometry;
  body.properties["plotID"] = values.plotID;
  body.properties["nativeTitle"] = values.nativeTitle;
  body.properties["owner"] = values.owner;
  body.properties["aboriginalPlaceName"] = values.aboriginalPlaceName;
  body.properties["hearingYear"] = values.hearingYear;
  body.properties["address"] = values.address;

  const request = axios
    .post(`${ROOT_URL}/mapGovData/addPlot`, body)
    .then(() => callback())
    .catch(response => failCallback(response));

  return {
    type: ADD_PLOT,
    payload: request
  };
}

export function getAboriginalCountries(values, callback) {
  const request = axios.get(`${ROOT_URL}/mapData/getAboriginalCountries`);

  return {
    type: GET_ABORIGINAL_COUNTRIES,
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

export function editAboriginalCountry(
  values,
  token,
  id,
  callback,
  failCallback
) {
  axios.defaults.headers.common["Authorization"] = token;

  const body = {
    id: values._id,
    aboriginalCountryName: values.aboriginalCountryName,
    geometry: values.geometry,
    userID: id
  };

  const request = axios
    .post(`${ROOT_URL}/mapGovData/editAboriginalCountry`, body)
    .then(() => callback())
    .catch(response => failCallback(response));

  return {
    type: EDIT_ABORIGINAL_COUNTRY,
    payload: request
  };
}

export function editPlot(values, token, id, callback, failCallback) {
  axios.defaults.headers.common["Authorization"] = token;

  var body = {
    properties: {},
    id: id
  };
  body["geometry"] = values.geometry;
  body["oldPlotID"] = values.oldPlotID;
  body["newPlotID"] = values.plotID;
  body.properties["plotID"] = values.plotID;
  body.properties["nativeTitle"] = values.nativeTitle;
  body.properties["owner"] = values.owner;
  body.properties["aboriginalPlaceName"] = values.aboriginalPlaceName;
  body.properties["hearingYear"] = values.hearingYear;
  body.properties["address"] = values.address;

  const request = axios
    .post(`${ROOT_URL}/mapGovData/editPlot`, body)
    .then(() => callback())
    .catch(response => failCallback(response));

  return {
    type: EDIT_PLOT,
    payload: request
  };
}

export const loadAboriginalCountry = id => async dispatch => {
  const request = await axios.get(`${ROOT_URL}/mapData/getAboriginalCountries`);

  dispatch({
    type: LOAD_ABORIGINAL_COUNTRY,
    payload: request,
    id: id
  });
};

export const loadPlot = id => async dispatch => {
  const body = {
    plotID: id
  };

  const request = await axios.post(
    `${ROOT_URL}/mapData/getPlotInformation`,
    body
  );

  dispatch({
    type: LOAD_PLOT,
    payload: request
  });
};

export const deleteAboriginalCountry = (
  id,
  token,
  userID,
  callback,
  failCallback
) => async dispatch => {
  axios.defaults.headers.common["Authorization"] = token;

  const body = {
    id: id,
    userID: userID
  };

  const request = await axios
    .post(`${ROOT_URL}/mapGovData/deleteAboriginalCountry`, body)
    .then(response => callback(response))
    .catch(response => failCallback(response));

  dispatch({
    type: DELETE_ABORIGINAL_COUNTRY,
    payload: request,
    id: id
  });
};

export const deletePlot = (
  id,
  token,
  userID,
  callback,
  failCallback
) => async dispatch => {
  axios.defaults.headers.common["Authorization"] = token;

  const body = {
    plotID: id,
    id: userID
  };

  const request = await axios
    .post(`${ROOT_URL}/mapGovData/deletePlot`, body)
    .then(() => callback())
    .catch(response => failCallback(response));

  dispatch({
    type: DELETE_PLOT,
    payload: request,
    id: id
  });
};

export const login = (values, callback, failCallback) => async dispatch => {
  const body = {
    username: values.username,
    password: values.password,
    portal: "government"
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
    accountType: "government",
    password: values.password
  };

  const request = await axios
    .post(`${ROOT_URL}/userData/addUser`, body)
    .then(() => callback())
    .catch(() => failCallback());

  dispatch({
    type: REGISTER,
    payload: request
  });
};
