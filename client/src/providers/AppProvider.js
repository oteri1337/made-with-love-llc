import React from "react";
import reducer from "./reducers/rootReducer";
import { getRequest, sendRequest } from "./functions/http";

export const AppContext = React.createContext({});

function AppProvider({ children, initialState }) {
  initialState = initialState ?? reducer({}, { dispatch: "NEW" });
  const [state, callReducer] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const getBackendState = async () => {
      let response;

      response = await getRequest("/api/users/auth/status");
      if (response.errors.length === 0) {
        callReducer({ dispatch: "UPDATE_USER", data: response.data });
      }

      response = await getRequest("/api/admins/auth/status");
      if (response.errors.length === 0) {
        callReducer({ dispatch: "UPDATE_ADMIN", data: response.data });
      }

      const coingecko =
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd";

      response = await getRequest(coingecko);
      if (response.bitcoin) {
        callReducer({ dispatch: "UPDATE_PRICES", data: response });
      }
    };
    getBackendState();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  });

  const requestHook = function () {
    const [refreshing, setRefreshing] = React.useState(false);
    const defaultResponse = { errors: [], message: "", data: {} };
    const [response, setResponse] = React.useState(defaultResponse);

    const send = async (url, dispatch, body, method, onSuccess) => {
      const successCallback = onSuccess || function () {};
      setRefreshing(true);
      const response = await sendRequest(url, body, method);
      setRefreshing(false);
      setResponse(response);
      if (!response.errors.length) {
        callReducer({ dispatch, data: response.data });
        successCallback(response);
      }
    };

    return { refreshing, response, send };
  };

  const getRequestThenDispatch = function (url, dispatch) {
    const [refreshing, setRefreshing] = React.useState(true);
    const defaultResponse = { errors: [], message: "", data: {} };
    const [response, setResponse] = React.useState(defaultResponse);

    React.useEffect(() => {
      const asyncOperation = async () => {
        const response = await getRequest(url);
        setRefreshing(false);
        setResponse(response);
        if (!response.errors.length) {
          callReducer({ dispatch, data: response.data });
        }
      };

      asyncOperation();
    }, []);

    return { refreshing, response };
  };

  const signOut = async () => {
    callReducer({ dispatch: "SIGN_OUT" });
    getRequest("/api/users/auth/signout");
  };

  const adminSignOut = () => {
    callReducer({ dispatch: "UPDATE_ADMIN", data: false });
    getRequest("/api/admins/auth/signout");
  };

  return (
    <AppContext.Provider
      value={{
        state,
        signOut,
        callReducer,
        requestHook,
        adminSignOut,
        getRequestThenDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const getRequestThenDispatch = (starturl = "", startdispatch = "") => {
  let initialState = false;

  if (starturl.length && startdispatch.length) {
    initialState = true;
  }

  const { state, callReducer } = React.useContext(AppContext);

  const [refreshing, setRefreshing] = React.useState(initialState);

  React.useEffect(() => {
    const as = async () => {
      if (starturl.length && startdispatch.length) {
        let fetchResponse = await getRequest(starturl);
        if (fetchResponse.errors.length === 0) {
          callReducer({ dispatch: startdispatch, data: fetchResponse.data });
          setRefreshing(false);
        }
      }
    };

    as();
  }, []);

  const send = async (url, dispatch) => {
    setRefreshing(true);

    let fetchResponse = await getRequest(url);

    setRefreshing(false);

    if (fetchResponse.errors.length === 0) {
      callReducer({ dispatch, data: fetchResponse.data });
    }
  };

  return { state, refreshing, callReducer, send };
};

export const sendRequestThenDispatch = () => {
  const { state, callReducer } = React.useContext(AppContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const send = async (url, dispatch, body, method, onSuccess) => {
    onSuccess = onSuccess ?? function () {};

    setRefreshing(true);

    const fetchResponse = await sendRequest(url, body, method);
    // console.log(fetchResponse);

    setRefreshing(false);

    if (fetchResponse.errors.length === 0) {
      callReducer({ dispatch, data: fetchResponse.data });
      if (fetchResponse.message.length) {
        alert(fetchResponse.message);
        onSuccess();
      }
    } else {
      alert(fetchResponse.errors[0]);
    }

    return fetchResponse;
  };

  return { state, refreshing, callReducer, send };
};

export default AppProvider;
