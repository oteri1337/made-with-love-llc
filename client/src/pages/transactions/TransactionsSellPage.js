import React from "react";
import { sendRequestThenDispatch } from "hooks";
import FormComponent from "components/FormComponent";
import SellRatesComponent from "./components/SellRatesComponent";
import TourContainerComponent from "components/container/TourContainerComponent";

const format = (currency, amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

function SellFormPage({ history, location }) {
  const { request, callBack, state } = sendRequestThenDispatch();

  let Container = TourContainerComponent;

  const { user } = state;

  const params = new URLSearchParams(location.search);
  const initialCurrency = params.get("currency") || "BTC";

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
    initialState = {
      cryptoId,
      user_id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      bank_name: user.bank_name,
      account_name: user.account_name,
      account_number: user.account_number,
    };
  }

  const { fetching, errors, message } = request;

  const btcprice = state.prices.bitcoin.usd;
  const ethprice = state.prices.ethereum.usd;
  const usdtprice = state.prices.tether.usd;

  const rates = state.rates.array;

  const dollar_rate = rates.find((rate) => rate.lower_limit == 1);

  const [rate, setRate] = React.useState(dollar_rate?.rate ?? 0);
  const [cash, setCash] = React.useState(0);
  const [worth, setWorth] = React.useState(0);
  const [currency, setCurrency] = React.useState(initialCurrency);
  const [amount, setAmount] = React.useState(0);

  let name = "bitcoin";

  if (currency == "ETH") {
    name = "ethereum";
  }

  if (currency == "USDT") {
    name = "tether";
  }

  const onChangeCallBack = ({ cryptoId, amount_in_crypto = 0 }) => {
    setAmount(amount_in_crypto);

    let worth = 0;

    if (cryptoId == 1) {
      setCurrency("BTC");
      worth = amount_in_crypto * btcprice;
      setWorth(worth);
    }
    if (cryptoId == 2) {
      setCurrency("ETH");
      worth = amount_in_crypto * ethprice;
      setWorth(worth);
    }
    if (cryptoId == 3) {
      setCurrency("USDT");
      worth = amount_in_crypto * usdtprice;
      setWorth(worth);
    }

    const data = rates.find((rate) => {
      return (
        (worth <= rate.upper_limit || rate.upper_limit === null) &&
        worth >= rate.lower_limit
      );
    });

    const rate = data?.rate ?? dollar_rate.rate;

    setRate(rate);

    setCash(rate * worth);
  };

  const nav = [
    {
      label: "Sell Crypto",
    },
  ];

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
      id: "amount_in_crypto",
      label: "Amount",
      type: "number",
      prefix: currency,
    },
    {
      type: "component",
      component: (
        <div key="message">
          <p>
            Rate: $1 = <s>N</s>
            {rate}
          </p>
          <p>
            {amount} {currency} = {format("USD", worth)} = {format("NGN", cash)}
          </p>
          <p>
            1 {currency} = {format("USD", state.prices[name].usd)} ={" "}
            {format("NGN", state.prices[name].usd * rate)}
          </p>
        </div>
      ),
    },
    {
      id: "bank_name",
      className: "autocomplete",
    },
    {
      id: "account_number",
      type: "number",
    },
    {
      id: "account_name",
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
    callBack("/api/transactions/sell", "UPDATE_TRANSACTION", body, onSuccess);
  };

  const text = "Proceed";

  return (
    <Container bread={nav}>
      <div className="container">
        <div className="row app-my-3">
          <div className="col s12 m12 l6 offset-l3">
            <div className="card-panel ">
              <center>
                <p>OUR RATES</p>
                <SellRatesComponent />
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
    </Container>
  );
}

export default SellFormPage;
