import React from "react";
import FormComponent from "components/FormComponent";
import { sendRequestThenDispatch, getRequestThenDispatch } from "hooks";
import TourContainerComponent from "components/container/TourContainerComponent";

const format = (currency, amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

function BuyFormPage({ history, location }) {
  getRequestThenDispatch("/api/rates", "UPDATE_RATES");

  const { request, callBack, state } = sendRequestThenDispatch();
  const { fetching, errors, message } = request;
  const { user } = state;

  const [worth, setWorth] = React.useState(0);

  const [crypto, setCrypto] = React.useState(0);

  const [amount, setAmount] = React.useState(0);

  const params = new URLSearchParams(location.search);

  const initialCurrency = params.get("currency") || "BTC";

  const [currency, setCurrency] = React.useState(initialCurrency);

  const buyRate = state.rates.array.find((rate) => rate.type == 2);

  const nav = [
    {
      label: "Buy Crypto",
    },
  ];

  if (!buyRate) {
    return (
      <TourContainerComponent bread={nav}>
        <div className="card-panel">Fetching Rates</div>
      </TourContainerComponent>
    );
  }

  let cryptoId = 1;

  if (initialCurrency == "ETH") {
    cryptoId = 2;
  }

  if (initialCurrency == "USDT") {
    cryptoId = 3;
  }

  let initialState = {
    cryptoId,
  };

  if (user) {
    let address = user.btc_wallets[0].address;

    if (initialCurrency == "ETH") {
      address = user.eth_wallets[0].address;
    }

    if (initialCurrency == "USDT") {
      address = user.usdt_wallets[0].address;
    }

    initialState = {
      cryptoId,
      address,
      user_id: user.id,
      email: user.email,
      phone_number: user.phone_number,
    };
  }

  const btcprice = state.prices.bitcoin.usd;
  const ethprice = state.prices.ethereum.usd;

  let name = "bitcoin";

  if (currency == "ETH") {
    name = "ethereum";
  }

  const onChangeCallBack = ({ cryptoId, amount_in_ngn = 0 }) => {
    setAmount(amount_in_ngn);

    let worth = amount_in_ngn / buyRate.rate;
    setWorth(worth);

    if (cryptoId == 1) {
      setCurrency("BTC");
      setCrypto((worth / btcprice).toFixed(8));
    }
    if (cryptoId == 2) {
      setCurrency("ETH");
      setCrypto((worth / ethprice).toFixed(8));
    }
  };

  const formArray = [
    {
      id: "cryptoId",
      label: "Crypto Currency",
      type: "select",
      options: [
        {
          value: 1,
          label: "Bitcoin",
        },
        {
          value: 2,
          label: "Ethereum",
        },
        {
          value: 3,
          label: "Tether",
        },
      ],
    },
    {
      id: "amount_in_ngn",
      label: "amount",
      type: "number",
      min: 1000,
      prefix: "NGN",
    },
    {
      type: "component",
      component: (
        <div key="message">
          <p>
            Rate: <s>N</s>
            {buyRate.rate} = $1
          </p>
          <p>
            <s>N</s>
            {amount} = {format("USD", worth)} = {crypto} {currency}
          </p>
        </div>
      ),
    },
    {
      id: "address",
      label: "Wallet Address",
    },
    {
      id: "phone_number",
      type: "number",
    },
    {
      id: "email",
    },
  ];

  const onSuccess = ({ reference }) => {
    history.push(`/transactions/${reference}`);
  };

  const onSubmit = (body) => {
    body.crypto_price = state.prices[name].usd;
    callBack("/api/transactions/buy", "UPDATE_TRANSACTION", body, onSuccess);
  };

  const text = "Proceed";

  return (
    <TourContainerComponent bread={nav}>
      <div className="container">
        <div className="row app-my-3">
          <div className="col s12 m12 l6 offset-l3">
            <div className="card-panel">
              <center>
                <table className="striped">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <span
                          className="icon icon-btc"
                          style={{ fontSize: "20px" }}
                        ></span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {format("USD", state.prices.bitcoin.usd)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {format("NGN", state.prices.bitcoin.usd * buyRate.rate)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <span
                          className="icon icon-eth"
                          style={{ fontSize: "20px" }}
                        ></span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${state.prices.ethereum.usd}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {format(
                          "NGN",
                          state.prices.ethereum.usd * buyRate.rate
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <span
                          className="icon icon-usdt"
                          style={{ fontSize: "20px" }}
                        ></span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ${state.prices.tether?.usd.toString().slice(0, 4)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {format("NGN", state.prices.tether?.usd * buyRate.rate)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <FormComponent
                  {...{
                    formArray,
                    initialState,
                    text,
                    fetching,
                    errors,
                    message,
                    onSubmit,
                    onChangeCallBack,
                  }}
                />
              </center>
            </div>
          </div>
        </div>
      </div>
    </TourContainerComponent>
  );
}

export default BuyFormPage;
