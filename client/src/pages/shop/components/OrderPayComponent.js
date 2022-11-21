import React from "react";
import Form from "components/FormComponent";
import { sendRequestThenDispatch } from "hooks";
import SpinnerComponent from "components/SpinnerComponent";

function OrderPayComponent({ rawData }) {
  const { request, callBack } = sendRequestThenDispatch();

  const confirmPayment = async (body) => {
    console.log(body);
    callBack(
      "/api/orders/confirm/flutter",
      "UPDATE_ORDER",
      body,
      () => {},
      "PATCH"
    );
  };

  const createCoinPayment = async (body) => {
    callBack("/api/orders/create/coin", "UPDATE_ORDER", body);
  };

  const createFlutterPayment = async () => {
    FlutterwaveCheckout({
      currency: "USD",
      public_key: PUBLIC_KEY,
      callback: confirmPayment,
      tx_ref: rawData.reference,
      amount: rawData.total_in_ngn,
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: rawData.email,
        phone_number: rawData.phone_number,
      },
      customizations: {
        title: "TraderFX Martketplace",
        description: "Pay For Order",
        logo: "https://www.traderfxm.com/assets/images/logo.png",
      },
    });
  };

  if (request.fetching) {
    return (
      <center>
        <SpinnerComponent />
      </center>
    );
  }

  if (rawData.status == 3) {
    return <p>This order has been completed and delivered</p>;
  }

  if (rawData.status == 2) {
    return (
      <p>
        Your payment has been recieved, your order will be delivered as soon as
        possible, please copy this url or the reference code to monitor your
        order.
      </p>
    );
  }

  if (rawData.cp_url) {
    return (
      <div>
        <p>
          Please click the link below to make payment, if you have successfully
          completed the payment please reload this page.
        </p>
        <a href={rawData.cp_url} target="_blank">
          {rawData.cp_url}
        </a>
      </div>
    );
  }

  const formArray = [
    {
      id: "currency",
      type: "select",
      className: "  ",
      options: [
        {
          value: "BTC",
          label: "Bitcoin",
        },
        {
          value: "ETH",
          label: "Ethereum",
        },
        {
          value: "USDT",
          label: "Tether",
        },
      ],
    },
  ];

  const text = "Proceed";

  const initialState = {
    id: rawData.id,
    currency: "BTC",
  };

  return (
    <div className="row">
      <div className="col l6 s12">
        <p>PAY WITH CARD, BANK OR USSD</p>
        <button className="btn" onClick={createFlutterPayment}>
          Proceed
        </button>
        <br />
        <br />
      </div>
      <div className="col l6 s12 ">
        <p>PAY WITH CRYPTO CURRENCY</p>
        <center>
          <Form
            {...{ formArray, text, initialState, onSubmit: createCoinPayment }}
          />
        </center>
      </div>
    </div>
  );
}

export default OrderPayComponent;
