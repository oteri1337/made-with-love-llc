import React from "react";
import { Link } from "react-router-dom";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function UsdtSendPage() {
  const [txid, setTx] = React.useState("");

  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user, wallet } = state;
  const { balance_map } = wallet.usdt;

  const options = state.user.usdt_wallets.map((wallet) => {
    let balance = balance_map[wallet.address] ?? 0;
    balance = parseFloat(balance);

    return {
      value: wallet.path,
      label: `${balance.toFixed(2)} USDT ${wallet.address}`,
    };
  });

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
      label: "Send Tether",
    },
  ];

  const formArray = [
    {
      id: "from",
      type: "select",
      options,
    },
    {
      id: "address",
    },
    {
      id: "password",
      type: "password",
    },
    {
      id: "amount",
      type: "number",
      prefix: "USDT",
      min: "0.01",
      max: wallet.usdt.balance_approximate.toFixed(2),
    },
    {
      type: "component",
      component: (
        <p key="message">
          You need at least 0.005 Ethers in your USDT address to send a
          transaction
        </p>
      ),
    },
  ];

  const text = "Send";

  const initialState = {
    from: 0,
  };

  const onSucess = (data) => {
    console.log(data);
    setTx(data.txid);
  };

  const onSubmit = (body) => {
    callBack("/api/users/wallet/usdt/send", "NO_DISPATCH", body, onSucess);
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container row app-mt-1">
        <div className="col l6 offset-l3 s12">
          <div className="card-panel">
            <center>
              {!txid.length && (
                <FormComponent
                  {...{
                    formArray,
                    initialState,
                    text,
                    errors,
                    fetching,
                    message,
                    onSubmit,
                  }}
                />
              )}

              {txid.length ? (
                <React.Fragment>
                  <b style={{ fontSize: "1.5rem" }}>Tethers Sent !!!</b>
                  <br />
                  <p>
                    Your new balance will be updated as soon as the transaction
                    is mined, this may take a few minutes.
                  </p>
                  <br />
                  <a href={`https://etherscan.io/tx/${txid}`} target="_blank">
                    View On Etherscan
                  </a>

                  <br />
                  <br />
                  <Link to="/user/index.html">Back To Dashboard</Link>
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
            </center>
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default UsdtSendPage;
