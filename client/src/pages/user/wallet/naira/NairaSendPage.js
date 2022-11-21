import React from "react";
import { format } from "functions/dom";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import UserContainerComponent from "components/container/UserContainerComponent";

function NairaSendPage({ history }) {
  const { state, callBack, request } = sendRequestThenDispatch();
  const { errors, fetching, message } = request;
  const [to, setTo] = React.useState("default");
  const [amount_in_crypto, setAmount] = React.useState(0);

  const [sellrate, setSellRate] = React.useState(0);

  React.useEffect(() => {
    const found = state.rates.array.find((rate) => {
      if (rate.type == 2) {
        return true;
      }
    });

    if (found) {
      setSellRate(found.rate);
    }
  }, []);

  let symbol = "BTC";

  if (to == 2) {
    symbol = "ETH";
  }

  if (to == 3) {
    symbol = "USDT";
  }

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
      label: "Send Naira",
    },
  ];

  let formArray = [
    {
      id: "amount",
      type: "number",
      prefix: "NGN",
      min: 1000,
      max: state.user.naira_balance,
    },
    {
      type: "component",
      component: (
        <div key="c">
          {amount_in_crypto} {symbol}
          <br />
          Rate: <s>N</s>
          {sellrate} = $1
        </div>
      ),
    },
    {
      id: "address",
      label: "wallet address",
    },
    {
      id: "password",
      type: "password",
    },
  ];

  if (to == 0) {
    formArray = [
      {
        id: "amount",
        type: "number",
        prefix: "NGN",
        min: 1000,
        max: state.user.naira_balance,
      },
      {
        id: "bank_name",
      },
      {
        id: "account_number",
        type: "number",
      },
      {
        id: "account_name",
      },
      {
        id: "password",
        type: "password",
      },
    ];
  }

  const text = "Proceed";

  const onClick = ({ target }) => {
    setTo(target.id);
  };

  const renderTo = () => {
    switch (to) {
      case "default":
        return "";
      case "0":
        return "Bank Account";
      case "1":
        return "Bitcoin Wallet";
      case "2":
        return "Ethereum Wallet";
      case "3":
        return "Tether (USDT) Wallet";
      default:
        return "";
    }
  };

  const onSuccess = () => {
    history.push("/user/index.html");
  };

  const onSubmit = (body) => {
    body.type = 2;
    body.cryptoId = to;
    body.amount_in_crypto = amount_in_crypto;
    const url = "/api/users/wallet/naira/send";
    callBack(url, "UPDATE_USER", body, onSuccess);
  };

  const onChangeCallBack = ({ amount }) => {
    if (amount) {
      const amount_in_usd = amount / sellrate;

      if (to == 1) {
        setAmount((amount_in_usd / state.prices.bitcoin.usd).toFixed(8));
      }

      if (to == 2) {
        setAmount((amount_in_usd / state.prices.ethereum.usd).toFixed(8));
      }

      if (to == 3) {
        setAmount((amount_in_usd / state.prices.tether.usd).toFixed(2));
      }
    }
  };

  return (
    <UserContainerComponent bread={nav}>
      <div className="container row app-mt-1">
        <div className="col l6 offset-l3 s12">
          <div className="card-panel">
            <center>
              <h2 style={{ margin: 0, padding: 0 }}>
                {format("NGN", state.user.naira_balance)}
              </h2>
              Balance
              <br />
              <br />
              Send to {renderTo()}
              <br />
              <br />
              {to == "default" ? (
                <ul className="collection">
                  <li className="collection-item" id={0} onClick={onClick}>
                    Bank Account
                  </li>
                  <li className="collection-item" id={1} onClick={onClick}>
                    Bitcoin Wallet
                  </li>
                  <li className="collection-item" id={2} onClick={onClick}>
                    Ethereum Wallet
                  </li>
                  <li className="collection-item" id={3} onClick={onClick}>
                    Tether (USDT) Wallet
                  </li>
                </ul>
              ) : (
                <FormComponent
                  {...{
                    formArray,
                    text,
                    errors,
                    fetching,
                    message,
                    onSubmit,
                    onChangeCallBack,
                  }}
                />
              )}
            </center>
          </div>
        </div>
      </div>
    </UserContainerComponent>
  );
}

export default NairaSendPage;
