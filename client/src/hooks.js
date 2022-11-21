import React from "react";
import { AppContext } from "./providers/AppProvider";
import {
  getRequest,
  sendRequest,
  sendFormRequest,
} from "./providers/functions/http";

export const useRequest = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const defaultResponse = { errors: [], message: "", data: {} };
  const [response, setResponse] = React.useState(defaultResponse);

  const start = () => {
    setResponse(defaultResponse);
    setRefreshing(true);
  };

  const end = (newResponse) => {
    setResponse(newResponse);
    setRefreshing(false);
  };

  return {
    end,
    start,
    response,
    refreshing,
    sendRequest,
  };
};

export function useRequestAndDispatch() {
  const [fetching, setFetching] = React.useState(false);
  const { state, callReducer } = React.useContext(AppContext);

  const getRequestThenDispatch = async (url, dispatch) => {
    setFetching(true);
    const response = await getRequest(url);
    setFetching(false);
    if (response.errors.length === 0) {
      callReducer({ dispatch, data: response.data });
    }
  };

  return {
    fetching,
    getRequestThenDispatch,
    state,
  };
}

export function getRequestThenDispatch(url, dispatch, prop) {
  const { state, callReducer } = React.useContext(AppContext);
  const [request, setRequest] = React.useState({ fetching: true, errors: [] });

  React.useEffect(() => {
    async function asyncOperation() {
      const { errors, data } = await getRequest(url);
      setRequest({
        fetching: false,
        errors,
      });
      if (errors.length === 0) {
        callReducer({ dispatch, data });
      }
    }
    asyncOperation();
  }, [prop]);

  return { state, request, callReducer };
}

export function sendRequestThenDispatch() {
  const { state, callReducer } = React.useContext(AppContext);
  const [request, setRequest] = React.useState({
    fetching: false,
    errors: [],
    message: "",
  });

  const callBack = async (url, dispatch, body, onSuccess, type = "POST") => {
    onSuccess = onSuccess || function () {};
    setRequest({
      fetching: true,
      errors: [],
      message: "",
    });
    try {
      const { errors, data, message } = await sendRequest(url, body, type);
      setRequest({
        fetching: false,
        errors,
        message,
      });
      if (errors.length === 0) {
        onSuccess(data);
        callReducer({ dispatch, data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    state,
    request,
    callBack,
    callReducer,
  };
}

export function sendFormRequestThenDispatch() {
  const { state, callReducer } = React.useContext(AppContext);
  const [request, setRequest] = React.useState({
    fetching: false,
    errors: [],
    message: "",
  });

  const callBack = async (url, dispatch, body, onSuccess, type = "POST") => {
    onSuccess = onSuccess || function () {};
    setRequest({
      fetching: true,
      errors: [],
      message: "",
    });
    const { errors, data, message, jsError } = await sendFormRequest(
      url,
      body,
      type
    );
    setRequest({
      fetching: false,
      errors,
      message,
    });
    if (errors.length === 0) {
      callReducer({ dispatch, data });
      onSuccess();
    }
  };

  return {
    state,
    request,
    callBack,
  };
}

export function useFetch() {
  const blank = {
    fetching: false,
    errors: [],
    message: "",
  };
  const [request, setResponse] = React.useState(blank);

  return {
    request,
    setResponse,
    blank,
  };
}

export const getNavClassName = () => {
  const [className, setClassName] = React.useState("transparent");

  const eventListener = () => {
    if (pageYOffset === 0) {
      setClassName("transparent");
    } else {
      setClassName("");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", eventListener);
    return () => {
      window.removeEventListener("scroll", eventListener);
    };
  }, []);

  return className;
};
