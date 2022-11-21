import React from "react";
import { Link } from "react-router-dom";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

const format = (currency, amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

function EthSendPage() {
  const [usd, setUsd] = React.useState(0);
  const [txid, setTx] = React.useState("");
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user, wallet, prices } = state;
  const { balance_map } = wallet.ethereum;

  const params = new URLSearchParams(location.search);
  const walletid = params.get("walletid") ?? 0;

  const options = state.user.eth_wallets.map((wallet) => {
    let balance = balance_map[wallet.address] ?? 0;
    balance = parseFloat(balance);

    const usdb = `( ${format("USD", balance * prices.ethereum.usd)} )`;

    return {
      value: wallet.path,
      label: `${balance} ETH ${usdb} ${wallet.address}`,
    };
  });

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
      label: "Send Ethereum",
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
      prefix: "ETH",
      min: "0.00000001",
      max: wallet.ethereum.balance,
    },
    {
      type: "component",
      component: <div key="c">{format("USD", usd)}</div>,
    },
  ];

  const text = "Send";

  const initialState = {
    from: walletid,
  };

  const onSucess = (data) => {
    setTx(data.txid);
  };

  const onSubmit = (body) => {
    callBack("/api/users/wallet/eth/send", "NO_DISPATCH", body, onSucess);
  };

  const onChangeCallBack = ({ amount }) => {
    if (amount) {
      setUsd(amount * state.prices.ethereum.usd);
    }
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
                    onChangeCallBack,
                  }}
                />
              )}

              {txid.length ? (
                <React.Fragment>
                  <b style={{ fontSize: "1.5rem" }}>Ethers Sent !!!</b>
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

export default EthSendPage;
