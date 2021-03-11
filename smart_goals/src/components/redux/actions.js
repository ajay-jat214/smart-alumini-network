import {
  CHANGE_ALUMINI_SEARCH,
  CHANGE_CHAT_SEARCH,
  CHANGE_FILTERED_SEARCH,
  CHANGE_ROUTE,
  CHANGE_CLICK,
  EMAIL_SIGNIN_CREDENTIALS,
  USERNAME_SIGNIN_CREDENTIALS,
  MESSAGE_OBJECT,
  MESSAGE_LIST,
  EVENTS_LOAD_CONST,
} from "./constants.js";

export const setAluminiSearch = (text) => {
  console.log("action", text);

  return {
    type: CHANGE_ALUMINI_SEARCH,
    payload: text,
  };
};

export const setChatSearch = (text) => {
  return {
    type: CHANGE_CHAT_SEARCH,
    payload: text,
  };
};

export const setClick = (text) => {
  return {
    type: CHANGE_CLICK,
    payload: text,
  };
};

export const setFilteredSearch = (text) => {
  return {
    type: CHANGE_FILTERED_SEARCH,
    payload: text,
  };
};

export const setRoute = (text) => {
  return {
    type: CHANGE_ROUTE,
    payload: text,
  };
};

export const setEmailCredentials = (text) => {
  return {
    type: EMAIL_SIGNIN_CREDENTIALS,
    payload: text,
  };
};

export const setUserNameCredentials = (text) => {
  return {
    type: USERNAME_SIGNIN_CREDENTIALS,
    payload: text,
  };
};

export const messageSearch = (text) => {
  return {
    type: MESSAGE_OBJECT,
    payload: text,
  };
};

export const messageList = (text) => {
  return {
    type: MESSAGE_OBJECT,
    payload: text,
  };
};

export const calendarEvents = (text) => {
  return {
    type: EVENTS_LOAD_CONST,
    payload: text,
  };
};
