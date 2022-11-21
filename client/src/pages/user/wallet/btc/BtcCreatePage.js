import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function BtcCreatePage({ history }) {
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user } = state;

  const nav = [
    {
      label: "Wallet",
      link: "/user/wallet/list.html",
    },
    {
      label: "Bitcoin",
      link: "/user/wallet/btc/list.html",
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
    path: user.btc_wallets.length,
  };

  const onSucess = () => {
    history.push("/user/wallet/btc/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/users/wallet/btc/create", "UPDATE_USER", body, onSucess);
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <div className="row">
          <div className="col l6 offset-l3 s12">
            <div className="card-panel">
              <center>
                <p>Generate New Bitcoin Address</p>
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

export default BtcCreatePage;
