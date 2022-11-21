import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function NairaDepositPage() {
  const { request, callBack } = sendRequestThenDispatch();
  const { errors, fetching } = request;

  const nav = [
    {
      label: "Wallet",
      link: "/user/wallet/list.html",
    },
    {
      label: "Naira",
      link: "/user/wallet/naira/list.html",
    },
    {
      label: "Deposit Naira",
    },
  ];

  const formArray = [
    {
      id: "amount",
      min: 1000,
      type: "number",
      prefix: "NGN",
    },
  ];

  const text = "Proceed";

  const onSubmit = (body) => {
    callBack("/api/nairatransactions", "", body);
  };

  const initialState = {
    type: 1,
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container row app-mt-1">
        <div className="col l6 offset-l3 s12">
          <div className="card-panel">
            <div className="container">
              <center>
                <h1>How much would you like to deposit?</h1>
                <br />
                <FormComponent
                  {...{
                    formArray,
                    text,
                    onSubmit,
                    errors,
                    fetching,
                    initialState,
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

export default NairaDepositPage;
