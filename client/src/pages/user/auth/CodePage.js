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

  const text = "Resend pin";

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
        onSubmit,
        message,
        text,
        className,
      }}
    />
  );
}

function pinPage({ location, history }) {
  const { request, callBack, state } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user } = state;

  if (user.verified == 2) {
    history.push("/user/index.html");
  }

  const nav = [
    {
      label: "Security Check",
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
    callBack("/api/users/auth/verifyemail", "UPDATE_USER", body);
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="row app-py-0 ">
        <div className="col s12 m12 l4 offset-l4">
          <div className="card-panel">
            <center>
              <p>Please enter the verification pin sent to your email</p>
              <br />
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
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default pinPage;
