import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/AdminContainerComponent";

function PasswordPage() {
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;

  const nav = [
    {
      label: "Account",
      link: "/control/auth/account.html",
    },
    {
      label: "Update Password",
    },
  ];

  const formArray = [
    {
      id: "password",
      type: "password",
    },
    {
      id: "new_password",
      type: "password",
    },
    {
      id: "confirm_new_password",
      type: "password",
    },
  ];

  const onSubmit = (body) => {
    callBack("/api/admins/auth/password", "NONE", body, undefined, "PATCH");
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="row">
        <div className="col l6 offset-l3 s12">
          <div className="card-panel center">
            <FormComponent
              {...{
                formArray,
                onSubmit,
                errors,
                fetching,
                message,
              }}
            />
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default PasswordPage;
