import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "providers/AppProvider";

function GuestRoute(props) {
  const { state } = React.useContext(AppContext);

  if (state.user) {
    if (state.user.verified < 1) {
      let verPath = "/user/auth/verifyemail.html";

      if (props.path == verPath) {
        return <Route {...props} />;
      }

      return <Redirect to={verPath} />;
    }

    return <Redirect to={"/user/index.html"} />;
  }

  return <Route {...props} />;
}

export default GuestRoute;
