import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function EthCreatePage({ history }) {
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user } = state;

  const nav = [
    {
      label: "Wallet",
      link: "/user/wallet/list.html",
    },
    {
      label: "Ethereum",
      link: "/user/wallet/eth/list.html",
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
    path: user.eth_wallets.length,
  };

  const onSucess = () => {
    history.push("/user/wallet/eth/list.html");
  };

  const onSubmit = (body) => {
    callBack("/api/users/wallet/eth/create", "UPDATE_USER", body, onSucess);
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container">
        <div className="row">
          <div className="col l6 offset-l3 s12">
            <div className="card-panel">
              <center>
                <p>Generate New Ethereum Address</p>
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

export default EthCreatePage;
