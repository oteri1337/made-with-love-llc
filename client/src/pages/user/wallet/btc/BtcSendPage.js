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

function BtcSendPage() {
  const params = new URLSearchParams(location.search);
  const walletid = params.get("walletid") ?? 0;

  const [usd, setUsd] = React.useState(0);
  const [txid, setTx] = React.useState("");
  const { state, request, callBack } = sendRequestThenDispatch();
  const { errors, message, fetching } = request;
  const { user, wallet, prices } = state;
  const { balance_map } = wallet.bitcoin;

  const options = state.user.btc_wallets.map((wallet) => {
    let balance = balance_map[wallet.address] ?? 0;
    balance = parseFloat(balance);

    return {
      value: wallet.path,
      label: `${balance.toFixed(8)} BTC ( ${format(
        "USD",
        balance * prices.bitcoin.usd
      )} ) ${wallet.address}`,
    };
  });

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
      label: "Send Bitcoin",
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
      prefix: "BTC",
      min: "0.0001",
      max: wallet.bitcoin.balance,
    },
    {
      type: "component",
      component: <div key="c">{format("USD", usd)}</div>,
    },
  ];

  const text = "Send";

  const onSucess = (data) => {
    setTx(data.txid);
  };

  const initialState = {
    from: walletid,
    fee: 34,
  };

  const onSubmit = (body) => {
    callBack("/api/users/wallet/btc/send", "NO_DISPATCH", body, onSucess);
  };

  const onChangeCallBack = ({ amount }) => {
    if (amount) {
      setUsd(amount * state.prices.bitcoin.usd);
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
                  <b style={{ fontSize: "1.5rem" }}>Bitcoins Sent !!!</b>
                  <br />
                  <p>
                    Your new balance will be updated as soon as the transaction
                    is mined, this may take a few minutes.
                  </p>
                  <br />
                  <a
                    href={`https://www.blockchain.com/btc/tx/${txid}`}
                    target="_blank"
                  >
                    View On Blockchain
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

export default BtcSendPage;
