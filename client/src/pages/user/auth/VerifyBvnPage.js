import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function ResendPinComponent({ email }) {
  const { request, callBack, state } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;

  const initialState = {
    email: state.user.email,
  };

  const text = "SKIP";

  const onSubmit = (body) => {
    callBack("/api/users/auth/resendpin", "N", body);
  };

  const className = "btn btn-secondary";

  return (
    <FormComponent
      {...{
        initialState,
        errors,
        fetching,
        message,
        onSubmit,
        text,
        className,
      }}
    />
  );
}

function VerifyBvnPage({ location, history }) {
  const { request, callBack, state } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user } = state;

  if (user.bvn_verified) {
    history.push("/user/index.html");
  }

  const nav = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Sign Up",
    },
  ];

  const formArray = [
    {
      id: "bvn",
      type: "number",
    },
  ];

  const initialState = {
    id: user.id,
  };

  const text = "Verify";

  const onSubmit = (body) => {
    callBack("/api/users/auth/verifyemail", "UPDATE_USER", body);
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="row app-py-0 ">
        <div className="col s12 m12 l6 offset-l3">
          <div className="card-panel">
            <ul className="stepper linear ">
              <li className="step">
                <div className="step-title">Account Information</div>
              </li>

              <li className="step">
                <div className="step-title">Email Verification</div>
              </li>

              <li className="step">
                <div className="step-title">Phone Verification</div>
              </li>
              <li className="step active">
                <div className="step-title">BVN Verification</div>
                <div className="step-content">
                  <center>
                    <FormComponent
                      {...{
                        formArray,
                        text,
                        onSubmit,
                        fetching,
                        errors,
                        message,
                        initialState,
                      }}
                    />
                    <ResendPinComponent />
                  </center>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default VerifyBvnPage;
