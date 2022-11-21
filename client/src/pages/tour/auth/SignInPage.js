import React from "react";
import { Link } from "react-router-dom";
import { sendFormRequestThenDispatch } from "hooks";
import Form from "components/UncontrolledFormComponent";
import TourContainerComponent from "components/container/TourContainerComponent";

function SignInPage() {
  const { request, callBack } = sendFormRequestThenDispatch();
  const { fetching, errors } = request;

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Sign In",
    },
  ];

  const formObjects = [
    {
      id: "email",
      type: "email",
    },
    {
      id: "password",
      type: "password",
    },
  ];

  const callback = async (body) => {
    await callBack("/api/users/auth/signin", "UPDATE_USER", body);
  };

  return (
    <TourContainerComponent bread={nav}>
      <div className="container">
        <div className="row app-my-3">
          <div className="col s12 m12 l6 offset-l3">
            <div className="card-panel">
              <br />
              <center>
                <Form
                  {...{
                    formObjects,
                    callback,
                    fetching,
                    errors,
                    text: "Sign In",
                  }}
                />
                <br />
                <Link to="/signup.html">Sign Up</Link>
                <br />
                <br />
                <Link to="/password.html">Reset Password</Link>
              </center>
            </div>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default SignInPage;
