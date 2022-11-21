import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function UsdtCreatePage({ history }) {
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user } = state;

  const nav = [
    {
      label: "Wallet",
      link: "/user/wallet/list.html",
    },
    {
      label: "Tether",
      link: "/user/wallet/usdt/list.html",
    },
    {
      label: "New",
    },
  ];

  const formArray = [
    {
      id: "label",
    },
  ];

  const text = "Generate";

  const initialState = {
    path: user.usdt_wallets.length,
  };

  const onSucess = () => {
    history.push("/user/wallet/usdt/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/users/wallet/usdt/create", "UPDATE_USER", body, onSucess);
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <div className="row">
          <div className="col l6 offset-l3 s12">
            <div className="card-panel">
              <center>
                <p>Generate New Tether (USDT) Address</p>
                <FormComponent
                  {...{
                    formArray,
                    text,
                    initialState,
                    errors,
                    fetching,
                    message,
                    onSubmit,
                  }}
                />
              </center>
            </div>
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default UsdtCreatePage;
