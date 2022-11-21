import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import FetchButtonComponent from "components/FetchButtonComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function EmailPage() {
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user } = state;

  const nav = [
    {
      label: "Account",
      link: "/user/auth/account.html",
    },
    {
      label: "Change Email",
    },
  ];

  const formArray = [
    {
      id: "email_token",
    },
    {
      id: "new_email",
      type: "email",
    },
    {
      id: "confirm_new_email",
      type: "email",
    },
  ];

  const onSubmit = (body) => {
    callBack(
      "/api/users/auth/update/email",
      "UPDATE_USER",
      body,
      undefined,
      "PATCH"
    );
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="row">
        <div className="col l6 offset-l3 s12">
          <div className="card-panel">
            <p>{user.email}</p>
            <FormComponent
              {...{ formArray, onSubmit, fetching, errors, message }}
            />
            <FetchButtonComponent
              text="Request Token"
              className="btn btn-secondary"
              url="/api/users/auth/token/email/update"
              type="GET"
            />
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default EmailPage;
