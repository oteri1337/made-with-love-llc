import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function ResendSmsComponent() {
  const { request, callBack, state } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;

  const initialState = {
    phone_number: state.user.phone_number,
  };

  const text = "Resend SMS";

  const onSubmit = (body) => {
    callBack("/api/users/auth/resendsms", "UPDATE_USER", body);
  };

  const formArray = [
    {
      id: "phone_number",
    },
  ];

  const className = "btn btn-secondary";

  return (
    <FormComponent
      {...{
        formArray,
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

function VerifyPhonePage({ history }) {
  const { request, callBack, state } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user } = state;

  if (user.phone_verified) {
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
      id: "pin",
      type: "number",
    },
  ];

  const initialState = {
    id: user.id,
  };

  const text = "Verify";

  const onSubmit = (body) => {
    callBack("/api/users/auth/verifyphone", "UPDATE_USER", body);
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

              <li className="step active">
                <div className="step-title">Phone Verification</div>

                <div className="step-content">
                  <center>
                    <p>A text message is on its way</p>
                    <p>
                      {" "}
                      Please enter the Verification PIN sent to{" "}
                      {user.phone_number}
                    </p>
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
                    <br />
                    <br />
                    <br />
                    <br />
                    <ResendSmsComponent />
                  </center>
                </div>
              </li>

              <li className="step">
                <div className="step-title">BVN Verification</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default VerifyPhonePage;
