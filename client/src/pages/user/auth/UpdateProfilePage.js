import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function PasswordPage() {
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;

  const nav = [
    {
      label: "Account",
      link: "/user/auth/account.html",
    },
    {
      label: "Update Profile",
    },
  ];

  const formArray = [
    {
      id: "country",
    },
    {
      id: "state",
    },
    {
      id: "address",
    },
    {
      id: "bank_name",
    },
    {
      id: "account_name",
    },
    {
      id: "account_number",
    },
  ];

  const initialState = state.user;

  const onSubmit = (body) => {
    callBack(
      "/api/users/auth/profile",
      "UPDATE_USER",
      body,
      undefined,
      "PATCH"
    );
  };

  const text = "Update";

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
                initialState,
                text,
              }}
            />
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default PasswordPage;
