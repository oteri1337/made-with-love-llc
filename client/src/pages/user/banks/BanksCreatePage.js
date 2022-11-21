import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import UserContainerComponent from "components/container/UserContainerComponent";

function BanksCreatePage({ history }) {
  const { request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;

  const nav = [
    {
      label: "Accout",
      link: "/user/auth/account.html",
    },
    {
      label: "Bank Accounts",
      link: "/user/banks/list.html",
    },
    {
      label: "Add Bank Account",
    },
  ];

  const formArray = [
    {
      id: "bank_name",
    },
    {
      id: "account_name",
    },
    {
      id: "account_number",
      type: "number",
    },
  ];

  const text = "Add Account";

  const onSucess = () => {
    history.push("/user/banks/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/users/accounts", "UPDATE_USER", body, onSucess);
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <div className="row">
          <div className="col l6 offset-l3">
            <div className="card-panel">
              <center>
                <Form
                  {...{ formArray, text, onSubmit, errors, message, fetching }}
                />
              </center>
            </div>
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default BanksCreatePage;
